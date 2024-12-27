import { Request, Response, NextFunction } from "express";

const AuthController = {
  login,
  logout,
};

async function login(req: Request, res: Response, next: NextFunction) {
  res.status(200).json({ message: "Login successful" });
}

async function logout(req: Request, res: Response, next: NextFunction) {
  res.status(200).json({ message: "Logout successful" });
}

export default AuthController;
