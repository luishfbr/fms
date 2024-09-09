import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/app/utils/prisma";
import Credentials from "next-auth/providers/credentials";
import { authenticator } from "otplib";
import { compareSync } from "bcrypt-ts";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: "/",
    signOut: "/",
    error: "/",
    verifyRequest: "/",
    newUser: "/",
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      credentials: {
        email: {},
      },
      authorize: async (credentials) => {
        let user = null;

        const email = credentials?.email as string;

        if (!email) {
          throw new Error("Email is required");
        }

        user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user) {
          throw new Error("Usuário não encontrado");
        }

        return user;
      },
    }),
  ],
});
