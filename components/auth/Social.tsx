import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";

export const Social = () => {
  return (
    <>
      <div className="flex items-center w-full gap-x-2">
        <Button variant="outline" className="w-full">
          <FcGoogle size={20} />
        </Button>
        <Button variant="outline" className="w-full">
          <FaGithub size={20} />
        </Button>
      </div>
    </>
  );
};
