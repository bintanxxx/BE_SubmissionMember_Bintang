import { Request, Response, NextFunction } from "express";
import { registerUser, loginUser } from "../services/authService";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { fullName, email, password, role } = req.body;

    const user = await registerUser({
      fullName,
      email,
      password,
      role,
    });

    res.status(201).json({
      status: "success",
      message: "Registration Successful",
      data: user,
    });
  } catch (error: any) {
    if (error.message === "Email already exists") {
      error.statusCode = 400;
    }

    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    const result = await loginUser({ email, password });

    res.status(200).json({
      status: "success",
      message: "Login successful",
      data: result,
    });
  } catch (error: any) {
    if (error.message === "Invalid email or password") {
      error.statusCode = 401;
    }
    next(error);
  }
};
