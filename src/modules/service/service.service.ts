import { prisma } from "../../lib/prisma.js";


const createService = async (payload: any) => {
  return prisma.service.create({
    data: payload,
  });
};


const getAllServices = async (query: any) => {
  const { categoryId, city, minPrice, maxPrice } = query;

  const services = await prisma.service.findMany({
    where: {
      ...(categoryId && { categoryId }),

      ...(city && {
        technician: {
          city: {
            contains: city,
            mode: "insensitive",
          },
        },
      }),

      ...(minPrice || maxPrice
        ? {
            price: {
              ...(minPrice && { gte: Number(minPrice) }),
              ...(maxPrice && { lte: Number(maxPrice) }),
            },
          }
        : {}),

      isActive: true,
    },

    include: {
      category: true,
      technician: {
        include: {
          user: true,
        },
      },
    },
  });

  return services;
};

export const serviceService = {
  createService,
  getAllServices,
};