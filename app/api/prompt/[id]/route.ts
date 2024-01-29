import Prompt from "@/app/models/prompt";
import { connectToDB } from "@/app/utils/database";

export const GET = async (
  req: Request,
  { params }: { params: { id: string } },
) => {
  try {
    await connectToDB();
    const prompt = await Prompt.findById(params?.id).populate("creator");

    if (!prompt) return new Response("Prompt not found!", { status: 404 });

    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (err) {
    return new Response("Failed to fetch prompts! Please try again later 😢", {
      status: 500,
    });
  }
};
