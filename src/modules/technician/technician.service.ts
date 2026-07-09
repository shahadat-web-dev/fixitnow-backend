import { prisma } from "../../lib/prisma";
import { BookingStatus } from "../../../generated/prisma/enums";


const getAllTechnicians = async () => {
  return prisma.technicianProfile.findMany({
    include: {
      user: {
        omit: {
          password: true,
        },
      },
    },
  });
};


const updateProfile = async (userId: string, payload: any) => {
  const technician = await prisma.technicianProfile.findUniqueOrThrow({
    where: {
      userId,
    },
  });

  const result = await prisma.technicianProfile.update({
    where: {
      id: technician.id,
    },
    data: {
      bio: payload.bio,
      experience: payload.experience,
      address: payload.address,
      city: payload.city,
      isAvailable: payload.isAvailable,
    },
    include: {
      user: {
        omit: {
          password: true,
        },
      },
      services: true,
      availability: true,
    },
  });

  return result;
};


const updateAvailability = async (
  userId: string,
  payload: any
) => {

  const technician = await prisma.technicianProfile.findUniqueOrThrow({
    where: {
      userId,
    },
  });

  // পুরনো availability delete
  await prisma.availability.deleteMany({
    where: {
      technicianId: technician.id,
    },
  });

  // নতুন availability create
  await prisma.availability.createMany({
    data: payload.availability.map((item: any) => ({
      technicianId: technician.id,
      startTime: new Date(item.startTime),
      endTime: new Date(item.endTime),
      status: "AVAILABLE",
    })),
  });

  return prisma.availability.findMany({
    where: {
      technicianId: technician.id,
    },
  });
};


const getTechnicianBookings = async (userId: string) => {
  const technician = await prisma.technicianProfile.findUniqueOrThrow({
    where: {
      userId,
    },
  });

  const bookings = await prisma.booking.findMany({
    where: {
      technicianId: technician.id,
    },
    include: {
      customer: {
        omit: {
          password: true,
        },
      },
      service: true,
      payment: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return bookings;
};




const updateBookingStatus = async (
  userId: string,
  bookingId: string,
  status: BookingStatus
) => {

  const technician = await prisma.technicianProfile.findUniqueOrThrow({
    where: {
      userId,
    },
  });

  const booking = await prisma.booking.findFirstOrThrow({
    where: {
      id: bookingId,
      technicianId: technician.id,
    },
  });

  // Status validation
  if (
    booking.status === "REQUESTED" &&
    !["ACCEPTED", "DECLINED"].includes(status)
  ) {
    throw new Error("Booking can only be accepted or declined.");
  }

  if (
    booking.status === "ACCEPTED" &&
    status !== "IN_PROGRESS"
  ) {
    throw new Error("Booking can only move to IN_PROGRESS.");
  }

  if (
    booking.status === "IN_PROGRESS" &&
    status !== "COMPLETED"
  ) {
    throw new Error("Booking can only be completed.");
  }

  if (
    booking.status === "DECLINED" ||
    booking.status === "COMPLETED"
  ) {
    throw new Error("Booking status cannot be changed.");
  }

  return prisma.booking.update({
    where: {
      id: booking.id,
    },
    data: {
      status,
    },
    include: {
      customer: {
        omit: {
          password: true,
        },
      },
      service: true,
    },
  });
};


export const technicianService = {
  updateProfile,
  updateAvailability,
  getTechnicianBookings,
  updateBookingStatus,
  getAllTechnicians
};