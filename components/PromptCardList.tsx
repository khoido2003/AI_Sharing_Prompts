import { skeletonItems } from "../utils/helpers";
import { PromptCardListProps } from "../utils/typescript";

import PromptCard from "./PromptCard";
import SkeletonLoading from "./SkeletonLoading";

export const PromptCardList = ({
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
        <>
          {skeletonItems.map((index) => (
            <div key={index}>
              <SkeletonLoading />
            </div>
          ))}
          s
        </>
      )}
    </div>
  );
};
