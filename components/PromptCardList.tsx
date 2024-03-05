import { PromptCardListProps } from "../utils/typescript";
import PromptCard from "./PromptCard";

interface PromptProps {
  _id: string;
  creator: {
    _id: string;
    username: string;
    email: string;
    image: string;
  };
  prompt: string;
  tag: string;
}

export const PromptCardList = ({
  data,
  handleTagClick,
  isFetchingNextPage,
  innerRef,
}: PromptCardListProps) => {
  return (
    <div className="prompt_layout mt-16">
      {data?.pages.map((el) =>
        (el.prompts as PromptProps[])?.map((post, index) => {
          // Only the last element will have ref to check the intersection observer hook
          if (el.prompts.length === index + 1) {
            return (
              <PromptCard
                key={post._id}
                post={post}
                handleTagClick={handleTagClick}
                innerRef={innerRef}
              />
            );
          }
          return (
            <PromptCard
              key={post._id}
              post={post}
              handleTagClick={handleTagClick}
              innerRef={innerRef}
            />
          );
        }),
      )}
    </div>
  );
};
