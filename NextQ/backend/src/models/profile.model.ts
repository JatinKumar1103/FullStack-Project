import mongoose, { Schema, Document } from "mongoose";

interface IProfile extends Document {
  userId: mongoose.Types.ObjectId;
  bio: string;
  avatar: string;
  socialLinks: string[];
  skills: string[];
}

const profileSchema = new Schema<IProfile>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index:true },
    bio: { type: String, default: "" },
    avatar: { type: String, default: "" },
    socialLinks: { type: [String] },
    skills: { type: [String] },
  },
  { timestamps: true }
);

export const Profile = mongoose.model<IProfile>("Profile", profileSchema);
