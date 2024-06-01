import "@styles/globals.css";

export const metadata = {
  title: "Spark",
  description: "Discover and share your prompts",
};

interface AuthLayoutType {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutType) => {
  return <div className={` z-10`}>{children}</div>;
};

export default AuthLayout;
