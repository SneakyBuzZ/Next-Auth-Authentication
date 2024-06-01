import Provider from "@/components/shared/Provider";
import "@/styles/globals.css";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata = {
  title: "Spark",
  description: "Discover and share your prompts",
};

interface AppLayoutType {
  children: React.ReactNode;
}

const AppLayout = ({ children }: AppLayoutType) => {
  return (
    <html lang="en">
      <body>
        <Provider>
          <div className={`${inter.className} main bg-white`}>
            <main className="spark-app w-full">{children}</main>
          </div>
        </Provider>
      </body>
    </html>
  );
};

export default AppLayout;
