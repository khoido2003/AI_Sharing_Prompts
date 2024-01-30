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

///////////////////////////

export const DELETE = async (
  req: Request,
  { params }: { params: { id: string } },
) => {
  try {
    await connectToDB();
    const prompt = await Prompt.findByIdAndDelete(params.id);

    if (!prompt) return new Response("Prompt not found", { status: 404 });
    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (err) {
    return new Response("Failed to delete prompt!", { status: 500 });
  }
};

/////////////////////////////////

export const PATCH = async (
  req: Request,
  { params }: { params: { id: string } },
) => {
  const { prompt, tag } = await req.json();

  try {
    await connectToDB();

    const existingPrompt = await Prompt.findById(params.id);
    if (!prompt) return new Response("Prompt not found!", { status: 404 });

    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;
    existingPrompt.dateAdded = new Date(Date.now()).toISOString();

    await existingPrompt.save();

    return new Response(JSON.stringify(existingPrompt), { status: 200 });
  } catch (err) {
    return new Response("Failed to update prompt!", { status: 500 });
  }
};
