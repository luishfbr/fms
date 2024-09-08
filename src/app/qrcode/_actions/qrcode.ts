"use server";

import { authenticator, totp } from "otplib";
import { prisma } from "@/app/utils/prisma";
import { auth, signIn } from "@/services/auth";
import { redirect } from "next/navigation";

interface User {
  code: string;
  id: string;
}

export const getUserById = async (id: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });
    return user;
  } catch (error) {
    console.error("Erro ao obter usuário por ID:", error);
    throw error;
  }
};

export const verifyOTP = async (token: string, id: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) throw new Error("Usuário não encontrado.");

    const otpSecret = user.otpSecret as string;
    const checkOTP = authenticator.check(token, otpSecret);

    if (checkOTP) {
      const updateTOTP = await prisma.user.update({
        where: {
          id,
        },
        data: {
          totpIsEnable: true,
        },
      });

      if (!updateTOTP) throw new Error("Erro ao atualizar TOTP");

      return true;
    } else {
      throw new Error("Código OTP inválido.");
    }
  } catch (error) {
    console.error("Erro ao verificar OTP:", error);
    throw error;
  }
};

export const loginWithCode = async (data: User) => {
  await signIn("credentials", { data });
};

export const verifySession = async () => {
  const session = await auth();
  if (!session?.user) {
    throw new Error("Sem sessão ativa");
  } else {
    redirect("/app");
  }
};
