"use client";

import { useRouter } from "next/navigation";
import FormComponent from "../ui/Form";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Inputs } from "../utils/typescript";
import { useSession } from "next-auth/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { fetchCurrentPost, updateCurrentPost } from "../utils/apiPrompts";
import { toast } from "sonner";

const EditForm = () => {
  // Find the Id of the current post/prompt
  const searchParams = useSearchParams();
  const promptId = searchParams.get("id");

  // Use later to clear the setTimeout function
  const [redirectTimeoutId, setRedirectTimeoutId] = useState<any>(null);

  // Redirect user back to Feed
  const router = useRouter();

  // Handle Form submission
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<Inputs>();

  // Access the current user information through session
  const { data: session, status: sessionStatus } = useSession();

  // Reset the date when doing mutation with React query later
  const queryClient = useQueryClient();

  // Fetch all the data from the previous post
  const { data, isLoading } = useQuery({
    queryKey: ["current-post"],
    queryFn: async () => {
      return await fetchCurrentPost(promptId);
    },
    staleTime: 0,
    refetchInterval: 10000,
  });

  const mutation = useMutation({
    mutationFn: async ({
      promptId,
      formData,
    }: {
      promptId: string | null;
      formData: Inputs;
    }) => {
      return await updateCurrentPost({ promptId, formData });
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["current-post"] });

      toast.success("Post updated successfully!");

      // Wait for 3 seconds (adjust the delay as needed)
      const redirectTimeout = setTimeout(() => {
        router.push("/"); // Redirect user after the delay
      }, 1500);

      setRedirectTimeoutId(redirectTimeout);
    },
  });

  // Clear the timeout when the component unmounts
  useEffect(() => {
    return () => {
      if (redirectTimeoutId) {
        clearTimeout(redirectTimeoutId);
      }
    };
  }, [redirectTimeoutId]);

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

  const onSubmit: SubmitHandler<Inputs> = (formData: Inputs) => {
    mutation.mutate({ promptId, formData });
  };

  return (
    <FormComponent
      isLoading={mutation.isPending}
      type="Edit"
      register={register}
      handleSubmit={handleSubmit}
      onSubmitForm={onSubmit}
      watch={watch}
      errors={errors}
      control={control}
      data={data}
      isFetchingCurrentPost={isLoading}
    />
  );
};

export default EditForm;
