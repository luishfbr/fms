import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/app/utils/prisma";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { authenticator } from "otplib";

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
  session: {
    strategy: "jwt",
  },
  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    Credentials({
      credentials: {
        code: {},
        id: {},
      },
      authorize: async (credentials) => {
        const code = credentials?.code as string;
        const id = credentials?.id as string;

        const user = await prisma.user.findUnique({
          where: {
            id,
          },
        });

        if (!user || !user.otpSecret) {
          return null;
        }

        const isValid = authenticator.verify({
          token: code,
          secret: user.otpSecret,
        });

        if (isValid) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
});
