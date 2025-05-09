import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { Request,Response,NextFunction } from "express";

interface AuthRequest extends Request {
    user?: any; 
  }

export const verifyJWT = asyncHandler(async(req: AuthRequest, _: Response, next: NextFunction)=>{
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","")
    
        if(!token){
            throw new ApiError(401,"Unauthorized request")
        }
    
        const decodedToken = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET as string) as jwt.JwtPayload
    
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken") 
    
        if(!user){
            throw new ApiError(401,"Invalid Access Token")
        }
    
        req.user = user;
        next();
    } catch (error) {
        throw new ApiError(401, "Acces Token Expired or Invalid")
    }
})