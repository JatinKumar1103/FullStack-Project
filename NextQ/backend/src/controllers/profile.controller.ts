import { Profile } from "../models/profile.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import {  Request,Response } from "express";
import mongoose from "mongoose";

interface AuthRequest extends Request {
    user?: any; 
  }


// const getProfile = asyncHandler(async (req: AuthRequest, res: Response) => {
//     const userId = req.user._id;

//     const profile = await Profile.findOne({ userId })
//       .populate({
//         path: "userId",
//         select: "name username email -_id",
//       })
//       .select("bio avatar socialLinks skills")
//       .lean(); 

//     if (!profile) {
//       throw new ApiError(404, "Profile not found");
//     }

//     return res
//       .status(200)
//       .json(new ApiResponse(200, profile, "Profile fetched successfully"));
//   });

const getProfile = asyncHandler(async (req: AuthRequest, res: Response) => {
    const userId = req.user._id;

    if(!userId){
        throw new ApiError(401, "User not authorized to access this profile");
    }
  
    const profile = await Profile.aggregate([
      { $match: {userId :new mongoose.Types.ObjectId(userId)} }, // Filter by userId
      {
        $lookup: {
          from: "users", // Collection name in MongoDB
          localField: "userId",
          foreignField: "_id",
          as: "userDetails",
        },
      },
      { $unwind: "$userDetails" }, // Convert array to object
      {
        $project: {
          bio: 1,
          avatar: 1,
          socialLinks: 1,
          skills: 1,
          "userDetails.name": 1,
          "userDetails.username": 1,
          "userDetails.email": 1,
        },
      },
    ]);
  
    if (!profile.length) {
      throw new ApiError(404, "Profile not found");
    }
  
    return res
      .status(200)
      .json(new ApiResponse(200, profile[0], "Profile fetched successfully"));
  });

const updateProfile = asyncHandler(async(req:AuthRequest, res:Response)=>{
    const{bio, avatar,socialLinks,skills}=req.body;

    if(!(bio || avatar || socialLinks || skills)){
        throw new ApiError(400, "Fields are required");
    }

    const userId = req.user._id;

    if(!userId) {
        throw new ApiError(401, "Unauthorized to update profile");
    }

    const updatedProfile = await Profile.findOneAndUpdate(
        {userId},
        {$set: {bio, avatar,socialLinks,skills}},
        {new :true}
    );

    return res
    .status(200)
    .json(
        new ApiResponse(200, updatedProfile, "Profile updated successfully")
    )
})

const deleteProfile = asyncHandler(async(req:AuthRequest, res:Response) => {
    const userId = req.user._id;

    if(!userId){
        throw new ApiError(401, "Unauthorized to delete profile");
    }

    await Profile.findOneAndDelete(
        {userId}
    );
    await User.findByIdAndDelete(userId);

    return res
    .status(200)
    .json(
        new ApiResponse(200, {}, "Profile deleted successfully")
    )
    
})

const getPublicProfile = asyncHandler(async(req,res) => {
    const username = req.params.username;

    const profile = await Profile.aggregate([
        {
            $lookup: {
                from: "users",
                localField: "userId",
                foreignField: "_id",
                as: "userDetails",
            },
        },
        { $unwind: "$userDetails" }, 
        { $match: { "userDetails.username": username } }, 
        {
            $project: {
                bio: 1,
                avatar: 1,
                socialLinks: 1,
                skills: 1,
                "userDetails.name": 1,
                "userDetails.username": 1,
            },
        },
    ]);
    
    if(!profile.length){
        throw new ApiError(404, "Profile not found");
    }

    return res
    .status(200)
    .json(
        new ApiResponse(200, profile[0], "Public profile fetched successfully")
    )
})

export{
    getProfile,
    updateProfile,
    deleteProfile,
    getPublicProfile
}
  