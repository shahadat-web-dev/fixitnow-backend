import { Request, Response } from "express";
import httpStatus from "http-status";
import { bookingService } from "./booking.service";

const createBooking = async (req: Request, res: Response) => {

  if (!req.user) {
    throw new Error("Unauthorized");
  }

  const result = await bookingService.createBooking(
    req.user.id,
    req.body
  );

  res.status(httpStatus.CREATED).json({
    success: true,
    message: "Booking created successfully",
    data: result,
  });
};

const getMyBookings = async (req: Request, res: Response) => {
  if (!req.user) {
    throw new Error("Unauthorized");
  }

  const result = await bookingService.getMyBookings(req.user.id);

  res.status(200).json({
    success: true,
    message: "Bookings retrieved successfully",
    data: result,
  });
};



const getSingleBooking = async (req: Request, res: Response) => {
  if (!req.user) {
    throw new Error("Unauthorized");
  }

  const bookingId = req.params.id;


  if (!bookingId || Array.isArray(bookingId)) {
    throw new Error("Invalid booking id");
  }

  const result = await bookingService.getSingleBooking(
    req.user.id,
    bookingId
  );

  res.status(httpStatus.OK).json({
    success: true,
    message: "Booking retrieved successfully",
    data: result,
  });
};

export const bookingController = {
  createBooking,
  getMyBookings,
  getSingleBooking
};