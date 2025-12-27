import { prisma } from "../configs/database";

interface CreateTransactionInput {
  userId: string;
  eventId: string;
  quantity: number;
}

export const createTransaction = async (data: CreateTransactionInput) => {
  return await prisma.$transaction(async (tx) => {
    // 1. pertama cari event
    const event = await tx.events.findUnique({
      where: { id: data.eventId },
    });

    if (!event) throw new Error("Event not found");

    // 2. cek stok
    if (event.quota_available < data.quantity)
      throw new Error("Ticket sold out or requested quantity exceeds limit");

    // 3. hitung total harga
    const totalAmount = Number(event.price) * data.quantity;

    // 4. kurangi stok
    await tx.events.update({
      where: { id: data.eventId },
      data: {
        quota_available: {
          decrement: data.quantity,
        },
      },
    });

    // 5. buat transaksi baru
    const newTransaction = await tx.transactions.create({
      data: {
        user_id: data.userId,
        event_id: data.eventId,
        quantity: data.quantity,
        total_amount: totalAmount,
        status: "PENDING",
        payment_deadline: new Date(Date.now() + 60 * 60 * 1000),
      },
    });

    return newTransaction;
  });
};
