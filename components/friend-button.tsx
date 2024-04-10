import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";

import { DynamicFriendButton } from "./dynamic-friend-button";
import { usePathname } from "next/navigation";

export const FriendButton = ({ isSelf }: { isSelf: boolean | undefined }) => {
  const pathname = usePathname();
  const friendId = pathname.split("/")[2];

  return (
    <div className="flex w-full items-center gap-4">
      <DynamicFriendButton isSelf={isSelf} />

      {/* TODO:  userFriend */}
      {isSelf && (
        <Button asChild size="sm" className="mb-2 mt-4 text-base">
          <Link href={isSelf ? "/friend" : `/friend?id=${friendId}`}>
            View all friends
            <ArrowRight className="ml-2 h-6 w-6" />
          </Link>
        </Button>
      )}
    </div>
  );
};
