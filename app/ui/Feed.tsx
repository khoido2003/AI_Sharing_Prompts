"use client";

import { ChangeEvent, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { fetchAllPrompts } from "../utils/apiPrompts";
import { PromptData } from "../utils/typescript";
import { PromptCardList } from "./PromptCardList";
import { toast } from "sonner";

const Feed = () => {
  const [searchText, setSearchText] = useState<string>("");

  const [searchTimeout, setSearchTimeout] = useState<any>(null);
  const [searchedResults, setSearchedResults] = useState<any>([]);

  // Fetch data from the server
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["prompts"],
    queryFn: fetchAllPrompts,
    staleTime: 0,
    refetchInterval: 5000,
  });

  // Handle search results
  const filteredPosts = (searchText: string) => {
    // Check for case sensitive search text
    const regrex = new RegExp(searchText, "i");
    return (data as [PromptData])?.filter(
      (post) =>
        regrex.test(post.prompt) ||
        regrex.test(post.creator.username) ||
        regrex.test(post.tag),
    );
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    // debounce method
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filteredPosts(e.target.value);
        setSearchedResults(searchResult);
      }, 500),
    );
  };

  const handleTagClick = (tagName: string) => {
    setSearchText(tagName);

    const searchResult = filteredPosts(tagName);
    setSearchedResults(searchResult);
  };

  return (
    <section className="feed">
      <form className="flex-center relative flex w-full">
        <input
          type="text"
          className="search_input dark:text-black"
          placeholder="Search for a tag or an username..."
          value={searchText}
          onChange={handleSearchChange}
          required
        />
      </form>

      {searchText ? (
        <PromptCardList
          data={searchedResults}
          isLoading={isPending}
          handleTagClick={handleTagClick}
        />
      ) : (
        <PromptCardList
          data={data}
          isLoading={isPending}
          handleTagClick={handleTagClick}
        />
      )}

      {error && toast.error(error.message)}
    </section>
  );
};

export default Feed;
