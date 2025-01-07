import { Request, Response, NextFunction } from "express";
import AuthService from "../services/AuthService";
import { validationResult } from "express-validator";
import { ErrorWithStatus } from "../middleware/errorHandler";
import { AuthedRequest } from "../utils/jwt-utils";
const AuthController = {
  login,
  logout,
  getSession,
};

async function login(req: Request, res: Response, next: NextFunction) {
  if (!validationResult(req).isEmpty()) {
    console.log(validationResult(req));
    const error = new ErrorWithStatus(400, "Invalid credentials");
    next(error);
  }
  const { email, password } = req.body;

  const { accessToken, refreshToken } = await AuthService.login(email, password);

  res.cookie("accessToken", accessToken, {
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

async function getSession(req: Request, res: Response, next: NextFunction) {
  const { user } = req as AuthedRequest;
  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  res.status(200).json({ user });
}

async function logout(req: AuthedRequest, res: Response, next: NextFunction) {
  res.cookie("accessToken", "", {
    httpOnly: true,
    maxAge: 0,
  });

  res.status(200).json({ message: "Logout successful" });
}

export default AuthController;
