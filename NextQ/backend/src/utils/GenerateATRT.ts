import { User } from "../models/user.model.js";
import mongoose,{Schema} from "mongoose"
import { ApiError } from "./ApiError.js";
ApiError

const generateAccessAndRefreshToken = async(userId : mongoose.Schema.Types.ObjectId)  =>{
    try{
        const user = await User.findById(userId);
        if (!user) {
            throw new ApiError(404, "User not found");
        }

        const accessToken = user?.generateAccessToken();
        const refreshToken = user?.generateRefreshToken();

        user.refreshToken  = refreshToken ;
        await user.save({
            validateBeforeSave: false,
        })
        return {accessToken, refreshToken};
    }catch(error){
        throw new ApiError(
            500,
            error instanceof Error ? error.message : "Something went wrong while generating access and refresh token"
        )
    }
}

export {
    generateAccessAndRefreshToken
}