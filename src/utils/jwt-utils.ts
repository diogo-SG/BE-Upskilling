import * as jwt from "jsonwebtoken";
import { Request } from "express";

export interface JWTPayload {
  email: string;
  id: number;
}

export interface AuthedRequest extends Request {
  user?: { email: string; id: number };
  token?: string;
  cookies: { [key: string]: string };
}

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET ?? "secret";

/* -------------------------------------------------------------------------- */
/*                                JWT functions                               */
/* -------------------------------------------------------------------------- */
export function signJWT(payload: JWTPayload, expiresIn: string) {
  return jwt.sign(payload, ACCESS_TOKEN_SECRET, { algorithm: "RS256", expiresIn });
}

export function verifyJWT(token: string) {
  try {
    const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET);
    return { payload: decoded, expired: false };
  } catch (e: any) {
    return { payload: null, expired: e?.message?.include("jwt expired") };
  }
}
