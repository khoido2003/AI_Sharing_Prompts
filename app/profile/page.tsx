"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { fetchCurrentUserPosts } from "../utils/apiPrompts";
import ProfileComponent from "../ui/Profile";
import { PromptData } from "../utils/typescript";
import { Toaster, toast } from "sonner";

const Profile = () => {
  const { data: session } = useSession();

  const router = useRouter();

  const queryClient = useQueryClient();
  const { isPending, data, error, isError } = useQuery({
    queryKey: ["user-posts"],
    queryFn: async () => {
      return await fetchCurrentUserPosts(session);
    },

    staleTime: 0,
  });

  const { mutate, isSuccess } = useMutation({
    mutationFn: async (post: { _id: string }) => {
      const res = await fetch(`/api/prompt/${post._id.toString()}`, {
        method: "DELETE",
      });
    },
    onError: () => {
      toast.error("Failed to delete prompt");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-posts"] });
    },
  });

  const handleEdit = (post: { _id: string }) => {
    router.push(`/update-prompt?id=${post._id}`);
  };
  const handleDelete = async (post: { _id: string }) => {
    const hasConfirmed = confirm("Are you sure you want to delete this post?");
    console.log(post);

    if (hasConfirmed) {
      mutate(post);
    }
  };

  if (!session) {
    router.push("/");
    return;
  }

  return (
    <>
      <Toaster position="top-center" />
      <ProfileComponent
        name={session?.user?.name}
        desc="Welcome back to your personalized page."
        data={data as [PromptData] | void | undefined}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        isLoading={isPending}
        error={error}
      />
    </>
  );
};

export default Profile;
