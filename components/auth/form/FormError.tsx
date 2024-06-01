import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

interface FormErrorProps {
  label?: string;
}

export const FormError = ({ label }: FormErrorProps) => {
  if (!label) return null;
  return (
    <>
      <div className="flex py-2 rounded-md justify-start items-center w-full bg-red-500/10 text-red-700 text-sm gap-x-2 px-3">
        <ExclamationTriangleIcon />
        {label}
      </div>
    </>
  );
};
