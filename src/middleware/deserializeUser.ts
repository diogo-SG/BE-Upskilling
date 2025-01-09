import { NextFunction, Response, Request } from "express";
import { signJWT, verifyJWT } from "../utils/jwt-utils";
import SessionRepository from "../database/repositories/Users/Sessions/SessionRepository";
import { ErrorWithStatus } from "./errorHandler";

const SessionRepo = new SessionRepository();

export const accessTokenMaxAge = {
  expiresIn: "15s",
  ms: 15 * 1000,
};

async function deserializeUser(req: Request, res: Response, next: NextFunction) {
  //@ts-ignore
  const { accessToken, refreshToken } = req.cookies;

  if (!accessToken) {
    if (!refreshToken) {
      return next(new ErrorWithStatus(401, "Unauthorized"));
    }
  }

  const { payload, expired } = verifyJWT(accessToken);

  if (payload) {
    //@ts-ignore
    req.user = payload;
    return next();
  }

  // todo type any
  const { payload: refreshPayload, expired: refreshExpired }: any =
    expired && refreshToken ? verifyJWT(refreshToken) : { payload: null };

  if (!refreshPayload) {
    return next();
  }

  const session = await SessionRepo.findOneById(refreshPayload.sessionId);
  if (!session) {
    return next();
  }
  const newAccessToken = signJWT({ sessionId: session.id, userId: session.userId }, accessTokenMaxAge.expiresIn);

  res.cookie("accessToken", newAccessToken, {
    maxAge: accessTokenMaxAge.ms,
    httpOnly: true,
    sameSite: "strict",
    secure: true,
  });

  //@ts-ignore
  req.user = verifyJWT(newAccessToken).payload as any;

  return next();
}

export default deserializeUser;
