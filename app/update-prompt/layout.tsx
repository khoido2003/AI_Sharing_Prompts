import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit your post",
  description: "Let your creative idea gone wild!!!",
};

const layout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default layout;
