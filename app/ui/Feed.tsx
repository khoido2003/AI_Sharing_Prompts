"use client";

import { useEffect, useState } from "react";
import PromptCard from "./PromptCard";

import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

interface PromptCardListProps {
  data:
    | [
        post: {
          _id: string;
          creator: {
            _id: string;
            username: string;
            email: string;
            image: string;
          };
          prompt: string;
          tag: string;
        },
      ]
    | undefined
    | void;
  handleTagClick?: (a: string) => void | undefined;
  isLoading: boolean;
}

const PromptCardList = ({
  data,
  handleTagClick,
  isLoading,
}: PromptCardListProps) => {
  return (
    <div className="prompt_layout mt-16">
      {!isLoading && data ? (
        data.map((post) => (
          <PromptCard
            key={post._id}
            post={post}
            handleTagClick={handleTagClick}
          />
        ))
      ) : (
        <div>Loading</div>
      )}
    </div>
  );
};

/////////////////////////////////////////////

const Feed = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [posts, setPosts] = useState<
    | [
        post: {
          _id: string;
          creator: {
            _id: string;
            username: string;
            email: string;
            image: string;
          };
          prompt: string;
          tag: string;
        },
      ]
    | undefined
    | void
  >();

  const [searchTimeout, setSearchTimeout] = useState<any>(null);
  const [searchedResults, setSearchedResults] = useState<any>([]);

  // Fetch data from the server
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["prompts"],
    queryFn: async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();
      setPosts(data);
      return data;
    },

    staleTime: 2 * 1000,
  });

  // Handle search results
  const filteredPosts = (searchText: string) => {
    // Check for case sensitive search text
    const regrex = new RegExp(searchText, "i");
    return posts?.filter(
      (post) =>
        regrex.test(post.prompt) ||
        regrex.test(post.creator.username) ||
        regrex.test(post.tag),
    );
  };

  const handleSearchChange = (e) => {
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
          data={posts}
          isLoading={isPending}
          handleTagClick={handleTagClick}
        />
      )}
    </section>
  );
};

export default Feed;
