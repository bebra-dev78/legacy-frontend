import { getServerSession } from "next-auth/next";

import { authConfig } from "#/utils/auth";
import prisma from "#/utils/prisma";

export async function GET() {
  var s = await getServerSession(authConfig);

  if (s === null) {
    return Response.json(null);
  } else {
    const user = await prisma.users.findUnique({
      where: { email: s.user.email },
    });

    return Response.json([
      user,
      await prisma.keys.findMany({
        where: { uid: user.id },
      }),
    ]);
  }
}
