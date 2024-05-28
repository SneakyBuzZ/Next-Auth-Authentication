import { CardWrapper } from "@/components/auth/CardWrapper";
import RegisterForm from "@/components/auth/RegisterForm";

const page = () => {
  return (
    <>
      <CardWrapper
        backButtonHref="/login"
        backButtonLabel="Already have an account"
        headerLabel="Welcome to Auth js"
        showSocials
      >
        <RegisterForm />
      </CardWrapper>
    </>
  );
};

export default page;
