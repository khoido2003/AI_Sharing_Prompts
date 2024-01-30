// @ts-nocheck
"use client";

import Image from "next/image";
import { inter, roboto } from "../utils/fonts";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { formatTime } from "../utils/helpers";
import { DefaultSessionWithId, PromptCardProps } from "../utils/typescript";

function PromptCard({
  post,
  handleTagClick,
  handleEdit,
  handleDelete,
}: PromptCardProps) {
  const [copied, setCopied] = useState("");

  // Find the current login user
  const { data: session } = useSession();

  // Check the pathname in the URL
  const pathName = usePathname();

  // Redirect user
  const router = useRouter();

  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);

    setTimeout(() => {
      setCopied("");
    }, 3000);
  };

  const handleProfileClick = () => {
    // See yout own profile
    if (post.creator._id === (session as DefaultSessionWithId)?.user?.id)
      return router.push("/profile");

    // See other user's profile
    router.push(`/profile/${post.creator._id}?name=${post.creator.username}`);
  };

  return (
    <div className="prompt_card">
      <div className="flex items-start justify-between gap-5">
        <div
          className="flex flex-1 cursor-pointer items-center justify-start gap-3"
          onClick={handleProfileClick}
        >
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

      <p
        className={`${roboto.className} my-1  text-xs text-gray-700 dark:text-gray-400`}
      >
        {formatTime(post.dateAdded)}
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

      {(session as DefaultSessionWithId)?.user?.id === post.creator._id &&
        pathName === "/profile" && (
          <div className="flex-end mt-5 gap-4 border-t  border-gray-600 pt-3 dark:border-gray-100">
            <p
              className="cursor-pointer rounded-md bg-black px-3 py-1 text-sm text-slate-200 hover:bg-primary-orange dark:bg-slate-200 dark:text-slate-800 dark:hover:bg-primary-orange dark:hover:text-slate-100"
              onClick={handleEdit}
            >
              Edit
            </p>
            <p
              className="cursor-pointer rounded-md bg-slate-400 px-3 py-1 text-sm text-slate-100 hover:bg-red-600 dark:bg-slate-800 dark:hover:bg-red-600"
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
