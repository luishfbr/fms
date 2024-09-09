"use server";

import { prisma } from "@/app/utils/prisma";
import { signIn } from "@/services/auth";
import { authenticator, totp } from "otplib";
import qrcode from "qrcode";

// Função para gerar o QR Code a partir do TOTP secret
export const QrCode = async (id: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        otpSecret: true,
        email: true,
      },
    });

    if (!user || !user.otpSecret || !user.email) {
      throw new Error(
        "Usuário ou informações de autenticação não encontrados."
      );
    }

    const email = user.email.split("@")[0]; // Remover '@' para o otpauth
    const otpSecret = user.otpSecret;
    const issuer = "FMS";

    // Gera a URL para TOTP
    const otpUrl = `otpauth://totp/${issuer}:${email}?secret=${otpSecret}&issuer=${issuer}&algorithm=SHA1&digits=6&period=30`;

    // Gera o QR Code a partir da URL
    const qrCodeUrl = await qrcode.toDataURL(otpUrl);

    return qrCodeUrl;
  } catch (error) {
    console.error("Erro ao gerar QR Code:", error);
    throw new Error("Falha ao gerar QR Code.");
  }
};

export const Verify = async (code: string, id: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        otpSecret: true,
        email: true,
        totpIsEnable: true,
      },
    });

    if (!user || !user.otpSecret || !user.email) {
      throw new Error(
        "Usuário ou informações de autenticação não encontrados."
      );
    }

    const otpSecret = user.otpSecret;

    const isValid = authenticator.check(code, otpSecret);

    if (!isValid) {
      throw new Error("Código de verificação inválido.");
    }

    const updateTotpIsEnable = await prisma.user.update({
      where: { id },
      data: { totpIsEnable: true },
    });

    if (!updateTotpIsEnable) {
      throw new Error("Falha ao atualizar o status do TOTP.");
    }

    return user;
  } catch (error) {
    console.error("Erro ao verificar o código de autenticação:", error);
    throw new Error("Falha na verificação do código.");
  }
};
