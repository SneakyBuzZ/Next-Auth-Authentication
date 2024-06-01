import NavBar from "@/components/home/NavBar";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata = {
  title: "Spark",
  description: "Discover and share your prompts",
};

interface RootLayoutType {
  children: React.ReactNode;
}

const RootLayout = ({ children }: RootLayoutType) => {
  return (
    <div className={`${inter.className} flex flex-col items-center z-10`}>
      <div className="gradient" />
      <NavBar />
      {children}
    </div>
  );
};

export default RootLayout;
