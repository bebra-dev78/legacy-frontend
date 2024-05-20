"use server";

import prisma from "#/utils/prisma";

export async function createTrades(data) {
  try {
    return await Promise.all(
      data.map(
        async (trade) =>
          await prisma.trades.create({
            data: trade,
          })
      )
    );
  } catch (e) {
    return null;
  }
}

export async function updateRating(id, rating) {
  try {
    await prisma.trades.update({
      where: { id },
      data: {
        rating,
      },
    });
  } catch (e) {
    return null;
  }
}

export async function updateTags(id, tags) {
  try {
    await prisma.trades.update({
      where: { id },
      data: {
        tags,
      },
    });
  } catch (e) {
    return null;
  }
}

export async function updateTrade(id, data) {
  try {
    return await prisma.trades.update({
      where: { id },
      data,
    });
  } catch (e) {
    return null;
  }
}

export async function deleteTrades(ids) {
  try {
    await prisma.trades.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  } catch (e) {
    return null;
  }
}
