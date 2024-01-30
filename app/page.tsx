import { Metadata } from "next";
import Feed from "./ui/Feed";

export const metadata: Metadata = {
  title: "PrompWorld - Discover & Share",
  description: "Let your creative idea gone wild!!!",
};

export default function Home() {
  return (
    <section className="flex-center w-full flex-col">
      <h1 className="head_text text-center">
        Discover & Share
        <br />
        <span className="orange_gradient text-center">AI-Powered Prompts</span>
      </h1>

      <p className="desc text-center">
        PromptWorld is an open-source AI prompting tool for modern wold to
        discover, create and share creative prompts.
      </p>

      <Feed />
    </section>
  );
}
