import { Button } from "@/components/ui/button";
import { cancelAddFriend } from "@/utils/apiFriendRequest";
import { FriendButton } from "@/utils/typescript";
import { useMutation } from "@tanstack/react-query";
import { UserRoundCheck, UserX } from "lucide-react";
import AddFriendButton from "./add-friend-button";

const DeleteFriendButton = ({ userId, friendId, type }: FriendButton) => {
  const { mutateAsync, isPending, isSuccess } = useMutation({
    mutationFn: async () => {
      if (!userId || !friendId)
        return console.log("userId or friendId is not valid");
      try {
        await cancelAddFriend(userId, friendId);
      } catch (err) {
        console.log("Error when add friend", err);
      }
    },
  });

  const handleCancelAddFriend = async () => {
    if (type === "delete") {
      const confirm = window.confirm(
        "Are you sure you want to delete this friend?",
      );

      if (confirm) await mutateAsync();
    } else {
      await mutateAsync();
    }
  };

  if (isSuccess) return <AddFriendButton userId={userId} friendId={friendId} />;

  return (
    <Button
      disabled={isPending}
      size="sm"
      className="btn_friend"
      onClick={handleCancelAddFriend}
    >
      {type === "cancel" && (
        <>
          <UserX className="mr-2 h-6 w-6" />
          Cancel add friend
        </>
      )}

      {type === "delete" && (
        <>
          <UserRoundCheck className="mr-2 h-6 w-6" />
          Already friend
        </>
      )}
    </Button>
  );
};

export default DeleteFriendButton;
