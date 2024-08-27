"use server";

import { auth } from "@/services/auth";

export const adminButton = async () => {
  const session = auth();
};
