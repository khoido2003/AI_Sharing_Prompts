import { Session } from "next-auth";
import { Inputs } from "./typescript";

/**
 * Fetch all prompts from the database to display in the Feed
 *
 */

export const fetchAllPrompts = async () => {
  const response = await fetch("/api/prompt");
  const data = await response.json();

  return data;
};

//////////////////////////////////

/**
 * API to fetch the current user's post in their profile page

 */

export const fetchCurrentUserPosts = async (session: Session | null) => {
  const response = await fetch(`/api/users/${session?.user?.id}/posts`);
  const data = await response.json();

  return data;
};

//////////////////////////////////

/**
 * API to create new Post from login user
 */
export const createNewPost = async ({
  formData,
  session,
}: {
  formData: Inputs;
  session: Session | null | undefined;
}) => {
  const res = await fetch("/api/prompt/new", {
    method: "POST",
    body: JSON.stringify({
      prompt: formData.prompt,
      userId: session?.user?.id,
      tag: formData.tag,
      dateAdded: new Date(Date.now()).toISOString(),
    }),
  });

  return res;
};

///////////////////////////

export const updateCurrentPost = async ({
  promptId,
  formData,
}: {
  promptId: string | null;
  formData: Inputs;
}) => {
  const res = await fetch(`/api/prompt/${promptId}`, {
    method: "PATCH",
    body: JSON.stringify({
      prompt: formData.prompt,
      tag: formData.tag,
      dateAdded: new Date(Date.now()).toISOString(),
    }),
  });
};

//////////////////////////////

export const fetchCurrentPost = async (promptId: string | null) => {
  const res = await fetch(`/api/prompt/${promptId}`);
  const data = await res.json();

  return data;
};
