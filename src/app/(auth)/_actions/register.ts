"use server";

import { prisma } from "@/app/utils/prisma";
import { registerSchema } from "@/lib/zod";
import { genSaltSync, hashSync } from "bcrypt-ts";
import { randomBytes } from "crypto";
import base32 from "hi-base32";
import { z } from "zod";

type data = z.infer<typeof registerSchema>;

// Definição do salt para hash de senha
const salt = genSaltSync(10);

export default async function RegisterUser(data: data) {
  try {
    const { name, email, password, role } = data;

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
        role: role,
      },
    });

    if (createUser) {
      console.log("Usuário criado com sucesso!");
      return true;
    } else {
      console.log("Usuário já existe");
      return false;
    }
  } catch (error: any) {
    console.error("Erro:", error);
  }
}
