import * as jwt from "jsonwebtoken";
import { Request } from "express";
import { ErrorWithStatus } from "../middleware/errorHandler";

export interface AccessTokenPayload extends jwt.JwtPayload {
  userId: number;
  sessionId: number;
}

export interface RefreshTokenPayload extends jwt.JwtPayload {
  sessionId: number;
}

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET ?? "secret";

/* -------------------------------------------------------------------------- */
/*                                JWT functions                               */
/* -------------------------------------------------------------------------- */
export function signJWT(payload: AccessTokenPayload | RefreshTokenPayload, expiresIn: string) {
  return jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn });
}

export function verifyJWT(token: string) {
  try {
    const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET);
    return { payload: decoded, expired: false };
  } catch (e: any) {
    console.log("jwt verification error: ", e);
    return { payload: null, expired: "error: " + e?.message };
  }
}
