"use client";

import { getAllFriendsByType } from "@/utils/apiFriendRequest";
import { DefaultSessionWithId } from "@/utils/typescript";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { inter, roboto } from "@/utils/fonts";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const RequestList = () => {
  const { data: session } = useSession();

  const { data: friends, isLoading } = useQuery({
    queryKey: ["friends", "request"],
    queryFn: async () => {
      if (!session) return null;

      return await getAllFriendsByType(
        (session as DefaultSessionWithId).user?.id as string,
        "requested",
      );
    },
    refetchInterval: 5000,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!friends) {
    return <div>You don&apos;t request any friend</div>;
  }

  return (
    <>
      {friends.map((friend) => {
        return (
          <div key={friend._id} className="prompt_card flex gap-4">
            <div className="flex items-center justify-center">
              <Image
                src={friend.image}
                alt="Friend avatar"
                width={80}
                height={80}
                className="h-[60px] w-[60px] rounded-full object-contain"
              />
            </div>
            <div className="flex flex-col">
              <h3
                className={`${roboto.className} font-semibold text-gray-900 dark:text-gray-100/80`}
              >
                {friend.username}
              </h3>
              <p
                className={`${inter.className} text-sm text-gray-500 dark:text-gray-400`}
              >
                {friend.email}
              </p>

              <Button asChild size="sm" className="mt-2 self-start ">
                <Link
                  href={`/profile/${friend._id}?name=${friend.username}`}
                  className="flex items-center justify-center"
                >
                  View Profile
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default RequestList;
