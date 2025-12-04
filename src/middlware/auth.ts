import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { pool } from "../database/db";

const auth = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    console.log(token);
    if (!token) {
      throw new Error("You are not authorized");
    }

    const secret = "KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30";

    const decoded = jwt.verify(token, secret) as JwtPayload;
    console.log(decoded);
    const user = await pool.query(
      `
        SELECT * FROM users WHERE email=$1 `,
      [decoded.email]
    );

    if (user.rows.length === 0) {
      throw new Error("User Not Found");
    }

    console.log(decoded);
    req.user = decoded;
    console.log(req.user);

    next();
  };
};
export default auth;
