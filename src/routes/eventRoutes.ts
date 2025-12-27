import { Router } from "express";
import {
  createEvent,
  getEvents,
  getEventDetail,
} from "../controllers/eventController";
import {
  authenticateToken,
  authorizeOrganizer,
} from "../middlewares/authMiddleware";

const router = Router();

// endpoint public yg bisa diakses siapa aja
router.get("/", getEvents);
router.get("/:id", getEventDetail);

// endpoint khusus event organizer
router.post("/", authenticateToken, authorizeOrganizer, createEvent);

export default router;
