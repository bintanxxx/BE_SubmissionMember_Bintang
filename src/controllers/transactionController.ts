import { Request, Response, NextFunction } from 'express';
import { createTransaction } from '../services/transactionService';
import { AuthRequest } from '../middlewares/authMiddleware';

export const purchaseTicket = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = (req as AuthRequest).user!.id;
        const {event_id, quantity} = req.body;

        if (!event_id || !quantity || quantity <= 0) {
            return res.status(400).json({
                status: "error",
                message: "invalid input data"
            })
        }

        const transaction = await createTransaction({
            userId,
            eventId: event_id,
            quantity: Number(quantity)
        })

        res.status(201).json({
            status: "success",
            message: "ticket booked succesfully",
            data: transaction
        })
    } catch (error: any) {
        if (error.message === 'Event not found') error.statusCode = 404;
        if (error.message.includes('sold out')) error.statusCode = 400;

        next(error);
    }
}