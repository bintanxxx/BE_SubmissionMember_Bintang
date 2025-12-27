// src/types/express.d.ts

import { Request } from "express";

// Kita "suntikkan" properti user ke dalam Request Express
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        role: string;
      };
    }
  }
}
