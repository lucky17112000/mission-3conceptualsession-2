import { Request, Response, Router } from "express";
import { pool } from "../../database/db";
import { userController } from "./user.controller";
import verify from "../../middlware/verify";

const router = Router();
router.post("/", verify, userController.createUser);
export const userRoute = router;
