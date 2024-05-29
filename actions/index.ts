"use server";

import * as z from "zod";
import { db } from "@/lib/db";
import { delay } from "@/lib/utils";
import bcryptjs from "bcryptjs";
import { signIn } from "@/auth";
import { defaultLoginRedirect } from "@/route";
import { AuthError } from "next-auth";
import { loginSchema, registerSchema } from "@/lib/schemas";

export const loginAction = async (user: z.infer<typeof loginSchema>) => {
  const validatedFields = loginSchema.safeParse(user);

  if (!validatedFields.success) {
    return {
      status: 400,
      message: "Validation failed",
    };
  }

  const { email, password } = validatedFields.data;

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
            message: "Something went wrong",
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

  //TODO : VERIFY EMAIL

  await delay(400);
  return {
    status: 200,
    message: "Register successful",
  };
};
