"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { useEffect, useState } from "react";

import FormComponent from "../ui/Form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Inputs } from "../utils/typescript";

const CreatePrompt = () => {
  const [redirectTimeoutId, setRedirectTimeoutId] = useState<any>(null);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<Inputs>();

  const { data: session } = useSession();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (formData: Inputs) => {
      return fetch("/api/prompt/new", {
        method: "POST",
        body: JSON.stringify({
          prompt: formData.prompt,
          userId: session?.user?.id,
          tag: formData.tag,
        }),
      });
    },

    onSuccess: () => {
      // This block will be executed when the mutation is successful
      toast.success("Post created successfully!");

      // Wait for 3 seconds (adjust the delay as needed)
      const redirectTimeout = setTimeout(() => {
        router.push("/"); // Redirect user after the delay
      }, 1500);

      queryClient.invalidateQueries({ queryKey: ["prompts"] });

      // Save the timeout ID to clear it later
      setRedirectTimeoutId(redirectTimeout);
    },
  });

  const onSubmit: SubmitHandler<Inputs> = (data: Inputs) => {
    // If user is not logged in then not allowed to create new post
    if (!session) {
      toast.error("Please login to create new post!");
      return;
    }

    mutation.mutate(data);
  };

  // Clear the timeout when the component unmounts
  useEffect(() => {
    return () => {
      if (redirectTimeoutId) {
        clearTimeout(redirectTimeoutId);
      }
    };
  }, [redirectTimeoutId]);

  return (
    <FormComponent
      isLoading={mutation.isPending}
      type="Create"
      register={register}
      handleSubmit={handleSubmit}
      onSubmitForm={onSubmit}
      watch={watch}
      errors={errors}
      control={control}
    />
  );
};

export default CreatePrompt;
