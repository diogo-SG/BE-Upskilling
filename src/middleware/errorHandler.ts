import { Request, Response, NextFunction } from "express";

export class ErrorWithStatus extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

export default function errorHandler(err: ErrorWithStatus, req: Request, res: Response, next: NextFunction) {
  console.error(err.stack); // log error stack trace, thanks SG boilerplate!
  if (err.status) {
    res.status(err.status).json({ error: err.message });
    return;
  } else {
    res.status(500).json({ error: "Uh oh, something went wrong" });
  }
}
