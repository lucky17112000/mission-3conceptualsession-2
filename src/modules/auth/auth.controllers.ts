import { Request, Response } from "express";
import { authServices } from "./auth.services";

const logInUser = async (req: Request, res: Response) => {
  try {
    //   console.log(result);
    const { email, password } = req.body;
    const result = await authServices.loginUserIntoDb(email, password);
    return res.status(201).json({
      success: true,
      message: "User Created",
      data: result,
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: "internal server error",
      data: err.message,
    });
  }
};

export const authController = {
  logInUser,
};
