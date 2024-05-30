import { CardWrapper } from "@/components/auth/CardWrapper";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

const ErrorCard = () => {
  return (
    <>
      <CardWrapper
        headerLabel="Oops something went wrong"
        backButtonLabel="Please try again"
        backButtonHref="/login"
      >
        <div className="flex flex-col items-center justify-center">
          <ExclamationTriangleIcon className="w-16 h-16 text-red-500" />
          <p className="mt-4 text-center text-sm text-gray-500">
            Something went wrong. Please try again.
          </p>
        </div>
      </CardWrapper>
    </>
  );
};

export default ErrorCard;
