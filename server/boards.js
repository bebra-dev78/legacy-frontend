"use server";

import prisma from "#/utils/prisma";

export async function createBoard(uid, title) {
  try {
    return await prisma.boards.create({
      data: {
        uid,
        title,
      },
    });
  } catch (e) {
    return null;
  }
}

export async function getBoards(uid) {
  try {
    return await prisma.boards.findMany({
      where: { uid },
    });
  } catch (e) {
    return null;
  }
}

export async function updateBoard(id, widgets) {
  try {
    await prisma.boards.update({
      where: { id },
      data: {
        widgets,
      },
    });
    return 200;
  } catch (e) {
    return null;
  }
}

export async function deleteBoard(id) {
  try {
    await prisma.boards.delete({
      where: { id },
    });
    return 200;
  } catch (e) {
    return null;
  }
}
