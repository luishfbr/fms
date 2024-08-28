"use server";

import { prisma } from "@/app/utils/prisma";
import { signIn, signOut } from "@/services/auth";
import { compareSync } from "bcrypt-ts";
import { revalidatePath } from "next/cache";

export const login = async (provider: string) => {
  await signIn(provider, { redirectTo: "/app" });
  revalidatePath("/");
};

export const logout = async () => {
  await signOut({ redirectTo: "/" });
};

export const loginWithCredentials = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    throw new Error("Usuário não encontrado");
  }

  const isValid = compareSync(password, user.password as string);

  if (!isValid) {
    throw new Error("Senha incorreta");
  }

  return user;
};
