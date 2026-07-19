import { Request, Response } from "express";
import httpStatus from "http-status";
import { adminService } from "./admin.service.js";
import { UserStatus } from "../../../generated/prisma/enums.js";

const getAllUsers = async (
  req: Request,
  res: Response
) => {

  const result = await adminService.getAllUsers();

  res.status(httpStatus.OK).json({
    success: true,
    message: "Users retrieved successfully",
    data: result,
  });

};

const updateUserStatus = async (
  req: Request,
  res: Response
) => {

  const result = await adminService.updateUserStatus(
    req.params.id as string,
    req.body.status as UserStatus
  );

  res.status(httpStatus.OK).json({
    success: true,
    message: "User status updated successfully",
    data: result,
  });

};

const getAllBookings = async (
  req: Request,
  res: Response
) => {

  const result = await adminService.getAllBookings();

  res.status(httpStatus.OK).json({
    success: true,
    message: "Bookings retrieved successfully",
    data: result,
  });

};

const getAllCategories = async (
  req: Request,
  res: Response
) => {

  const result = await adminService.getAllCategories();

  res.status(httpStatus.OK).json({
    success: true,
    message: "Categories retrieved successfully",
    data: result,
  });

};

const createCategory = async (
  req: Request,
  res: Response
) => {

  const result = await adminService.createCategory(req.body);

  res.status(httpStatus.CREATED).json({
    success: true,
    message: "Category created successfully",
    data: result,
  });

};

export const adminController = {
  getAllUsers,
  updateUserStatus,
  getAllBookings,
  getAllCategories,
  createCategory,
};