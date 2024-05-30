"use client";

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { useSearchParams } from "next/navigation";
import { CardWrapper } from "@/components/auth/CardWrapper";
import { resetPasswordSchema } from "@/lib/schemas";
import { useState } from "react";
import { resetPasswordAction } from "@/actions";
import { FormSuccess } from "@/components/auth/FormSuccess";
import { FormError } from "@/components/auth/FormError";
import { useRouter } from "next/navigation";

const ResetPasswordForm = () => {
  const router = useRouter();
  const params = useSearchParams();
  const token = params.get("token");

  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const [successMessage, setSuccessMessage] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmedPassword: "",
    },
  });

  function onSubmit(values: z.infer<typeof resetPasswordSchema>) {
    setIsLoading(true);
    if (!token) {
      setErrorMessage("Token is missing");
      return;
    }

    if (values.password !== values.confirmedPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    resetPasswordAction(token, values.confirmedPassword).then((response) => {
      if (response.status === 400) {
        setErrorMessage(response.message);
      } else if (response.status === 200) {
        setSuccessMessage(response.message);
        router.push("/login");
      }

      setIsLoading(false);
      return;
    });

    setIsLoading(false);
  }

  return (
    <>
      <CardWrapper
        headerLabel="Confirming your verification"
        backButtonHref="/login"
        backButtonLabel="Back to login"
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmedPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            {!successMessage && <FormError label={errorMessage} />}
            <FormSuccess label={successMessage} />
            <Button className="w-full" type="submit">
              Reset
              {isLoading && (
                <span className="loading loading-spinner loading-md"></span>
              )}
            </Button>
          </form>
        </Form>
      </CardWrapper>
    </>
  );
};

export default ResetPasswordForm;
