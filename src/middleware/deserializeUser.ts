import { NextFunction, Response } from "express";
import { AuthedRequest, signJWT, verifyJWT } from "../utils/jwt-utils";
import SessionRepository from "../database/repositories/Users/Sessions/SessionRepository";

const SessionRepo = new SessionRepository();

export const accessTokenMaxAge = {
  expiresIn: "15s",
  ms: 15 * 1000,
};

async function deserializeUser(req: AuthedRequest, res: Response, next: NextFunction) {
  const { accessToken, refreshToken } = req.cookies;

  if (!accessToken) {
    if (!refreshToken) {
      return next();
    }
  }

  const { payload, expired } = verifyJWT(accessToken);

  if (payload) {
    req.user = payload as any;
    return next();
  }

  // todo type any
  const { payload: refreshPayload, expired: refreshExpired }: any =
    expired && refreshToken ? verifyJWT(refreshToken) : { payload: null };
  console.log(refreshPayload, "refreshPayload");
  console.log(payload, "payload");
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

  req.user = verifyJWT(newAccessToken).payload as any;

  return next();
}

export default deserializeUser;
