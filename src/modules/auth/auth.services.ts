import bcrypt from "bcryptjs";
import { pool } from "../../database/db";
import jwt from "jsonwebtoken";

const loginUserIntoDb = async (email: string, password: string) => {
  const user = await pool.query(`SELECT * FROM users WHERE email=$1`, [email]);
  if (user.rows.length === 0) {
    throw new Error("User Not Found");
  }
  const matchedPassword = await bcrypt.compare(password, user.rows[0].password);

  if (!matchedPassword) {
    throw new Error("Invalid credential");
  }

  const jwtPayload = {
    id: user.rows[0].id,
    email: user.rows[0].email,
    name: user.rows[0].name,
    role: user.rows[0].role,
  };
  const secret = "KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30";

  const token = jwt.sign(jwtPayload, secret, { expiresIn: "7d" });

  return { token, user: user.rows[0] };
};

export const authServices = { loginUserIntoDb };
