import FriendRequest from "@/models/friendRequest";
import { connectToDB } from "@/utils/database";
import { NextRequest } from "next/server";

// GET RELATION BETWEEN TWO USERS
export const GET = async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams;

  const userId = searchParams.get("userId");
  const friendId = searchParams.get("friendId");
  try {
    await connectToDB();

    if (!userId || !friendId)
      return new Response("Missing userId or friendId", { status: 400 });

    const friendRequest = await FriendRequest.findOne({
      $or: [
        { senderId: userId, receiverId: friendId },
        { senderId: friendId, receiverId: userId },
      ],
    });

    return new Response(JSON.stringify(friendRequest), { status: 200 });
  } catch (err) {
    return new Response("Failed to find friend! Please try again 😢", {
      status: 500,
    });
  }
};

export const PATCH = async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams;

  const userId = searchParams.get("userId");
  const friendId = searchParams.get("friendId");
  try {
    await connectToDB();

    if (!userId || !friendId)
      return new Response("Missing userId or friendId", { status: 400 });

    const friendRequest = await FriendRequest.findOne({
      $or: [
        { senderId: userId, receiverId: friendId },
        { senderId: friendId, receiverId: userId },
      ],
    });

    if (!friendRequest._id || friendRequest.status === "accepted") {
      return new Response("Friend request not found or can not change status", {
        status: 404,
      });
    }

    friendRequest.status = "accepted";
    await friendRequest.save();
    return new Response(JSON.stringify(friendRequest), { status: 200 });
  } catch (err) {
    return new Response("Failed to find friend! Please try again 😢", {
      status: 500,
    });
  }
};

export const DELETE = async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams;

  const userId = searchParams.get("userId");
  const friendId = searchParams.get("friendId");
  try {
    await connectToDB();

    if (!userId || !friendId)
      return new Response("Missing userId or friendId", { status: 400 });

    const friendRequest = await FriendRequest.findOne({
      $or: [
        { senderId: userId, receiverId: friendId },
        { senderId: friendId, receiverId: userId },
      ],
    });

    if (friendRequest._id) {
      await friendRequest.deleteOne();
      return new Response(JSON.stringify(friendRequest), {
        status: 200,
      });
    }

    return new Response("Friend request not found", { status: 404 });
  } catch (err) {
    return new Response("Failed to find friend! Please try again 😢", {
      status: 500,
    });
  }
};
