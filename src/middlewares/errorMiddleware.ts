// src/middlewares/errorMiddleware.ts
import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  if (statusCode === 500) {
    console.error("SERVER ERROR:", err);
  }

  // FORMAT JSON ERROR PROFESIONAL
  res.status(statusCode).json({
    status: "error", // Frontend tinggal cek: if (res.status === 'error')
    message: message, // Tampilkan ini di Alert/Toast
    errors: err.details || null, // Opsional: jika ada error validasi detail
  });
};
