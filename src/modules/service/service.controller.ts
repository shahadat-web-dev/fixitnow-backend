import { Request, Response } from "express";
import httpStatus from "http-status";
import { serviceService } from "./service.service";

const createService = async (req: Request, res: Response) => {
  const result = await serviceService.createService(req.body);

  res.status(httpStatus.CREATED).json({
    success: true,
    message: "Service created successfully",
    data: result,
  });
};

const getAllServices = async (req: Request, res: Response) => {
  const result = await serviceService.getAllServices(req.query);

  res.status(httpStatus.OK).json({
    success: true,
    message: "Services retrieved successfully",
    data: result,
  });
};

export const serviceController = {
  createService,
  getAllServices,
};