import { getVerificationByEmail } from "@/actions/data/verificationToken";
import { v4 as uuidV4 } from "uuid";
import { db } from "@/lib/db";

export const generateVerificationToken = async (email: string) => {
  const token = uuidV4().toString();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getVerificationByEmail(email);

  if (existingToken) {
    await db.verificationToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  const verifiedToken = await db.verificationToken.create({
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
