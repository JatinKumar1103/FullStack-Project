import jwt from 'jsonwebtoken'
import { aysncHandler, ApiError, ApiResponse } from "../utils/index.js";
import { User } from '../models/user.model.js';


export const verifyJWT = aysncHandler(
    async(req, _ , next) =>{
        try {
            const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer","")
            if(!token){
                throw new ApiError(401, "Unauthorized request")
            }
            const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

            const user = await User.findById(decodedToken?._id).select("-password")

            if(!user){
                throw new ApiError(401, "Invalid AccessToken")
            }

            req.user = user
            next();
        } catch (error) {
            throw new ApiError(401, error?.message || "Invalid AccessToken")
        }
    }
)