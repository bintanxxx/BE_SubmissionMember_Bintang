import express, { Application, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";

import swaggerUi from "swagger-ui-express";
import { swaggerDocument } from "./docs/swagger";

// routes
import authRoutes from "./routes/authRoutes";
import eventRoutes from "./routes/eventRoutes";
import transactionRoutes from "./routes/transactionRoutes";

// middlewares
import { errorHandler } from "./middlewares/errorMiddleware";

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const CSS_URL =
  "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css";
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, { customCssUrl: CSS_URL })
);

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/events", eventRoutes);
app.use("/api/v1/transactions", transactionRoutes);

// Test Route
app.get("/", (req: Request, res: Response) => {
  res.status(200).send({
    message: "Server Backend Ticket Event is Running! 🚀",
    status: "OK",
  });
});

app.use(errorHandler);

// app.listen(PORT, () => {
//   console.log(`🚀 Server running on http://localhost:${PORT}`);
// });

export default app;

// Jalankan server HANYA jika file ini dijalankan langsung (bukan di-import oleh Vercel)
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
}
