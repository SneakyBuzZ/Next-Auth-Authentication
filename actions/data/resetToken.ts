import { db } from "@/lib/db";

export const getResetPasswordTokenByEmail = async (email: string) => {
  try {
    const verifiedToken = await db.resetPasswordToken.findFirst({
      where: {
        email,
      },
    });

    return verifiedToken;
  } catch {
    return null;
  }
};

export const getResetPasswordTokenByToken = async (token: string) => {
  try {
    const verifiedToken = await db.resetPasswordToken.findUnique({
      where: {
        token,
      },
    });

    return verifiedToken;
  } catch {
    return null;
  }
};
