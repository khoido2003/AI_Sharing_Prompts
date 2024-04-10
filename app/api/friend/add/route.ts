import FriendRequest from "@/models/friendRequest";
import { connectToDB } from "@/utils/database";

export const POST = async (req: Request, res: Response) => {
  // senderId vs receiverId
  const { senderId, receiverId } = await req.json();

  try {
    // check senderId and receiverId already exist in friendRequest
    const existingFriendRequest = await FriendRequest.findOne({
      $or: [
        { senderId: senderId, receiverId: receiverId },
        { senderId: receiverId, receiverId: senderId },
      ],
    });

    if (existingFriendRequest) {
      return new Response("Friend request already exists!", { status: 400 });
    }

    await connectToDB();
    const newFriendRequest = new FriendRequest({
      senderId: senderId,
      receiverId: receiverId,
    });
    await newFriendRequest.save();

    return new Response(JSON.stringify(newFriendRequest), { status: 201 });
  } catch (err) {
    console.log("Error when add friend", err);
    return new Response("Failed to add friend! Please try again 😢", {
      status: 500,
    });
  }
};
