import Like from "@/models/like";
import { connectToDB } from "@/utils/database";
import { NextRequest } from "next/server";

// GET PROMT LIKES
export const GET = async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams;

  const promptId = searchParams.get("promptId");

  if (!promptId) {
    return new Response("Missing promptId", { status: 400 });
  }

  try {
    await connectToDB();

    const likes = await Like.find({
      promptId: promptId,
    }).populate("userId");

    return new Response(JSON.stringify(likes), { status: 200 });
  } catch (err) {
    return new Response("Failed to delete like! Please try again 😢", {
      status: 500,
    });
  }
};

export const DELETE = async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams;

  const userId = searchParams.get("userId");
  const promptId = searchParams.get("promptId");

  if (!userId || !promptId) {
    return new Response("Missing userId or promptId", { status: 400 });
  }

  try {
    await connectToDB();

    const like = await Like.findOne({
      userId: userId,
      promptId: promptId,
    });

    if (like._id) {
      await like.deleteOne();
      return new Response(JSON.stringify(like), {
        status: 200,
      });
    }

    return new Response("Friend request not found", { status: 404 });
  } catch (err) {
    return new Response("Failed to delete like! Please try again 😢", {
      status: 500,
    });
  }
};
