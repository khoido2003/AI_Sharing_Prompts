import FriendRequest from "@/models/friendRequest";
import { connectToDB } from "@/utils/database";
import { NextRequest } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } },
) => {
  const userId = params.id;
  const searchParams = req.nextUrl.searchParams;
  const typeValue = searchParams.get("type");

  try {
    await connectToDB();

    let friends;

    // GET ALL FRIENDS
    if (!typeValue || typeValue === "all") {
      friends = await FriendRequest.find({
        $or: [
          { senderId: userId, status: "accepted" },
          { receiverId: userId, status: "accepted" },
        ],
      })
        .populate("senderId")
        .populate("receiverId");
    }

    // GET ALL FRIEND SEND
    if (typeValue === "requested") {
      friends = await FriendRequest.find({
        senderId: userId,
        status: "pending",
      })
        .populate("senderId")
        .populate("receiverId");
    }

    // GET ALL FRIEND RECEIVED
    if (typeValue === "received") {
      friends = await FriendRequest.find({
        receiverId: userId,
        status: "pending",
      })
        .populate("senderId")
        .populate("receiverId");
    }

    if (!friends || friends.length === 0) {
      return new Response("User don't have friend", {
        status: 400,
      });
    }

    return new Response(JSON.stringify(friends), { status: 200 });
  } catch (err) {
    return new Response("Failed to find friend! Please try again 😢", {
      status: 500,
    });
  }
};
