"use server";

import { prisma } from "@/app/utils/prisma";
import { auth } from "@/services/auth";

export const checkButton = async () => {
  const session = await auth();
  if (session?.user) {
    const email = session.user.email as string;
    const response = await prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        role: true,
      },
    });

    console.log(response);

    if (response?.role === "creator" || response?.role === "admin") {
      return true;
    }

    return false;
  }
};

export const getSectors = async () => {
  const session = await auth();
  if (session?.user) {
    const email = session.user.email as string;
    const response = await prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        sectors: {
          select: {
            name: true,
            id: true,
          },
        },
      },
    });
    return response;
  }
};

export const getModels = async (sectorId: string) => {
  const response = await prisma.fileTemplate.findMany({
    where: {
      sectorId: sectorId,
    },
    include: {
      fieldsModel: true,
    },
  });

  if (response) {
    return response;
  }
};
