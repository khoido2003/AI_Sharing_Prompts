import { connectToDB } from "../../../utils/database";
import Prompt from "../../../models/prompt";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams;
  const searchValue = searchParams.get("search");

  try {
    await connectToDB();

    let prompts;
    let value;

    if (searchValue) {
      if (searchValue.startsWith("#")) {
        value = searchValue.slice(1);
      } else {
        value = searchValue;
      }

      prompts = await Prompt.find({ $text: { $search: `${value}` } })
        .populate("creator")
        .sort("-dateAdded");
    } else
      prompts = await Prompt.find({}).populate("creator").sort("-dateAdded");

    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (err) {
    console.log(err);
    return new Response("Failed to fetch prompts!", { status: 500 });
  }
};
