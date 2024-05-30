import { v4 as uuidV4 } from "uuid";
import { db } from "@/lib/db";
import { getResetPasswordTokenByEmail } from "@/actions/data/resetToken";

export const generateResetPasswordToken = async (email: string) => {
  const token = uuidV4().toString();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getResetPasswordTokenByEmail(email);

  if (existingToken) {
    await db.resetPasswordToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  const verifiedToken = await db.resetPasswordToken.create({
    data: {
      token,
      expires,
      email,
    },
  });

  return {
    status: 200,
    data: verifiedToken,
    message: "Verification token successfully generated",
  };
};
