import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";

export interface AuthedRequest extends Request {
  user?: { email: string; id: number };
  token?: string;
}

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET ?? "secret";

function authenticateToken(req: AuthedRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    return res.sendStatus(401);
  }

  jwt.verify(token, ACCESS_TOKEN_SECRET, (err: any, user: any) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.user = user;
    req.token = token;
    next();
  });
}

export default authenticateToken;
