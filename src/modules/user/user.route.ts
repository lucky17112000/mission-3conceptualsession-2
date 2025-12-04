import { Request, Response, Router } from "express";
import { pool } from "../../database/db";
import { userController } from "./user.controller";

const router = Router();
router.post("/", userController.createUser);
export const userRoute = router;
