import { cn } from "@/lib/utils";
import { Orbitron } from "next/font/google";

const orbitron = Orbitron({ subsets: ["latin"] });

interface HeaderProps {
  label: string;
}

export const Header = ({ label }: HeaderProps) => {
  return (
    <div className="w-full flex flex-col justify-center items-center space-y-2">
      <h1 className={cn("text-2xl font-semibold", orbitron.className)}>Auth</h1>
      <p>{label}</p>
    </div>
  );
};
