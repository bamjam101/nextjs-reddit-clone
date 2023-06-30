import { ReactNode } from "react";
import Navbar from "@/components/Header/Navbar";

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default RootLayout;
