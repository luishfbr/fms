"use server";

import { signIn } from "@/services/auth";

export async function loginGithub() {
  await signIn("github");
}

export async function loginGoogle() {
  await signIn("google");
}

export async function loginCredentials() {
  return;
}
