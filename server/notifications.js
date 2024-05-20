"use server";

import prisma from "#/utils/prisma";

export async function createNotification(uid, title, image_url) {
  try {
    return await prisma.notifications.create({
      data: {
        uid,
        title,
        image_url,
      },
    });
  } catch (e) {
    return null;
  }
}

export async function getNotifications(uid) {
  try {
    return await prisma.notifications.findMany({
      where: { uid },
    });
  } catch (e) {
    return null;
  }
}

export async function readNotifications(uid) {
  try {
    await prisma.notifications.updateMany({
      where: { uid },
      data: {
        read: true,
      },
    });
    return 200;
  } catch (e) {
    return null;
  }
}

export async function deleteNotification(id) {
  try {
    await prisma.notifications.delete({
      where: { id },
    });
    return 200;
  } catch (e) {
    return null;
  }
}
