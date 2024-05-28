"use server";

import { getUserByEmail } from "@/data/user";
import { db } from "@/lib/db";
import { delay } from "@/lib/utils";
import { UserLogin } from "@/types";
import { UserRegister } from "@/types";
import bcrypt from "bcrypt";

export const loginAction = async (user: UserLogin) => {
  console.log("USER: ", user);

  if ([user.email, user.password].some((value) => value?.trim() === "")) {
    throw new Error("Validation failed");
  }

  await delay(400);

  return {
    status: 200,
    message: "Login successful",
  };
};

export const registerAction = async (user: UserRegister) => {
  console.log("USER: ", user);

  if (
    [user.email, user.password, user.name].some((value) => value?.trim() === "")
  ) {
    throw new Error("Validation failed");
  }

  const { email, name, password } = user;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    throw new Error("User already exists");
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
