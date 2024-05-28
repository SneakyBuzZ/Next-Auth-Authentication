import { Orbitron } from "next/font/google";
import { Button } from "@/components/ui/button";
import LoginButton from "@/components/auth/LoginButton";

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export default function Auth() {
  return (
    <main className="flex h-full flex-col items-center justify-center ">
      <div className="space-y-6 text-center">
        <h1 className={`${orbitron.className} text-3xl `}>NEXT AUTH</h1>
        <p>A pratice project for learning Auth js</p>
        <LoginButton mode="redirect">
          <Button className="my-5" variant={"secondary"}>
            Sign Up
          </Button>
        </LoginButton>
      </div>
    </main>
  );
}
