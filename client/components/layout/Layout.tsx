import { ReactNode } from "react";
import Navbar from "../navbar/Navbar";

interface IProps {
  children: ReactNode;
}

export default function Layout({ children }: IProps) {
  return (
    <>
      <main className="bg-white dark:bg-darkBg min-h-screen">
        <div className="w-[95%] mx-auto max-w-[1300px]">
          <Navbar />
          {children}
        </div>
      </main>
    </>
  );
}
