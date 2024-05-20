import prisma from "#/utils/prisma";

export async function POST(request) {
  try {
    return Response.json(
      await prisma.trades.createMany({
        data: await request.json(),
      })
    );
  } catch (e) {
    return Response.json(null);
  }
}
