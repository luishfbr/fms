"use server";

import { prisma } from "@/app/utils/prisma";
import { auth, signIn } from "@/services/auth";
import { compareSync } from "bcrypt-ts";
import { revalidatePath } from "next/cache";

export const login = async (formData: FormData) => {
  console.log(formData);
};

export const VerifySession = async () => {
  const session = await auth();
  if (session) {
    return true;
  }
};
