import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Friends",
  description: "",
};

const layout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default layout;
