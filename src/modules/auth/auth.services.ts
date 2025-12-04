import bcrypt from "bcryptjs";
import { pool } from "../../database/db";

const loginUserIntoDb = async (email: string, password: string) => {
  const user = await pool.query(`SELECT * FROM users WHERE email=$1`, [email]);
  const matchedPassword = await bcrypt.compare(password, user.rows[0].password);
  if (!matchedPassword) {
    throw new Error("Invalid credential");
  }
};

export const authServices = { loginUserIntoDb };
