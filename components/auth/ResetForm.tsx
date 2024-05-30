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
import { resetSchema } from "@/lib/schemas";
import { FormError } from "@/components/auth/FormError";
import { FormSuccess } from "@/components/auth/FormSuccess";
import { useSendResetPasswordMail } from "@/lib/query/mutations";
import { useState } from "react";

export const ResetForm = () => {
  const { mutateAsync: sendResetPasswordMail, isPending } =
    useSendResetPasswordMail();
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const form = useForm<z.infer<typeof resetSchema>>({
    resolver: zodResolver(resetSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof resetSchema>) {
    const response = await sendResetPasswordMail(values);
    if (response) {
      if (response?.status === 400) {
        setErrorMessage(response.message);
      } else if (response.status === 200) {
        setSuccessMessage(response?.message);
      }
    }
  }

  return (
    <CardWrapper
      headerLabel="Reset Password"
      backButtonLabel="Back to login"
      backButtonHref="/login"
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

          {!successMessage && <FormError label={errorMessage} />}

          <FormSuccess label={successMessage} />

          <Button
            disabled={isPending}
            type="submit"
            className="w-full bg-neutral-700 translate-y-1"
          >
            {isPending ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              "Submit"
            )}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
