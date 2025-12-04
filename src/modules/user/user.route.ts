import { Request, Response, Router } from "express";
import { pool } from "../../database/db";
import { userController } from "./user.controller";
import verify from "../../middlware/verify";
import auth from "../../middlware/auth";
import { Roles } from "../auth/auth.constant";

const router = Router();
router.post("/", userController.createUser);
router.get("/", auth(Roles.admin), userController.getAlluser);
router.get("/single", userController.getSingleuser);
export const userRoute = router;
