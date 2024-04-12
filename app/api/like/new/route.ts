import Like from "@/models/like";
import { connectToDB } from "@/utils/database";

export const POST = async (req: Request, res: Response) => {
  const { userId, promptId } = await req.json();

  try {
    await connectToDB();
    const existingLike = await Like.findOne({
      userId: userId,
      promptId: promptId,
    });

    if (existingLike) {
      return new Response("Like already exists!", { status: 400 });
    }

    const newLike = new Like({
      userId: userId,
      promptId: promptId,
    });
    await newLike.save();

    return new Response(JSON.stringify(newLike), { status: 201 });
  } catch (err) {
    console.log("Error when add like", err);
    return new Response("Failed to add like! Please try again 😢", {
      status: 500,
    });
  }
};
