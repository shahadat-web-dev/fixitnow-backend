import { Request, Response } from "express";
import httpStatus from "http-status";
import { categoryService } from "./category.service.js";

const createCategory = async (req: Request, res: Response) => {
  const result = await categoryService.createCategory(req.body);

  res.status(httpStatus.CREATED).json({
    success: true,
    message: "Category created successfully",
    data: result,
  });
};

const getAllCategories = async (req: Request, res: Response) => {
  const result = await categoryService.getAllCategories();

  res.status(httpStatus.OK).json({
    success: true,
    message: "Categories retrieved successfully",
    data: result,
  });
};

export const categoryController = {
  createCategory,
  getAllCategories,
};