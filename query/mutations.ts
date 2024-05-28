"use client";

import { useMutation } from "@tanstack/react-query";

import { loginAction, registerAction } from "@/actions";
import { UserLogin, UserRegister } from "@/types";

export const useLoginQuery = () => {
  return useMutation({
    mutationFn: (user: UserLogin) => loginAction(user),
  });
};

export const useRegisterQuery = () => {
  return useMutation({
    mutationFn: (user: UserRegister) => registerAction(user),
  });
};
