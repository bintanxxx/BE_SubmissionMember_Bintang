import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
  user?: {
    id: string;
    role: string;
  };
}

// 1. middleware cek login (authentication)
export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];

  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      status: "error",
      message: "Access denied. No token provided.",
    });
  }

  try {
    // verivikasi token
    const secret =
      process.env.JWT_SECRET || "rahasia_super_aman_jangan_disebar";
    const decoded = jwt.verify(token, secret) as { id: string; role: string };

    (req as AuthRequest).user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({
      status: "error",
      message: "Invalid or expired token.",
    });
  }
};

// 2. middelware untuk cek role (authorization)
export const authorizeOrganizer = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // pastikan user sudah login atau sudah ada req.user
  const user = (req as AuthRequest).user;
  if (!user || user.role !== "ORGANIZER") {
    return res.status(403).json({
      status: "error",
      message: "Access denied. Organizers only.",
    });
  }

  next();
};
