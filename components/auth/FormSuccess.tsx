import { CheckCircledIcon } from "@radix-ui/react-icons";

interface FormSuccessrProps {
  label?: string;
}

export const FormSuccess = ({ label }: FormSuccessrProps) => {
  if (!label) return null;
  return (
    <>
      <div className="flex py-2 rounded-md justify-start items-center w-full bg-emerald-500/20 text-emerald-700 text-sm gap-x-2 px-3">
        <CheckCircledIcon />
        {label}
      </div>
    </>
  );
};
