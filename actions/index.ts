"use server";

import { delay } from "@/lib/utils";
import { UserLogin } from "@/types";
import { UserRegister } from "@/types";

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

  await delay(400);

  return {
    status: 200,
    message: "Register successful",
  };
};
