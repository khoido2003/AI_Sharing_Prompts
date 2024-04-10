"use client";

import ProfileComponent from "@/components/Profile";
import { fecthOtherUserPosts } from "@/utils/apiPrompts";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

const UserProfile = ({ params }: { params: { id: string } }) => {
  const searchParams = useSearchParams();
  const userName = searchParams.get("name");

  const { data } = useQuery({
    queryKey: ["other-user-profile", params.id],
    queryFn: async () => {
      return await fecthOtherUserPosts(params);
    },
    staleTime: 0,
    refetchInterval: 5000,
  });

  return (
    <ProfileComponent
      name={userName}
      desc={`Welcome to ${userName}'s personalized profile page. Explore ${userName}'s exceptional prompts and be inspired by the power of their imagination.`}
      data={data}
      isSelf={false}
    />
  );
};

export default UserProfile;
