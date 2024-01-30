import Prompt from "@/app/models/prompt";
import { connectToDB } from "@/app/utils/database";

export const GET = async (
  req: Request,
  { params }: { params: { id: string } },
) => {
  try {
    await connectToDB();
    const prompts = await Prompt.find({ creator: params.id })
      .populate("creator")
      .sort("-dateAdded");

    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (err) {
    return new Response("Failed to fetch prompts!", { status: 500 });
  }
};
