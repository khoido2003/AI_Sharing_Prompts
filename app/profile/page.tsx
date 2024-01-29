"use client";

import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { fetchCurrentUserPosts } from "../utils/apiPrompts";
import ProfileComponent from "../ui/Profile";
import { PromptData } from "../utils/typescript";

const Profile = () => {
  const { data: session } = useSession();

  const router = useRouter();

  const handleEdit = () => {};
  const handleDelete = () => {};

  const { isPending, data, error, isError } = useQuery({
    queryKey: ["user-posts"],
    queryFn: async () => {
      return await fetchCurrentUserPosts(session);
    },

    staleTime: 0,
  });

  if (!session) {
    router.push("/");
    return;
  }

  return (
    <ProfileComponent
      name={session?.user?.name}
      desc="Welcome back to your personalized page."
      data={data as [PromptData] | void | undefined}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
      isLoading={isPending}
      error={error}
    />
  );
};

export default Profile;
