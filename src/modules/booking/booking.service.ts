import { prisma } from "../../lib/prisma";

const createBooking = async (userId: string, payload: any) => {
  const service = await prisma.service.findUniqueOrThrow({
    where: {
      id: payload.serviceId,
    },
  });

   console.log("Service:", service);

  if (!service) {
    throw new Error("Service not found");
  }

  const booking = await prisma.booking.create({
    data: {
      customerId: userId,
      technicianId: service.technicianId,
      serviceId: service.id,

      bookingDate: new Date(payload.bookingDate),
      startTime: payload.startTime,
      endTime: payload.endTime,

      address: payload.address,
      note: payload.note,
    },
  });

  return booking;
};

const getMyBookings = async (userId: string) => {
  return prisma.booking.findMany({
    where: {
      customerId: userId,
    },
    include: {
      service: true,
      technician: {
        include: {
          user: true,
        },
      },
      payment: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

const getSingleBooking = async (userId: string, bookingId: string) => {
  return prisma.booking.findFirstOrThrow({
    where: {
      id: bookingId,
      customerId: userId,
    },
    include: {
      service: true,
      technician: {
        include: {
          user: true,
        },
      },
      payment: true,
      review: true,
    },
  });
};

export const bookingService = {
  createBooking,
  getMyBookings,
  getSingleBooking
};