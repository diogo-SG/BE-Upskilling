import { Request, Response, NextFunction } from "express";
import { ErrorWithStatus } from "./errorHandler";

// this is passed on to the errorHandlerMiddleware as a generic error when no other route is matched
export default function catchAllError(req: Request, res: Response, next: NextFunction) {
  const error = new ErrorWithStatus(404, "Uh oh, something went wrong");
  next(error);
}
