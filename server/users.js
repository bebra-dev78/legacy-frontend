"use server";

import prisma from "#/utils/prisma";

export async function createUser(email, name, password, language) {
  try {
    await prisma.users.create({
      data: {
        email,
        name,
        password,
        language,
      },
    });
    return 200;
  } catch (e) {
    return null;
  }
}

export async function getPasswordResetToken(email) {
  try {
    return await prisma.password_reset_tokens.findFirst({
      where: { email },
    });
  } catch (e) {
    return null;
  }
}

export async function updateUser(id, name, surname, publicName) {
  try {
    if (publicName.length === 0) {
      await prisma.users.update({
        where: {
          id,
        },
        data: {
          name,
          surname,
          public: null,
        },
      });
      return 200;
    } else {
      const u = await prisma.users.findUnique({
        where: {
          public: publicName,
        },
      });
      if (u === null) {
        await prisma.users.update({
          where: {
            id,
          },
          data: {
            name,
            surname,
            public: publicName,
          },
        });
        return 200;
      } else if (u.id === id) {
        await prisma.users.update({
          where: {
            id,
          },
          data: {
            name,
            surname,
            public: publicName,
          },
        });
        return 200;
      } else {
        return 409;
      }
    }
  } catch (e) {
    return null;
  }
}

export async function updatePassword(id, password) {
  try {
    await prisma.users.update({
      where: {
        id,
      },
      data: {
        password,
      },
    });
    return 200;
  } catch (e) {
    return null;
  }
}

export async function updatePrivate(id, privateMode) {
  try {
    await prisma.users.update({
      where: {
        id,
      },
      data: {
        private: privateMode,
      },
    });
    return 200;
  } catch (e) {
    return null;
  }
}

export async function updateConvert(id, convertMode) {
  try {
    await prisma.users.update({
      where: {
        id,
      },
      data: {
        convert: convertMode,
      },
    });
    return 200;
  } catch (e) {
    return null;
  }
}
