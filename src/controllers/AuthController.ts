import { Request, Response, NextFunction } from "express";
import AuthService from "../services/AuthService";
import { validationResult } from "express-validator";
import { ErrorWithStatus } from "../middleware/errorHandler";
const AuthController = {
  login,
  logout,
};

async function login(req: Request, res: Response, next: NextFunction) {
  if (!validationResult(req).isEmpty()) {
    const error = new ErrorWithStatus(400, "Invalid credentials");
    next(error);
  }
  const { email, password } = req.body;

  const accessToken = await AuthService.login(email, password);

  res.cookie("access_token", accessToken, {
    httpOnly: true,
    sameSite: "strict",
    secure: true,
  });

  res.status(200).json({ message: "Login successful" });
}

async function logout(req: Request, res: Response, next: NextFunction) {
  res.status(200).json({ message: "Logout successful" });
}

export default AuthController;
