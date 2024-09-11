"use server";

import { prisma } from "@/app/utils/prisma";
import { auth } from "@/services/auth";

export const adminButton = async () => {
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

    if (response?.role === "ADMIN") {
      return true;
    }

    return false;
  }
};

export const creatorButton = async () => {
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
    if (response?.role === "CREATOR") {
      return true;
    }
    return false;
  }
};
