"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { fetchCurrentUserPosts } from "../utils/apiPrompts";
import ProfileComponent from "../ui/Profile";
import { PromptData } from "../utils/typescript";
import { Toaster, toast } from "sonner";
import { useEffect } from "react";
import { skeletonItems } from "../utils/helpers";
import SkeletonLoading from "../ui/SkeletonLoading";

const Profile = () => {
  const { data: session, status: sessionStatus } = useSession();
  console.log(session);

  const router = useRouter();

  const queryClient = useQueryClient();
  const { isPending, data, error, isError } = useQuery({
    queryKey: ["user-posts"],
    queryFn: async () => {
      if (!session) {
        return null; // or handle the case when session is undefined
      }

      return await fetchCurrentUserPosts(session);
    },
    refetchInterval: 1000,
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

  // If user is not logged in then not allowed to create a new post
  useEffect(() => {
    if (sessionStatus === "loading") {
      // Loading state, you can render a loading spinner or other UI indicator
      return;
    }

    if (!session) {
      router.push("/");
    }
  }, [router, session, sessionStatus]);

  return (
    <>
      {!data ? (
        <div className="prompt_layout">
          {skeletonItems.map((index) => (
            <div key={index}>
              <SkeletonLoading />
            </div>
          ))}
        </div>
      ) : (
        <>
          <Toaster position="top-center" />
          <ProfileComponent
            name={`Hello, ${session?.user?.name}`}
            desc="Welcome back to your personalized page."
            data={data as [PromptData] | void | undefined}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            isLoading={isPending}
            error={error}
          />
        </>
      )}
    </>
  );
};

export default Profile;
