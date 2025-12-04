import { Pool } from "pg";

export const pool = new Pool({
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

export default initDB;
