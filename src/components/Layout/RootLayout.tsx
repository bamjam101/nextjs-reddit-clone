import { ReactNode } from "react";
import Navbar from "../header/page-header/Navbar";

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default RootLayout;
