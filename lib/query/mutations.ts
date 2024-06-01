"use client";

import { useMutation } from "@tanstack/react-query";

import { loginAction, registerAction, sendResetPasswordMail } from "@/actions";
import { UserLogin, UserRegister, UserResetPassword } from "@/lib/types";
import { getUserByEmail, getUserById } from "@/actions/data/user";

// * ################ USER ######################

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

export const useGetUserByEmail = () => {
  return useMutation({
    mutationFn: (email: string) => getUserByEmail(email),
  });
};

export const useGetUserById = () => {
  return useMutation({
    mutationFn: (id: string) => getUserById(id),
  });
};

export const useSendResetPasswordMail = () => {
  return useMutation({
    mutationFn: (user: UserResetPassword) => sendResetPasswordMail(user),
  });
};
