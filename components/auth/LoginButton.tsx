"use client";
import React from "react";
import { useRouter } from "next/navigation";

type LoginButtonType = {
  children: React.ReactNode;
  mode: "modal" | "redirect";
  asChild?: boolean;
};

const LoginButton = ({ children, mode, asChild }: LoginButtonType) => {
  const router = useRouter();
  const handleClick = async () => {
    router.push("/login");
  };
  return (
    <span onClick={handleClick} className="cursor-pointer">
      {children}
    </span>
  );
};

export default LoginButton;
