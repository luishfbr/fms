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

export const deleteUser = async (email: string) => {
  await prisma.user.delete({
    where: {
      email,
    },
  });
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
