import { Session } from "next-auth";

export const fetchAllPrompts = async () => {
  const response = await fetch("/api/prompt");
  const data = await response.json();

  return data;
};

export const fetchCurrentUserPosts = async (session: Session | null) => {
  const response = await fetch(`/api/users/${session?.user?.id}/posts`);
  const data = await response.json();

  return data;
};
