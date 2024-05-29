import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";

const page = async () => {
  const session = await auth();
  return (
    <div>
      {JSON.stringify(session)}
      <form
        className="flex justify-center"
        action={async () => {
          "use server";

          await signOut();
        }}
      >
        <Button type="submit" className="text-white">
          Logout
        </Button>
      </form>
    </div>
  );
};

export default page;
