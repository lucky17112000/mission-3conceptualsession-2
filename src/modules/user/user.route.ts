import { Request, Response, Router } from "express";
import { pool } from "../../database/db";
import { userController } from "./user.controller";
import verify from "../../middlware/verify";
import auth from "../../middlware/auth";

const router = Router();
router.post("/", userController.createUser);
router.get("/", auth(), userController.getAlluser);
router.get("/single", auth(), userController.getSingleuser);
export const userRoute = router;
