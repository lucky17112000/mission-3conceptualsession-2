import express, { Request, Response } from "express";
const app = express();

import { userRoute } from "./modules/user/user.route";
import initDB from "./database/db";
import { authRouter } from "./modules/auth/auth.route";

app.use(express.json());

initDB();

app.get("/", (req: Request, res: Response) => {
  res.status(200).send("Hello, typescript with express");
});
app.use("/api/v1/user", userRoute);
app.use("/api/v1/auth", authRouter);
app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
