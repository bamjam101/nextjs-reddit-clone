import { ReactNode } from "react";
import Navbar from "../Header/Navbar/Navbar";

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default RootLayout;
