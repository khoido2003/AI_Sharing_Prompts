// @ts-nocheck
"use client";

import Image from "next/image";
import { inter, roboto } from "../utils/fonts";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

interface PromptCardProps {
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
  };
  handleTagClick?: (a: string) => void;
  handleEdit?: () => void;
  handleDelete?: () => void;
}

function PromptCard({
  post,
  handleTagClick,
  handleEdit,
  handleDelete,
}: PromptCardProps) {
  const [copied, setCopied] = useState("");
  const { data: session } = useSession();

  const router = useRouter();
  const pathName = usePathname();

  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);

    setTimeout(() => {
      setCopied("");
    }, 3000);
  };

  return (
    <div className="prompt_card">
      <div className="flex items-start justify-between gap-5">
        <div className="flex flex-1 cursor-pointer items-center justify-start gap-3">
          <Image
            src={post.creator.image}
            alt="User Profile Picture"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />

          <div className="flex flex-col">
            <h3
              className={`${roboto.className} font-semibold text-gray-900 dark:text-gray-100/80`}
            >
              {post.creator.username}
            </h3>
            <p
              className={`${inter.className} text-sm text-gray-500 dark:text-gray-400`}
            >
              {post.creator.email}
            </p>
          </div>
        </div>

        <div
          className="copy_btn"
          onClick={() => {
            handleCopy();
          }}
        >
          <Image
            src={
              copied === post.prompt
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            width={12}
            height={12}
            alt="Copy icon"
          />
        </div>
      </div>

      <p
        className={`${roboto.className} my-4 text-sm text-gray-700 dark:text-gray-300`}
      >
        {post.prompt}
      </p>
      <p className={`blue_gradient cursor-pointer ${roboto.className} text-sm`}>
        {post.tag.split(/\s/g).map((item, i) => (
          <span
            key={i}
            onClick={() => {
              handleTagClick(item);
            }}
          >
            {item.charAt(0) === "#" ? item : `#${item}`}{" "}
          </span>
        ))}
      </p>

      {/* EDIT AND DELETE PROMPT CARD IF THE PROMPT BELONG TO THE CURRENT USER */}

      {session?.user.id === post.creator._id && pathName === "/profile" && (
        <div className="flex-center mt-5 gap-4 border-t border-gray-100 pt-3">
          <p
            className="green_gradient font-inter cursor-pointer text-sm"
            onClick={handleEdit}
          >
            Edit
          </p>
          <p
            className="orange_gradient font-inter cursor-pointer text-sm"
            onClick={handleDelete}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  );
}

export default PromptCard;
