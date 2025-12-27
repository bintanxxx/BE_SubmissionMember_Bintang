import { prisma } from "../configs/database";

interface CreateEventInput {
  organizer_id: string;
  title: string;
  description: string;
  event_date: Date;
  location: string;
  quota_total: number;
  price: number;
}

// 1. membuat event
export const createEvent = async (data: CreateEventInput) => {
  return await prisma.events.create({
    data: {
      organizer_id: data.organizer_id,
      title: data.title,
      description: data.description,
      event_date: data.event_date,
      location: data.location,
      quota_total: data.quota_total,
      quota_available: data.quota_total,
      price: data.price,
    },
  });
};

// 2;
export const getAllEvents = async () => {
  return await prisma.events.findMany({
    include: {
      users: {
        select: { full_name: true, email: true },
      },
    },
  });
};

// 3.
export const getEventById = async (id: string) => {
  const event = await prisma.events.findUnique({
    where: { id: id },
  });

  if (!event) throw new Error("Event not found");

  return event;
};
