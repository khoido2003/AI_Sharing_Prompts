import { Button } from "@/components/ui/button";
import { acceptAddFriend } from "@/utils/apiFriendRequest";
import { FriendButton } from "@/utils/typescript";
import { useMutation } from "@tanstack/react-query";
import { UserRoundCheck } from "lucide-react";
import DeleteFriendButton from "./delete-friend-button";

const AcceptFriendButton = ({ userId, friendId }: FriendButton) => {
  const { mutateAsync, isPending, isSuccess } = useMutation({
    mutationFn: async () => {
      if (!userId || !friendId)
        return console.log("userId or friendId is not valid");
      try {
        await acceptAddFriend(userId, friendId);
      } catch (err) {
        console.log("Error when add friend", err);
      }
    },
  });

  const handleAcceptFriend = async () => {
    await mutateAsync();
  };

  if (isSuccess)
    return (
      <DeleteFriendButton userId={userId} friendId={friendId} type="delete" />
    );

  return (
    <Button
      disabled={isPending}
      size="sm"
      className="btn_friend"
      onClick={handleAcceptFriend}
    >
      <UserRoundCheck className="mr-2 h-6 w-6" />
      Accept
    </Button>
  );
};

export default AcceptFriendButton;
