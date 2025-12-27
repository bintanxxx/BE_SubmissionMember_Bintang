import { Request, Response, NextFunction } from "express";
import * as eventService from "../services/eventService";
import { AuthRequest } from "../middlewares/authMiddleware";

export const createEvent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = (req as AuthRequest).user!.id;
    const { title, description, event_date, location, quota_total, price } =
      req.body;

    const newEvent = await eventService.createEvent({
      organizer_id: userId,
      title,
      description,
      event_date: new Date(event_date), // Konversi string ke Date
      location,
      quota_total: Number(quota_total), // Pastikan number
      price: Number(price),
    });

    res.status(201).json({
      status: "success",
      message: "Event created successfully",
      data: newEvent,
    });
  } catch (error) {
    next(error);
  }
};

export const getEvents = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const events = await eventService.getAllEvents();
    res.status(200).json({
      status: "success",
      data: events,
    });
  } catch (error) {
    next(error);
  }
};

export const getEventDetail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const event = await eventService.getEventById(id);
    res.status(200).json({
      status: "success",
      data: event,
    });
  } catch (error: any) {
    if (error.message === "Event not found") error.statusCode = 404;
    next(error);
  }
};
