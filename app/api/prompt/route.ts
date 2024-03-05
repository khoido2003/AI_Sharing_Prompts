import { connectToDB } from "../../../utils/database";
import Prompt from "../../../models/prompt";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams;
  const searchValue = searchParams.get("search");
  const pageValue = searchParams.get("page");

  const pageSize = 10; // Set the desired page size

  try {
    await connectToDB();

    let query = {};
    let value;

    if (searchValue) {
      if (searchValue.startsWith("#")) {
        value = searchValue.slice(1);
      } else {
        value = searchValue;
      }

      query = { $text: { $search: `${value}` } };
    }

    const totalPrompts = await Prompt.countDocuments(query);
    let prompts;

    if (pageValue) {
      const page = parseInt(pageValue, 10);
      const skip = (page - 1) * pageSize;

      // This aggregation operator does not work for some reason, I still try to figue it out and hope fix it in the near future.
      // prompts = await Prompt.aggregate([
      //   { $match: query },
      //   { $sort: { dateAdded: -1 } },
      //   { $skip: skip },
      //   { $limit: pageSize },
      //   {
      //     $lookup: {
      //       from: "creators",
      //       localField: "creator",
      //       foreignField: "_id",
      //       as: "creator",
      //     },
      //   },
      //   { $unwind: "$creator" },
      // ]);

      prompts = await Prompt.find(query)
        .populate("creator")
        .sort("-dateAdded")
        .skip(skip)
        .limit(pageSize);
    } else {
      prompts = await Prompt.find(query).populate("creator").sort("-dateAdded");
    }

    const result = {
      pageValue,
      prompts,
      pageInfo: {
        totalItems: totalPrompts,
        totalPages: Math.ceil(totalPrompts / pageSize),
      },
    };

    return new Response(JSON.stringify(result), { status: 200 });
  } catch (err) {
    console.log(err);
    return new Response("Failed to fetch prompts!", { status: 500 });
  }
};
