import { toast } from "sonner";
import { skeletonItems } from "../utils/helpers";
import { ProfileComponentProps } from "../utils/typescript";
import PromptCard from "./PromptCard";
import SkeletonLoading from "./SkeletonLoading";

const ProfileComponent = ({
  name,
  desc,
  data,
  handleEdit,
  handleDelete,
  isLoading,
  error,
}: ProfileComponentProps) => {
  return (
    <section className="w-full">
      <h1 className="head_text">
        {" "}
        <span className="blue_gradient">{name}</span>
      </h1>

      <p className="desc">{desc}</p>

      <div className="prompt_layout mt-10">
        {data && !isLoading ? (
          data.map((post) => (
            <PromptCard
              key={post._id}
              post={post}
              handleEdit={() => handleEdit && handleEdit(post)}
              handleDelete={() => handleDelete && handleDelete(post)}
            />
          ))
        ) : (
          <>
            {skeletonItems.map((index) => (
              <div key={index}>
                <SkeletonLoading />
              </div>
            ))}
          </>
        )}
      </div>

      {error && toast.message(error.message)}
    </section>
  );
};

export default ProfileComponent;
