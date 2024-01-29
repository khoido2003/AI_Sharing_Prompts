import mongoose, { Schema, models } from "mongoose";

const PromptSchema = new mongoose.Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  prompt: {
    type: String,
    required: [true, "Prompt is required!"],
  },

  tag: {
    type: String,
    required: [true, "Tag is required!"],
  },

  dateAdded: {
    type: Date,
    default: new Date(Date.now()).toISOString(),
  },
});

const Prompt = models.Prompt || mongoose.model("Prompt", PromptSchema);

export default Prompt;
