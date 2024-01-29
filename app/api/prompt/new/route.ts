import Prompt from "@/app/models/prompt";
import { connectToDB } from "@/app/utils/database";

export const POST = async (req: Request, res: Response) => {
  const { userId, prompt, tag, dateAdded } = await req.json();

  try {
    await connectToDB();
    const newPrompt = new Prompt({
      creator: userId,
      prompt,
      tag,
      dateAdded,
    });

    await newPrompt.save();

    return new Response(JSON.stringify(newPrompt), { status: 201 });
  } catch (err) {
    console.log(err);
    return new Response("Failed to create a new prompt! Please try again 😢", {
      status: 500,
    });
  }
};
