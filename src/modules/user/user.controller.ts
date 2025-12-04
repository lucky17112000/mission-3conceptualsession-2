import { Request, Response } from "express";
import { pool } from "../../database/db";
import { userServices } from "./user.services";

const createUser = async (req: Request, res: Response) => {
  try {
    const result = await userServices.createUserIntoDb(req.body);
    //   console.log(result);
    return res.status(201).json({
      success: true,
      message: "User Created",
      data: result.rows[0],
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: "internal server error",
      data: err.message,
    });
  }
};

export const userController = {
  createUser,
};
