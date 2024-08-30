"use server";

import { prisma } from "@/app/utils/prisma";
import { auth } from "@/services/auth";

export const getUserSession = async () => {
  const session = await auth();
  if (session?.user) {
    const response = await prisma.user.findUnique({
      where: {
        email: session.user.email as string,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });
    return response;
  } else {
    throw new Error("Sem sessão ativa");
  }
};

export const getSectors = async (email: string | null) => {
  const sectors = await prisma.user.findMany({
    where: {
      email: email as string,
    },
    include: {
      sectors: true,
    },
  });

  // Assuming that each sector has a unique identifier and the name is a single string
  return sectors
    .map((user) => {
      return user.sectors.map((sector) => ({
        id: sector.id, // Assuming there's an id field for each sector
        name: sector.name, // Assuming name is a single string
      }));
    })
    .flat(); // Flatten the array of arrays into a single array
};

export const getSectorById = async (id: string) => {
  const sector = await prisma.sector.findUnique({
    where: {
      id: id,
    },
    select: {
      id: true,
      name: true,
    },
  });
  return sector;
};
