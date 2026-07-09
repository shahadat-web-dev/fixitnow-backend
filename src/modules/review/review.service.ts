import { BookingStatus } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";

const createReview = async (
  customerId: string,
  payload: {
    bookingId: string;
    rating: number;
    comment?: string;
  }
) => {

  const booking = await prisma.booking.findFirstOrThrow({
    where: {
      id: payload.bookingId,
      customerId,
      status: BookingStatus.COMPLETED,
    },
    include: {
      review: true,
    },
  });

  if (booking.review) {
    throw new Error("Review already submitted.");
  }

  const review = await prisma.review.create({
    data: {
      bookingId: booking.id,
      customerId,
      technicianId: booking.technicianId,
      rating: payload.rating,
      comment: payload.comment,
    },
  });

  const stats = await prisma.review.aggregate({
    where: {
      technicianId: booking.technicianId,
    },
    _avg: {
      rating: true,
    },
    _count: {
      rating: true,
    },
  });

  await prisma.technicianProfile.update({
    where: {
      id: booking.technicianId,
    },
    data: {
      averageRating: stats._avg.rating ?? 0,
      totalReviews: stats._count.rating,
    },
  });

  return review;
};

export const reviewService = {
  createReview,
};