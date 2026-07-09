import { UserStatus } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";

const getAllUsers = async () => {

  return prisma.user.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

};


const updateUserStatus = async (
  id: string,
  status: UserStatus
) => {

  return prisma.user.update({
    where: {
      id,
    },
    data: {
      status,
    },
  });

};

const getAllBookings = async () => {

  return prisma.booking.findMany({
    include: {
      customer: true,
      service: true,
      technician: {
        include: {
          user: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

};

const getAllCategories = async () => {

  return prisma.category.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

};

const createCategory = async (payload: any) => {

  return prisma.category.create({
    data: payload,
  });

};

export const adminService = {
  getAllUsers,
  updateUserStatus,
  getAllBookings,
  getAllCategories,
  createCategory,
};