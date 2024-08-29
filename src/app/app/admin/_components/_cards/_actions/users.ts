"use server";

import { prisma } from "@/app/utils/prisma";
import { genSaltSync, hashSync } from "bcrypt-ts";

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
  const response = await prisma.user.delete({
    where: {
      email,
    },
  });
  if (response) {
    return true;
  } else {
    return false;
  }
};

export const deleteSector = async (id: string) => {
  const response = await prisma.sector.delete({
    where: { id },
  });

  if (response) {
    return true;
  }
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

const salt = genSaltSync(10);

export const updatePassword = async (
  email: string,
  password: string
): Promise<boolean> => {
  try {
    const hashedPassword = hashSync(password, salt);

    const updatedPassword = await prisma.user.update({
      where: { email },
      data: { password: hashedPassword },
    });

    return !!updatedPassword; // Retorna verdadeiro se o usuário foi atualizado com sucesso
  } catch (error) {
    console.error("Erro ao atualizar senha:", error);
    return false;
  }
};

export const getUsersOnSectorById = async (
  sectorId: string
): Promise<string[]> => {
  const users = await prisma.user.findMany({
    where: {
      sectors: {
        some: {
          id: sectorId,
        },
      },
    },
    select: {
      name: true,
    },
  });

  return users.map((user) => user.name || "");
};
