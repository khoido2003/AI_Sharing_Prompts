import mongoose, { Schema, models } from "mongoose";

const FriendRequestSchema = new mongoose.Schema({
  senderId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  receiverId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "accepted"],
    default: "pending",
  },
});

const FriendRequest =
  models.FriendRequest || mongoose.model("FriendRequest", FriendRequestSchema);

export default FriendRequest;
