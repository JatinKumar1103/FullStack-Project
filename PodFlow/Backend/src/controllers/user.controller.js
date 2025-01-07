import { aysncHandler, ApiError, ApiResponse } from "../utils/index.js";
import { User } from "../models/user.model.js";
import jwt from 'jsonwebtoken'

const options = {
    httpOnly :true,
    secure :true,   
}

const generateAccessToken = async(userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken();

        return {accessToken}

    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating access token")
    }
}

const registerUser = aysncHandler(async (req,res) => {
    const {username, email, password} = req.body;
    

   if([username, email, password].some((field)=> field?.trim() ==="")){
    throw new ApiError(400, "All fields are required");
   }
   if(username.length < 5){
    throw new ApiError(400, "Username must be at least 5 characters")
   }

   if(password.length < 8){
    throw new ApiError(400, "Password must be at least 5 characters")
   }

   //checking if user is already registered

   const existedUser = await User.findOne({
    $or:[{username, email}]
   })

   if(existedUser){
    throw new ApiError(409, 'User already exists')
   }

   const user = await User.create({
    username,
    email,
    password
   });

   const createdUser = await User.findById(user._id).select("-password ");

   if(!createdUser){
    throw new ApiError(500,'Error while registering user')
   }

   return res
    .status(200)
    .json(new ApiResponse(200, createdUser, "User registerd successfully"))



})

const loginUser = aysncHandler(async (req,res) => {
    const {email, username , password} = req.body

    if(!(username || email)){
        throw new ApiError(400, "username or email is required")
    }

    const user = await User.findOne({
        $or:[{username}, {email}]
    })

    if(!user){
        throw new ApiError(400, "User not found")
    }
    const isPasswordCorrect = await user.isPasswordCorrect(password);

    if(!isPasswordCorrect){
        throw new ApiError(401,'Password is incorrect')
    }
    const {accessToken} = await generateAccessToken(user._id)

    const loggedInUser = await User.findById(user._id).select(    "-password")

    return res
    .status(200)
    .cookie("accessToken",accessToken,options)
    .json(
        new ApiResponse(200,{
            user:loggedInUser,
            accessToken
        },
    "User logged in Successfully" )
    )
    
})

const logoutUser = aysncHandler(async(req,res)=>{
    res.clearCookie("accessToken",options);

    return res
    .status(200)
    .json(new ApiResponse(200,"Successfully logged out"))
})

const checkCookies = aysncHandler(async(req,res)=>{
    const token = req.cookies.accessToken;
    if(token){
        return res
        .status(200)
        .json(new ApiResponse(200,{message: true}))
    }
    return res
        .status(200)
        .json(new ApiResponse(200,{message: false}))
})

const getUserDetails =aysncHandler(async(req,res)=>{
    try {
        const {email} = req.user;
        const existingUser = await User.findOne({email:email}).select(
            "-password"
        )
        return res
        .status(200)
        .json(new ApiResponse(200, 
            {user:existingUser}
        ))
    } catch (error) {
        throw new ApiError(401, error)
    }
})



export {
    registerUser,
    loginUser,
    logoutUser,
    checkCookies,
    getUserDetails
}
