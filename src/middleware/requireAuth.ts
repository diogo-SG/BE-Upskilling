import { NextFunction, Request, Response } from "express";
import { ErrorWithStatus } from "./errorHandler";

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  //@ts-ignore
  if (!req.user) {
    return next(new ErrorWithStatus(401, "Unauthorized"));
  }

  return next();
}
