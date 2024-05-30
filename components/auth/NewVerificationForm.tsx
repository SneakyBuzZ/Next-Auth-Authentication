"use client";

import { useSearchParams } from "next/navigation";
import { CardWrapper } from "@/components/auth/CardWrapper";
import { useCallback, useEffect, useState } from "react";
import { verifyNewToken } from "@/actions";
import { FormError } from "@/components/auth/FormError";
import { FormSuccess } from "./FormSuccess";

const NewVerificationForm = () => {
  const params = useSearchParams();
  const token = params.get("token");
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const [successMessage, setSuccessMessage] = useState<string | undefined>();

  const onSubmit = useCallback(() => {
    if (!token) {
      setErrorMessage("Token is missing");
      return;
    }

    verifyNewToken(token).then((response) => {
      if (response.status === 400) {
        setErrorMessage(response.message);
      } else {
        setSuccessMessage(response.message);
      }
    });
  }, [token]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <>
      <CardWrapper
        headerLabel="Confirming your verification"
        backButtonHref="/login"
        backButtonLabel="Back to login"
      >
        <div className="flex w-full justify-center items-center">
          {!successMessage ||
            (!errorMessage && (
              <span className="loading loading-dots loading-md"></span>
            ))}
          <FormError label={errorMessage} />
          <FormSuccess label={successMessage} />
        </div>
      </CardWrapper>
    </>
  );
};

export default NewVerificationForm;
