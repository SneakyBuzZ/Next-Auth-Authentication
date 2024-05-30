import { db } from "@/lib/db";

export const getVerificationByEmail = async (email: string) => {
  try {
    const verifiedToken = await db.verificationToken.findFirst({
      where: {
        email,
      },
    });

    return verifiedToken;
  } catch {
    return null;
  }
};

export const getVerificationByToken = async (token: string) => {
  try {
    const verifiedToken = await db.verificationToken.findUnique({
      where: {
        token,
      },
    });

    return verifiedToken;
  } catch {
    return null;
  }
};
