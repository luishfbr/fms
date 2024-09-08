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
        password: {},
      },
      authorize: async (credentials) => {
        const email = credentials?.email as string;

        if (!email) {
          throw new Error("Email is required");
        }

        const user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user) {
          throw new Error("Usuário não encontrado");
        }

        const isValid = compareSync(
          credentials.password as string,
          user.password as string
        );

        if (!isValid) {
          throw new Error("Senha incorreta");
        }

        return user;
      },
    }),
  ],
});
