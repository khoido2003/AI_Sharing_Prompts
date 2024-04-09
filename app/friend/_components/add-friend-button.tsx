import { Button } from "@/components/ui/button";
import { addFriend } from "@/utils/apiFriendRequest";
import { FriendButton } from "@/utils/typescript";
import { useMutation } from "@tanstack/react-query";
import { UserPlus } from "lucide-react";
import DeleteFriendButton from "./delete-friend-button";

const AddFriendButton = ({ userId, friendId }: FriendButton) => {
  const { mutateAsync, isPending, isSuccess } = useMutation({
    mutationFn: async () => {
      if (!userId || !friendId)
        return console.log("userId or friendId is not valid");
      try {
        await addFriend(userId, friendId);
      } catch (err) {
        console.log("Error when add friend", err);
      }
    },
  });

  const handleAddFriend = async () => {
    await mutateAsync();
  };

  if (isSuccess)
    return (
      <DeleteFriendButton userId={userId} friendId={friendId} type="cancel" />
    );

  return (
    <Button
      disabled={isPending}
      size="sm"
      className="btn_friend"
      onClick={handleAddFriend}
    >
      <UserPlus className="mr-2 h-6 w-6" />
      Add Friend
    </Button>
  );
};

export default AddFriendButton;
