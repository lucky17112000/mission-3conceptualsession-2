import express, { Request, Response } from "express";
const app = express();
import { Pool } from "pg";

app.use(express.json());

const pool = new Pool({
  connectionString:
    "postgresql://neondb_owner:npg_rT2aYmL4WeKE@ep-lingering-cherry-a8qc08ne-pooler.eastus2.azure.neon.tech/neondb?sslmode=require&channel_binding=require",
});

const initDB = async () => {
  await pool.query(`
        
       CREATE TABLE IF NOT EXISTS users(
       id SERIAL PRIMARY KEY,
       name VARCHAR(250) NOT NULL,
       email VARCHAR(150) UNIQUE NOT NULL,
       password TEXT NOT NULL,
       age INT,
       created_at TIMESTAMP DEFAULT NOW(),
       updated_at TIMESTAMP DEFAULT NOW()
       
       )
        `);
  console.log("database connected");
};
initDB();

app.get("/", (req: Request, res: Response) => {
  res.status(200).send("Hello, typescript with express");
});
app.post("/user", async (req: Request, res: Response) => {
  const body = req.body;
  //   console.log(body);
});
app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
