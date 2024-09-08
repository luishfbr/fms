"use server";

import { prisma } from "@/app/utils/prisma";
import { auth, signIn } from "@/services/auth";
import { compareSync } from "bcrypt-ts";
import qrcode from "qrcode";

export const VerifySession = async () => {
  const session = await auth();
  if (session) {
    return true;
  }
};

export const githubLogin = async () => {
  const response = await signIn("github");
  if (response === true) {
    return true;
  }
  return false;
};

export const login = async (formData: FormData) => {
  const response = await signIn("credentials", formData);
};

export const loginWithCredentials = async (formData: FormData) => {
  const response = await prisma.user.findUnique({
    where: {
      email: formData.get("email") as string,
    },
    select: {
      id: true,
      password: true,
    },
  });
  if (response) {
    const isValid = compareSync(
      formData.get("password") as string,
      response.password as string
    );
    if (isValid) {
      return response;
    }
  }
  return null;
};

export const getQrCodeByEmail = async (id: string) => {
  const response = await prisma.user.findUnique({
    where: { id },
    select: { otpSecret: true, email: true },
  });

  if (response) {
    const username = response.email?.split("@")[0];
    const otpSecret = response.otpSecret as string;
    const issuer = "DeVfonT";
    const otpauthUrl = `otpauth://totp/${username}?secret=${otpSecret}&issuer=${issuer}`;
    const qrCodeUrl = await qrcode.toDataURL(otpauthUrl);
    return qrCodeUrl;
  }
};
