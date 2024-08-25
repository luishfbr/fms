import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/app/utils/prisma";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";

export const { handlers, auth, signIn, signOut } = NextAuth({
  pages: {
    signIn: "/auth",
    signOut: "/auth",
    error: "/auth",
    verifyRequest: "/auth",
    newUser: "/app",
  },
  adapter: PrismaAdapter(prisma),
  providers: [GitHub, Google],
});
