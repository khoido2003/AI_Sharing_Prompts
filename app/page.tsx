"use client";
import Feed from "./ui/Feed";

import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <section className="flex-center w-full flex-col">
        <h1 className="head_text text-center">
          Discover & Share
          <br />
          <span className="orange_gradient text-center">
            AI-Powered Prompts
          </span>
        </h1>

        <p className="desc text-center">
          Promptopia is an open-source AI prompting tool for modern wold to
          discover, create and share creative prompts.
        </p>
        <Feed />
      </section>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
