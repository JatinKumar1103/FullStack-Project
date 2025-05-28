import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { Request,Response,NextFunction } from "express";
import { Admin } from "../models/admin.model.js";

interface AuthRequest extends Request {
    user?: any; 
  }

export const verifyAdmin = asyncHandler(async(req:AuthRequest,res,next)=>{
    
    const userId = req.user._id;
    const admin = await Admin.findOne({userId});

    if(!admin){
        throw new ApiError(401,"ACCESS DENIED");
    }
    
    req.user.adminLevel = admin.adminLevel;
    next();
})

export const verifySuperAdmin = asyncHandler(async(req:AuthRequest, res:Response, next)=>{
    const userId = req.user._id;
    const admin = await Admin.findOne({userId});

    if(!admin || admin.adminLevel !== "superadmin"){
        throw new ApiError(401,"ACCESS DENIED. SuperAdmin only");
    }
    next();
})