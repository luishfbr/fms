"use server";

import { prisma } from "@/app/utils/prisma";
import { auth, signIn, signOut } from "@/services/auth";
import { compareSync } from "bcrypt-ts";

export const ExistingUser = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const user = await prisma.user.findUnique({
    where: { email },
    select: {
      password: true,
      id: true,
      name: true,
      email: true,
    },
  });

  if (!user || !user.password) {
    return {
      status: 404,
      message: "Usuário não encontrado ou senha não disponível",
    };
  }

  const isPasswordCorrect = compareSync(password, user.password);

  if (!isPasswordCorrect) {
    return {
      status: 401,
      message: "Senha incorreta",
    };
  }

  return {
    status: 200,
    id: user.id,
    message: "Login bem-sucedido",
  };
};

export const LoginWithCredentials = async (formData: FormData) => {
  const response = await ExistingUser(formData);

  if (response.status === 404 || response.status === 401) {
    return { status: response.status, message: response.message };
  }

  if (response.status === 200) {
    return { status: 200, message: "Login bem-sucedido", id: response.id };
  }

  return { status: 500, message: "Erro interno no servidor" };
};

export const VerifySession = async () => {
  const session = await auth();
  return session ? true : false;
};

export const logout = async () => {
  await signOut();
};
