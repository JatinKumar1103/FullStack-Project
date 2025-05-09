import mongoose, { Schema, Document } from "mongoose";

interface IFriend extends Document {
  userId: mongoose.Types.ObjectId;
  friendId: mongoose.Types.ObjectId;
  status: "pending" | "accepted" | "blocked"; // Track friend requests
  createdAt: Date;
}

const FriendSchema = new Schema<IFriend>(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    friendId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    status: { type: String, enum: ["pending", "accepted", "blocked"], default: "pending" },
  },
  { timestamps: true }
);

export const Friend = mongoose.model<IFriend>("Friend", FriendSchema);
