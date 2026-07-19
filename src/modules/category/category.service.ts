import { prisma } from "../../lib/prisma.js";

const createCategory = async (payload: {
  name: string;
  description?: string;
  image?: string;
}) => {
  return prisma.category.create({
    data: payload,
  });
};

const getAllCategories = async () => {
  return prisma.category.findMany();
};

export const categoryService = {
  createCategory,
  getAllCategories,
};