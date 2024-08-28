"use server";

import { prisma } from "@/app/utils/prisma";

export const getUsers = async () => {
  const users = await prisma.user.findMany();

  return users.map((user) => ({
    name: user.name ?? "",
    role: user.role ?? "",
    email: user.email ?? "",
    totpIsEnable: user.totpIsEnable ?? false,
  }));
};

export const getSectors = async () => {
  const sectors = await prisma.sector.findMany();

  return sectors.map((sector) => ({
    name: sector.name ?? "",
    id: sector.id ?? "",
  }));
};

export const deleteUser = async (email: string) => {
  await prisma.user.delete({
    where: {
      email,
    },
  });
};

export const deleteSector = async (id: string) => {
  await prisma.sector.delete({
    where: { id },
  });
  return true;
};

export const getUserByEmail = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
    select: {
      name: true,
      role: true,
      email: true,
    },
  });

  return user;
};

export const updateUser = async (email: string, data: any) => {
  await prisma.user.update({
    where: {
      email,
    },
    data,
  });
};

export const createSector = async (FormData: FormData) => {
  try {
    const name = FormData.get("name") as string;

    const createSector = await prisma.sector.create({
      data: {
        name,
      },
    });

    if (!createSector) {
      throw new Error("Erro ao criar setor");
    } else {
      return true;
    }
  } catch (error: any) {
    console.error("Erro:", error);
  }
};

export const updateRoleUser = async (email: string, data: any) => {
  await prisma.user.update({
    where: {
      email,
    },
    data: {
      role: data.role,
    },
  });
};
