import { Profile } from "../models/profile.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";

import mongoose from "mongoose";
import { generateAccessAndRefreshToken } from "../utils/GenerateATRT.js";
import { Request , Response } from "express";
import jwt from "jsonwebtoken";

const cookieOptions = {
  httpOnly : true,
  secure:process.env.NODE_ENV === "production",
  
}

interface AuthRequest extends Request {
  user?: any; 
}


const registerUser = asyncHandler(async (req, res) => {
  const { name, username, email, password } = req.body;

  if ([name, username, email, password].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }

  const existedUser = await User.findOne({
    $or: [
      {
        username,
      },
      {
        email,
      },
    ],
  });

  if (existedUser) {
    throw new ApiError(403, "User already exists");
  }

  const user = await User.create({
    name,
    username,
    email,
    password,
  });

  const profile = await Profile.create({
    userId: user._id,
  });
  user.profileData = profile._id  as mongoose.Types.ObjectId;
  await user.save();

  const createdUser = await User.findById(user._id)
  .select("-password -refreshToken")
  .populate("profileData")

  if (!createdUser) {
    throw new ApiError(500, "Failed to create user");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User Registerd successfully"));
});

const loginUser = asyncHandler(async(req,res)=>{
  const {email,username,password} = req.body;

  if(!(username || email)){
    throw new ApiError(400, "Email or username is required");
  }

  

  const user = await User.findOne({
    $or:[
      {username},{email}
    ]
  }) ;
  if(!user){
    throw new ApiError(401, "User not found");
  }

  if (!password) {
    throw new ApiError(400, "Password is required");
  }
  

  const isPasswordValid = await user.isPasswordCorrect(password);

  if(!isPasswordValid){
    throw new ApiError(401, "Password is incorrect");
  }
  const {accessToken,refreshToken} = await generateAccessAndRefreshToken(user._id);

  const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

  return res
  .status(200)
  .cookie("accessToken",accessToken,cookieOptions)
  .cookie("refreshToken",refreshToken,cookieOptions)
  .json(
    new ApiResponse(
      200,
      {
        user:loggedInUser,
        accessToken,
        refreshToken
      },
      "User logged in Successfully"
    )
  )
  
});

const logoutUser = asyncHandler(async(req :AuthRequest,res:Response)=>{
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset:{
        refreshToken:""
      },
    },
    {
      new: true,
    }
  );
  return res
  .status(200)
  .clearCookie("accessToken",cookieOptions)  
  .clearCookie("refreshToken",cookieOptions)  
  .json(
    new ApiResponse(200, {} , "User logged out successfully")
  )

})

const refreshAccessToken = asyncHandler(async(req,res)=>{
  const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;

  if(!incomingRefreshToken){
    throw new ApiError(401,"Unauthorized request");
  }
  const decodedToken = jwt.verify(incomingRefreshToken,process.env.REFRESH_TOKEN_SECRET as string) as jwt.JwtPayload

  const user = await User.findById(decodedToken?._id);

  if(!user){
    throw new ApiError(401, "Invalid refresh token");
  }
  if(incomingRefreshToken !== user?.refreshToken){
    throw new ApiError(401,"Refresh Token is expired or used");
  }

  const {accessToken, refreshToken:newRefreshToken} = await generateAccessAndRefreshToken(user._id);

  return res
  .status(200)
  .cookie("accessToken",accessToken,cookieOptions)
  .cookie("refreshToken",newRefreshToken,cookieOptions)
  .json(
    new ApiResponse(
      200,
      {
        accessToken,
        refreshToken:newRefreshToken
      },
      "Access token refreshed successfully"
    )
  )
 
})

const changeCurrentPassword = asyncHandler(async(req:AuthRequest,res)=>{
  const {oldPassword, newPassword} = req.body;

  const user = await User.findById(req.user?._id);

  const isPasswordCorrect = await user?.isPasswordCorrect(oldPassword);

  if(!isPasswordCorrect){
    throw new ApiError(401, "Old password is incorrect");
  }

  if(!user){
    throw new ApiError(401, "User not found");
  }
  user.password = newPassword ;
  await user.save({validateBeforeSave:false})

  return res 
  .status(200)
  .json(new ApiResponse(200, {},
    "Password changed successfully"
  ))
})

const updateAccountDetails = asyncHandler(async(req:AuthRequest,res) => {
  const {name, username} = req.body;
  if(!(name || username)){
    throw new ApiError(400, "Name or Username is required");
  }

  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set:{
        name,
        username
      }
    },
    {
      new:true
    }
  ).select("-password");

  return res
  .status(200)
  .json(new ApiResponse(200, user, "Accounts Details successfully updated"))
})

export { 
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  changeCurrentPassword,
  updateAccountDetails
 };
