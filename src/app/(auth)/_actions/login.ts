"use server";

import { signIn, signOut } from "@/services/auth";
import { revalidatePath } from "next/cache";

export const login = async (provider: string) => {
  await signIn(provider, { redirectTo: "/app" });
  revalidatePath("/");
};

export const logout = async () => {
  await signOut({ redirectTo: "/" });
};

export const loginWithCredentials = async (formData: FormData) => {
  const { email, password } = Object.fromEntries(formData.entries());
  try {
    await signIn("credentials", { email, password });

    revalidatePath("/");
  } catch (error) {
    if (error instanceof Error) {
      error.message = "Falha ao fazer login";
      throw error;
    }
  }
};
