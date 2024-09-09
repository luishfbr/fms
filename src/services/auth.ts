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
  session: {
    strategy: "jwt",
  },
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
        let user = null;

        const email = credentials?.email as string;
        const password = credentials?.password as string;

        user = await prisma.user.findUnique({
          where: { email },
        });

        const isValid = compareSync(password, user?.password as string);

        if (!isValid) {
          throw new Error("Senha incorreta");
        }

        if (!user) {
          throw new Error("Usuário não encontrado");
        }

        return user;
      },
    }),
  ],
});
