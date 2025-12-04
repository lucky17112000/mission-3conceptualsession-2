import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { pool } from "../database/db";

const auth = (...roles: ("admin" | "user")[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;
      console.log(token);
      if (!token) {
        return res.status(401).json({
          success: false,
          message: "You are not authorized",
        });
      }

      const secret = "KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30";

      const decoded = jwt.verify(token, secret) as JwtPayload & {
        role: string;
      };
      console.log(decoded);
      const user = await pool.query(
        `
        SELECT * FROM users WHERE email=$1 `,
        [decoded.email]
      );

      if (user.rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: "User Not Found",
        });
      }

      console.log(decoded);
      req.user = decoded;
      console.log(req.user);
      if (roles.length > 0 && !roles.includes(decoded.role)) {
        return res.status(403).json({
          success: false,
          message: "User not authorized",
        });
      }

      next();
    } catch (err: any) {
      return res.status(500).json({
        success: false,
        message: err.message || "Internal server error",
      });
    }
  };
};
export default auth;
