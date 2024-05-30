"use server";

import * as z from "zod";
import { db } from "@/lib/db";
import { delay } from "@/lib/utils";
import bcryptjs from "bcryptjs";
import { signIn } from "@/auth";
import { defaultLoginRedirect } from "@/route";
import { AuthError } from "next-auth";
import { loginSchema, registerSchema } from "@/lib/schemas";
import { generateVerificationToken } from "@/lib/verification";
import { getUserByEmail } from "./data/user";
import { sendVerificationEmail } from "@/lib/mail";

export const loginAction = async (user: z.infer<typeof loginSchema>) => {
  const validatedFields = loginSchema.safeParse(user);

  if (!validatedFields.success) {
    return {
      status: 400,
      message: "Validation failed",
    };
  }

  const { email, password } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return {
      status: 400,
      message: "Email does not exist",
    };
  }

  if (!existingUser.emailVerified) {
    const verifiedToken = await generateVerificationToken(existingUser.email);

    await sendVerificationEmail(
      verifiedToken.data.email,
      verifiedToken.data.token
    );

    if (verifiedToken) {
      return {
        status: 200,
        message: "Confirmation email sent",
      };
    }
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: defaultLoginRedirect,
    });

    return {
      status: 200,
      message: "Login successful",
    };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            status: 400,
            message: "Invalid Credentials",
          };

        default:
          return {
            status: 400,
            message: "Something went wrong kaushik!",
          };
      }
    }

    throw error;
  }
};

export const registerAction = async (user: z.infer<typeof registerSchema>) => {
  const validatedFields = registerSchema.safeParse(user);

  if (!validatedFields.success) {
    return {
      status: 400,
      message: "Validation failed",
    };
  }

  const { email, name, password } = validatedFields.data;

  const hashedPassword = await bcryptjs.hash(password, 10);

  const existingUser = await db.user.findUnique({
    where: {
      email,
    },
  });

  if (existingUser) {
    return {
      status: 400,
      message: "User already registered",
    };
  }

  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  const verifiedToken = await generateVerificationToken(email);

  await sendVerificationEmail(
    verifiedToken.data.email,
    verifiedToken.data.token
  );

  await delay(400);
  return {
    status: 200,
    message: "Register successful",
  };
};

export const verifyNewToken = async (token: string) => {
  const existingToken = await db.verificationToken.findUnique({
    where: {
      token,
    },
  });

  if (!existingToken) {
    return {
      status: 400,
      message: "Invalid token",
    };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();
  if (hasExpired) {
    return {
      status: 400,
      message: "Token has expired",
    };
  }

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingToken) {
    return {
      status: 400,
      message: "User does not exist",
    };
  }

  await db.user.update({
    where: {
      id: existingUser.id,
    },
    data: {
      emailVerified: new Date(),
      email: existingToken.email,
    },
  });

  await db.verificationToken.delete({
    where: {
      id: existingToken.id,
    },
  });

  return {
    status: 200,
    message: "Email verified",
  };
};
