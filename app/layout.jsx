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
      <body className={inter.className + " row overflow-x-hidden max-w-screen"}>
        <div className='full absolute bg-contain bg-repeat z-0 opacity-10'
          style={{ backgroundImage: "url(/images/icons/game/quiz_bg.jpg)",
            backgroundSize: "200px 200px"
           }}></div>
        {/* <SideBarNav /> */}
        <Suspense fallback={<Loading />}>
        <div className="col items-center z-10">
        {/* <Header /> */}
          {children}
        </div>
        </Suspense>
        {/* <SideBarInfo /> */}
  
      </body>
    </html>
  );
}
