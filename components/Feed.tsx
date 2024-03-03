"use client";

import qs from "query-string";

import { ChangeEvent, useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { fetchAllPrompts } from "../utils/apiPrompts";

import { PromptCardList } from "./PromptCardList";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebounce } from "@/hooks/use-debound";
import { ConvexAiChat } from "@/app/(chatbox)";
import { Button } from "./ui/button";
import { Bot } from "lucide-react";

const Feed = () => {
  const queryClient = useQueryClient();

  const router = useRouter();
  const [searchText, setSearchText] = useState<string>("");
  let debounceValue = useDebounce(searchText);

  // the query string can not handle the # so we have to remove it before searching
  debounceValue.startsWith("#")
    ? (debounceValue = debounceValue.slice(1))
    : debounceValue;

  const searchParams = useSearchParams();
  const searchValue = searchParams.get("search");

  // Fetch data from the server
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["prompts", searchValue],
    queryFn: async () => await fetchAllPrompts(searchValue),
    staleTime: 0,
    refetchInterval: 4000,
    refetchOnMount: true,
  });

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  useEffect(() => {
    const url = qs.stringifyUrl(
      { url: "/", query: { search: debounceValue } },
      {
        skipEmptyString: true,
        skipNull: true,
      },
    );

    router.push(url);

    // Clear the search cache after 30s except all prompts fetched
    const timeout = setTimeout(() => {
      if (searchValue)
        queryClient.removeQueries({ queryKey: ["prompts", searchValue] });
    }, 30000);

    return () => clearTimeout(timeout);
  }, [router, debounceValue, queryClient, searchValue]);

  const handleTagClick = (tagName: string) => {
    if (tagName.startsWith("#")) setSearchText(tagName.trim());
    else {
      tagName = "#" + tagName;
      setSearchText(tagName.trim());
    }
  };

  return (
    <section className="feed">
      {/* AI chatbox */}
      <ConvexAiChat
        convexUrl={process.env.NEXT_PUBLIC_CONVEX_URL!}
        name="PromptWolrd AI Bot"
        infoMessage="AI can make mistakes. Verify your answers before using!"
        welcomeMessage="Hey there, what can I help you with?"
        renderTrigger={(onClick) => (
          <Button
            onClick={onClick}
            className="fixed bottom-5 right-3 z-[50] p-5 "
          >
            <Bot className="h-6 w-6 sm:mr-2" />
            <span className="hidden font-semibold sm:block">AI assistant</span>
          </Button>
        )}
      />

      <form className="flex-center relative flex w-full">
        <input
          type="text"
          className="search_input dark:text-black"
          placeholder="Search for a tag or some keywords..."
          value={searchText}
          onChange={handleSearchChange}
          required
        />
      </form>

      <PromptCardList
        data={data}
        isLoading={isPending}
        handleTagClick={handleTagClick}
      />

      {error && toast.error(error.message)}
    </section>
  );
};

export default Feed;
