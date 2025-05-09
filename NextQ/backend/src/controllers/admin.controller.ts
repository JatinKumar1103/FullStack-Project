import { Admin } from "../models/admin.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { Request,Response } from "express";
import mongoose from "mongoose";

interface AuthRequest extends Request{
    user?:any;
}

const assignAdmin = asyncHandler(async(req:AuthRequest, res:Response)=>{
    const {userId, adminLevel} = req.body;

    if(!mongoose.Types.ObjectId.isValid(userId)){
        throw new ApiError( 400,"Invalid user id");
    }

    const requestAdmin = await Admin.findOne({userId : req.user._id})
    
})

export{
    assignAdmin
}