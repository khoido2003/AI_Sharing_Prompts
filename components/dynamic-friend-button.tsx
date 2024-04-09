"use client";

import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { DefaultSessionWithId } from "@/utils/typescript";
import { fetchRelationship } from "@/utils/apiFriendRequest";
import { useQuery } from "@tanstack/react-query";
import AddFriendButton from "@/app/friend/_components/add-friend-button";
import DeleteFriendButton from "@/app/friend/_components/delete-friend-button";
import { AuthLoading } from "./loading/auth-loading";
import AcceptFriendButton from "@/app/friend/_components/accept-friend-button";

export const DynamicFriendButton = ({
  isSelf,
}: {
  isSelf: boolean | undefined;
}) => {
  const { data: session } = useSession();
  const pathname = usePathname();

  const userId = (session as DefaultSessionWithId)?.user?.id;
  const friendId = pathname.split("/")[2];

  const { data, isLoading } = useQuery({
    queryKey: ["friend-request", userId, friendId],
    queryFn: async () => {
      if (!userId || !friendId) {
        return null;
      }

      return await fetchRelationship(userId, friendId);
    },
    refetchInterval: 5000,
    staleTime: 0,
  });

  // can not add friend to self
  if (isSelf) return null;

  if (isLoading) return <AuthLoading />;

  if (!data) {
    return <AddFriendButton userId={userId} friendId={friendId} />;
  }

  if (data && data.status === "accepted") {
    return (
      <DeleteFriendButton userId={userId} friendId={friendId} type="delete" />
    );
  }

  if (data && data.status === "pending" && data.senderId === userId) {
    return (
      <DeleteFriendButton userId={userId} friendId={friendId} type="cancel" />
    );
  }

  if (data && data.status === "pending" && data.receiverId === userId) {
    return <AcceptFriendButton userId={userId} friendId={friendId} />;
  }
};
