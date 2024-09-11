"use server";

import { prisma } from "@/app/utils/prisma";
import { auth, signIn, signOut } from "@/services/auth";
import { compareSync } from "bcrypt-ts";
import { authenticator } from "otplib";
import qrcode from "qrcode";

export const Login = async (formData: FormData) => {
  await signIn("credentials", formData);
};

export const VerifySession = async () => {
  const session = await auth();
  return session ? true : false;
};

export const logout = async () => {
  await signOut();
};

export const verifyCredentials = async (formData: FormData) => {
  const response = await prisma.user.findUnique({
    where: { email: formData.get("email") as string },
    select: {
      password: true,
      id: true,
      email: true,
    },
  });

  if (!response) {
    throw new Error("Usuário não encontrado");
  }

  const isPasswordCorrect = compareSync(
    formData.get("password") as string,
    response.password as string
  );

  if (!isPasswordCorrect) throw new Error("Senha incorreta");

  return response;
};

export const getQRCode = async (formData: FormData) => {
  const user = await prisma.user.findUnique({
    where: { email: formData.get("email") as string },
    select: {
      otpSecret: true,
      email: true,
    },
  });

  const email = user?.email?.split("@")[0];
  const otpSecret = user?.otpSecret;
  const issuer = "FMS";

  const otpUrl = `otpauth://totp/${issuer}:${email}?secret=${otpSecret}&issuer=${issuer}&algorithm=SHA1&digits=6&period=30`;

  return await qrcode.toDataURL(otpUrl);
};

export const verifyTotp = async (formData: FormData) => {
  const response = await prisma.user.findUnique({
    where: { email: formData.get("email") as string },
    select: {
      totpIsEnabled: true,
      id: true,
    },
  });

  if (response?.totpIsEnabled === true) {
    return true;
  }
  return false;
};

export const updateTOTP = async (id: string) => {
  await prisma.user.update({ where: { id }, data: { totpIsEnabled: true } });
  await prisma.user.findUnique({
    where: { id },
    select: {
      email: true,
    },
  });
};

export const getUserByEmail = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: { email },
    select: {
      id: true,
    },
  });

  if (!user) {
    throw new Error("Usuário não encontrado");
  }

  return user;
};

export const verifyOtpCode = async (code: string, id: string) => {
  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      otpSecret: true,
    },
  });

  const otpSecret = user?.otpSecret as string;
  const token = code;

  const isValid = authenticator.verify({ token, secret: otpSecret });

  if (isValid) {
    return true;
  }
  return false;
};

export const verifyOtpCodeByEmail = async (code: string, email: string) => {
  const user = await prisma.user.findUnique({
    where: { email },
    select: {
      otpSecret: true,
    },
  });

  const otpSecret = user?.otpSecret as string;
  const token = code;

  const isValid = authenticator.verify({ token, secret: otpSecret });

  if (isValid) {
    return true;
  }
  return false;
};

export const LoginWithId = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      email: true,
      password: true,
    },
  });

  const formData = new FormData();
  formData.append("email", user?.email as string);

  await signIn("credentials", formData);
  return true;
};

export const loginWithEmail = async (email: string) => {
  const formData = new FormData();
  formData.append("email", email as string);
  await signIn("credentials", formData);
  return true;
};
