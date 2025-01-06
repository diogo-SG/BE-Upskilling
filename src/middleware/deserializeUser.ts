import { NextFunction, Request, Response } from "express";
import { AuthedRequest, verifyJWT } from "../utils/jwt-utils";

function deserializeUser(req: AuthedRequest, res: Response, next: NextFunction) {
  const { accessToken } = req.cookies;

  if (!accessToken) {
    return next();
  }

  const { payload, expired } = verifyJWT(accessToken);

  if (payload) {
    //todo verify
    req.user = payload as { email: string; id: number };
    next();
  }
  next();
}

export default deserializeUser;
