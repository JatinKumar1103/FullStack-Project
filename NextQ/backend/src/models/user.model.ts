import mongoose, { Schema, Document } from "mongoose";

import jwt, { SignOptions } from "jsonwebtoken";
import bcrypt from "bcrypt";



interface IUser extends Document {
  _id: Schema.Types.ObjectId;
  username: string;
  name: string;
  email: string;
  password: string;
  status: "active" | "inactive" | "banned";
  profileData?: mongoose.Types.ObjectId;
  refreshToken?: string;
  generateAccessToken(): string;
  generateRefreshToken(): string;
  isPasswordCorrect(password:string) : Promise<boolean>;
  
}

const userSchema = new Schema<IUser>(
  {
    username: {type: String, required: true, unique:true, lowercase:true,trim:true,index:true},
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, trim:true },
    password: { type: String, required: true },
    status: { type: String, enum: ["active", "inactive", "banned"] ,default: "active"},
    profileData: { type: Schema.Types.ObjectId, ref: "Profile", default:null },
    refreshToken: { type: String },
  },
  { timestamps: true }
);


userSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (error) {
    next(error as Error)
  }
})

userSchema.methods.isPasswordCorrect = async function (password : string) : Promise<boolean> {
  return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function (this: IUser): string {

    return jwt.sign(
      {
        _id: this._id.toString(),
        email: this.email,
        username: this.username,
        name: this.name,
      },
      process.env.ACCESS_TOKEN_SECRET as string,
      {

        
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY as SignOptions["expiresIn"]
      }
    );
  };


userSchema.methods.generateRefreshToken
 = function (this:IUser):string {

  return jwt.sign(
    {
    _id:this._id.toString()
  },
  process.env.REFRESH_TOKEN_SECRET as string,
  {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRY as SignOptions["expiresIn"]
  }
)
}

export const User = mongoose.model<IUser>("User", userSchema);
