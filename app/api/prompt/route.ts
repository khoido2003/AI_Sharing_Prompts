import { connectToDB } from "../../utils/database";
import Prompt from "../../models/prompt";

export const GET = async (req: Request, res: Response) => {
  try {
    await connectToDB();
    const prompts = await Prompt.find({})
      .populate("creator")
      .sort("-dateAdded");

    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (err) {
    return new Response("Failed to fetch prompts!", { status: 500 });
  }
};
