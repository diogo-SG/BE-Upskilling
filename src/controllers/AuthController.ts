import { Request, Response, NextFunction } from "express";
import AuthService from "../services/AuthService";
import { matchedData, validationResult } from "express-validator";
import { ErrorWithStatus } from "../middleware/errorHandler";
import { accessTokenMaxAge } from "../middleware/deserializeUser";
import { EntityNoMetadata } from "../database/types/types";
import UserEntity from "../database/entities/users/UserEntity";
import UsersService from "../services/UserService";

/* --------------------------------- Service -------------------------------- */

const authService = new AuthService();
const usersService = new UsersService();

/* ------------------------------- Controller ------------------------------- */
const AuthController = {
  login,
  logout,
  signup,
  // getSession,
};

/* --------------------------------- Signup --------------------------------- */

/** Adds a new user
 * @returns - a JSON response with the new user
 * @throws - a 400 error if the request body is invalid
 * @example - POST /api/users
 */
async function signup(req: Request, res: Response, next: NextFunction) {
  if (!validationResult(req).isEmpty()) {
    const errorsList = validationResult(req).array();

    // We could make this look much nicer but I'm lazy and don't think it's worth the time investment atm
    const errorMsg = errorsList
      .map((error) => {
        if (error.type === "field") {
          return `${error.path}: ${error.msg}`;
        }
      })
      .join("; ");
    const error = new ErrorWithStatus(400, errorMsg);
    next(error);
  }
  const data = matchedData(req) as EntityNoMetadata<UserEntity>;

  try {
    const newUser = await usersService.addNew(data);
    console.log(newUser);
    // 201 Created = We created a new resource
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
}

/* ---------------------------------- Login --------------------------------- */
async function login(req: Request, res: Response, next: NextFunction) {
  if (!validationResult(req).isEmpty()) {
    console.log(validationResult(req));
    const error = new ErrorWithStatus(400, "Invalid credentials");
    next(error);
  }
  const { email, password } = req.body;

  const { accessToken, refreshToken } = await authService.login(email, password);

  res.cookie("accessToken", accessToken, {
    maxAge: accessTokenMaxAge.ms,
    httpOnly: true,
    sameSite: "strict",
    secure: true,
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    sameSite: "strict",
    secure: true,
    maxAge: 60 * 60 * 24 * 365, // 1 year
  });

  res.status(200).json({ message: "Login successful" });
}

/* --------------------------------- Logout --------------------------------- */

async function logout(req: Request, res: Response, next: NextFunction) {
  try {
    //@ts-ignore
    const { user } = req;

    await authService.logout(user.id);

    res.cookie("accessToken", "", {
      httpOnly: true,
      maxAge: 0,
    });
    res.cookie("refreshToken", "", {
      httpOnly: true,
      maxAge: 0,
    });

    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.log(error, "error");
    next(error);
  }
}

export default AuthController;
