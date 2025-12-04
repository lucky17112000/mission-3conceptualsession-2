import bcrypt from "bcryptjs";
import { pool } from "../../database/db";

const createUserIntoDb = async (payload: Record<string, unknown>) => {
  const { name, email, password } = payload;
  const hashedPassword = await bcrypt.hash(password as string, 12);

  const result = await pool.query(
    `INSERT INTO users(name , email , password) VALUES($1 , $2 , $3)
    RETURNING *`,
    [name, email, hashedPassword]
  );
  delete result.rows[0].password;
  return result;
};

export const userServices = { createUserIntoDb };
