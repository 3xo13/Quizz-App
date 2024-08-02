import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header/Header";
import SideBarNav from "@/components/sideBars/SideBarNav";
import SideBarInfo from "@/components/sideBars/SideBarInfo";
import { Suspense } from "react";
import Loading from "./Loading";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Quizz App",
  description: "",
};

export default function RootLayout({ children }) {
  
  return (
    <html lang="en">
      <body className={inter.className + " row"}>

        {/* <SideBarNav /> */}
        <Suspense fallback={<Loading />}>
        <div className="col items-center">
        <Header />
          {children}
        </div>
        </Suspense>
        {/* <SideBarInfo /> */}
  
      </body>
    </html>
  );
}
