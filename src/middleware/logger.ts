import { Request, Response, NextFunction } from "express";

export default function logger(req: Request, res: Response, next: NextFunction) {
  console.log(`Request method: ${req.method}`);
  console.log(`Request URL: ${req.url}`);
  //console.log(`Request headers: ${JSON.stringify(req.headers)}`);
  console.log(`Request body: ${JSON.stringify(req.body)}`);
  console.log("Response status code: ", res.statusCode);
  next();
}
