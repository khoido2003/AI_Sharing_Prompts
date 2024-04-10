"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";
import FriendList from "./_components/friend-list";
import RequestList from "./_components/request-list";
import ReceiveList from "./_components/receive-list";

const FriendPage = () => {
  const [friendListType, setFriendListType] = useState<string>("all");

  return (
    <section className="w-full">
      <h1 className="head_text">
        List <span className="blue_gradient"> Friends</span>
      </h1>

      <p className="desc">
        {" "}
        Connect with friends from around the world and explore their prompts!
      </p>

      <div className="mt-8 flex flex-wrap gap-4 sm:gap-6 md:gap-8">
        <Button
          className={cn(
            "hover:bg-primary-orange hover:text-white",
            friendListType === "all" && "bg-primary-orange text-white",
          )}
          onClick={() => setFriendListType("all")}
        >
          All Friends
        </Button>
        <Button
          className={cn(
            "hover:bg-primary-orange hover:text-white",
            friendListType === "request" && "bg-primary-orange text-white",
          )}
          onClick={() => setFriendListType("request")}
        >
          Sent Requests
        </Button>
        <Button
          className={cn(
            "hover:bg-primary-orange hover:text-white",
            friendListType === "receive" && "bg-primary-orange text-white",
          )}
          onClick={() => setFriendListType("receive")}
        >
          Receive Requests
        </Button>
      </div>

      <div className="prompt_layout mt-4">
        {friendListType === "all" && <FriendList />}
        {friendListType === "request" && <RequestList />}
        {friendListType === "receive" && <ReceiveList />}
      </div>
    </section>
  );
};

export default FriendPage;
