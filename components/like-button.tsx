"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { Heart } from "lucide-react";
import { AuthLoading } from "./loading/auth-loading";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { DefaultSessionWithId } from "@/utils/typescript";

interface LikeButtonProps {
  promptId: string;
}

const LikeButton = ({ promptId }: LikeButtonProps) => {
  const { data: likes, isLoading } = useQuery({
    queryKey: ["likes", promptId],
    queryFn: async () => {
      const res = await fetch(`/api/like?promptId=${promptId}`);
      const data = await res.json();

      // TODO: code ban
      return data.map((like: any) => like.userId);
    },
    refetchInterval: 5 * 1000,
  });

  const [liked, setLiked] = useState<boolean>(false);
  const [totalLike, setTotalLike] = useState<number>(likes?.length || 0);

  const { data: session } = useSession();

  useEffect(() => {
    if (!likes) return;

    const userliked = likes.some(
      (like: any) => like._id === (session as DefaultSessionWithId).user?.id,
    );
    setLiked(userliked);
    setTotalLike(likes?.length || 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [likes]);

  const handleClick = async () => {
    if (!session) return;

    if (liked) {
      await fetch(
        `/api/like?promptId=${promptId}&userId=${(session as DefaultSessionWithId).user?.id}`,
        {
          method: "DELETE",
        },
      );
      setLiked(false);
      setTotalLike((prev) => prev - 1);
    }

    if (!liked) {
      await fetch("/api/like/new", {
        method: "POST",
        body: JSON.stringify({
          promptId,
          userId: (session as DefaultSessionWithId).user?.id,
        }),
      });
      setLiked(true);
      setTotalLike((prev) => prev + 1);
    }
  };

  if (isLoading) return <AuthLoading />;

  return (
    <div
      className="flex cursor-pointer items-center justify-center gap-2 rounded-sm bg-gray-200 px-2 py-1 transition duration-150 hover:bg-gray-300 dark:bg-gray-500 hover:dark:bg-gray-400"
      onClick={handleClick}
      aria-disabled={isLoading}
    >
      <Heart className={cn(liked && "fill-red-500 stroke-red-500")} />
      <span className="text-sm">{totalLike}</span>
    </div>
  );
};

export default LikeButton;
