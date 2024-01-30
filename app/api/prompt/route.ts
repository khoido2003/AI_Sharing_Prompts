import { connectToDB } from "../../utils/database";
import Prompt from "../../models/prompt";

export const GET = async (req, res) => {
  try {
    await connectToDB();
    const prompts = await Prompt.find({})
      .populate("creator")
      .sort("-dateAdded");

    res.status(200).json(prompts);
  } catch (err) {
    console.error("Failed to fetch prompts:", err);
    res.status(500).send("Failed to fetch prompts!");
  }
};
