"use server";

import { prisma } from "@/app/utils/prisma";
import { genSaltSync, hashSync } from "bcrypt-ts";
import { randomBytes } from "crypto";
import base32 from "hi-base32";

// Definição do salt para hash de senha
const salt = genSaltSync(10);

export default async function register(FormData: FormData) {
  try {
    const name = FormData.get("name") as string;
    const email = FormData.get("email") as string;
    const password = FormData.get("password") as string;

    // Hash da senha
    const hashedPassword = hashSync(password, salt);

    // Criando o OTP Secret
    const secretBuffer = randomBytes(20);
    const otpSecret = base32.encode(secretBuffer).replace(/=/g, "");

    const createUser = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: hashedPassword,
        otpSecret: otpSecret,
        totpIsEnable: false,
      },
    });

    if (createUser) {
      console.log("Usuário criado com sucesso!");
    } else {
      console.log("Usuário já existe");
    }
  } catch (error: any) {
    console.error("Erro:", error);
  }
}
