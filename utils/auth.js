import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

import prisma from "#/utils/prisma";

export const authConfig = {
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: {
          label: "email",
          type: "text",
        },
        password: {
          label: "password",
          type: "password",
        },
      },
      authorize: (credentials) =>
        prisma.users
          .findUnique({
            where: {
              email: credentials.email,
            },
          })
          .then((u) =>
            u === null
              ? null
              : bcrypt.compareSync(credentials.password, u.password)
              ? u
              : null
          ),
    }),
  ],
  pages: {
    signIn: "/login",
  },
  secret: "bebra",
};
