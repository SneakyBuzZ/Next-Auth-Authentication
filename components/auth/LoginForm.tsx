"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { CardWrapper } from "@/components/auth/CardWrapper";
import { loginSchema } from "@/schemas";
import { FormError } from "@/components/auth/FormError";
import { FormSuccess } from "@/components/auth/FormSuccess";
import { useLoginQuery } from "@/query/mutations";
import { useState } from "react";

export const LoginForm = () => {
  const { mutateAsync: loginAction, isPending, error } = useLoginQuery();
  const [successMessage, setSuccessMessage] = useState("");
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    const response = await loginAction(values);
    setSuccessMessage(response.message);
  }
  return (
    <CardWrapper
      headerLabel="Welcome Back"
      backButtonLabel="Don't have an account?"
      backButtonHref="/register"
      showSocials
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>email</FormLabel>
                <FormControl>
                  <Input disabled={isPending} {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input disabled={isPending} type="password" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormError label={error ? "Failed to register" : ""} />
          <FormSuccess label={successMessage} />
          <Button
            disabled={isPending}
            type="submit"
            className="w-full bg-neutral-700 translate-y-1"
          >
            {isPending ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              "Login"
            )}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
