"use server";

import { prisma } from "@/app/utils/prisma";
import { auth } from "@/services/auth";

export const getUserByEmail = async () => {
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

    if (response) {
      return response; // Return the response containing sectors
    }

    return { sectors: [] }; // Ensure a fallback empty sectors array
  }

  return { sectors: [] }; // Handle cases where there's no session
};

export const getModelsBySectorId = async (sectorId: string) => {
  const response = await prisma.fileTemplate.findMany({
    where: {
      sectorId: sectorId,
    },
    select: {
      id: true,
      modelName: true,
    },
  });

  if (response) {
    return response;
  }
  return [];
};
