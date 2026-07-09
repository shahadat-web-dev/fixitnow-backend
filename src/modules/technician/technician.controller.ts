import { Request, Response } from "express";
import httpStatus from "http-status";
import { technicianService } from "./technician.service";


const getAllTechnicians = async (req: Request, res: Response) => {
  const result = await technicianService.getAllTechnicians();

  res.status(200).json({
    success: true,
    message: "Technicians retrieved successfully",
    data: result,
  });
};



const updateProfile = async (req: Request, res: Response) => {
  if (!req.user) {
    throw new Error("Unauthorized");
  }

  const result = await technicianService.updateProfile(
    req.user.id,
    req.body
  );

  res.status(httpStatus.OK).json({
    success: true,
    message: "Technician profile updated successfully",
    data: result,
  });
};


const updateAvailability = async (req: Request, res: Response) => {
  if (!req.user) {
    throw new Error("Unauthorized");
  }

  const result = await technicianService.updateAvailability(
    req.user.id,
    req.body
  );

  res.status(httpStatus.OK).json({
    success: true,
    message: "Availability updated successfully",
    data: result,
  });
};


const getTechnicianBookings = async (req: Request, res: Response) => {
  if (!req.user) {
    throw new Error("Unauthorized");
  }

  const result = await technicianService.getTechnicianBookings(req.user.id);

  res.status(httpStatus.OK).json({
    success: true,
    message: "Bookings retrieved successfully",
    data: result,
  });
};


const updateBookingStatus = async (req: Request, res: Response) => {
  if (!req.user) {
    throw new Error("Unauthorized");
  }

  console.log(req.body);

  const bookingId = req.params.id;

  if (!bookingId || Array.isArray(bookingId)) {
    throw new Error("Invalid booking id");
  }

  const result = await technicianService.updateBookingStatus(
    req.user.id,
    bookingId,
    req.body.status
  );

  res.status(httpStatus.OK).json({
    success: true,
    message: "Booking status updated successfully",
    data: result,
  });
};

export const technicianController = {
  updateProfile,
  updateAvailability,
  getTechnicianBookings,
  updateBookingStatus,
  getAllTechnicians
};