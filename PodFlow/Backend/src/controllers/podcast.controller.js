import { aysncHandler, ApiError, ApiResponse } from "../utils/index.js";
import { Podcast } from "../models/podcast.model.js";
import { Category } from "../models/category.model.js";
import { User } from "../models/user.model.js";

const addPodcast = aysncHandler(async(req,res)=>{
    try {
        const {title, description, category} = req.body;
    
        const frontImage = req.files['frontImage'][0].path
        const audioFile = req.files['audioFile'][0].path
    
        if(!title || !description || !category || !frontImage || !audioFile){
            throw new ApiError(400, "All fields are required")
        }
    
        const {user} = req;
        const cat = await Category.findOne({categoryName: category});
    
        if(!cat){
            throw new ApiError(404,"No category found")
        }
        const catId = cat._id;
        const userId = user._id;
    
        const newPodcast = new Podcast({
            title, 
            description,
            category: catId,
            frontImage,
            audioFile,
            user:userId
    
        })
        await newPodcast.save();
        await Category.findByIdAndUpdate(catId, {
            $push:{podcasts:newPodcast._id}
        });
        await User.findByIdAndUpdate(userId, {
            $push:{podcasts:newPodcast._id}
        })
    
        return res
        .status(200)
        .json(
            new ApiResponse(201, "Podcast saved successfully")
        )
    } catch (error) {
        throw new ApiError(400, "Failed to add podcast")
    }

})


const getPodcast = aysncHandler(async(req,res)=>{
    try {
        const podcasts = await Podcast.find().populate("category").sort({createdAt:-1});
        return res
        .status(200)
        .json(new ApiResponse(201, 
            {data:podcasts}
        ))
    } catch (error) {
        throw new ApiError(500, error?.message || "Internal Server Error")
    }
})

const userPodcast = aysncHandler(async(req,res)=>{
    try { 
        const {user} = req
        const userId = user._id;
        const data = await User.findById(userId).populate(
            {
                path:"podcasts",
                populate : {path:"category"}
            }
        ).select("-password")

        if(data && data.podcasts){
            data.podcasts.sort(
                (a,b) => new Date(b.createdAt) - new Date(a.createdAt)
            );
        }
        return res
        .status(200)
        .json( new ApiResponse(200, data.podcasts, "Data received successfully"))
    } catch (error) {
        throw new ApiError(400,"Error while getting user podcast")
    }
})

const podcastById = aysncHandler(async(req, res)=> {
    try {
        const {id} = req.params;
        const podcast = await Podcast.findById(id).populate("category");
        return res
        .status(200)
        .json( new ApiResponse(200,podcast, "Podcast found successfully"))
    } catch (error) {
        
    }
})

const podcastByCategory = aysncHandler(async(req, res)=> {
    try {
        const {cat} = req.params;
        const categories = await Podcast.findById({categoryName:cat}).populate({
            path:"podcasts",
            populate:{
                path:"category"
            }
        });

        let podcasts = [];
        categories.forEach((category) => {
            podcasts = [...podcasts,...category.podcasts]
        });
        return res
        .status(200)
        .json( new ApiResponse(200,podcast, "Podcast found successfully"))
    } catch (error) {
        
    }
})
export {
    addPodcast,
    getPodcast,
    userPodcast,
    podcastById,
    podcastByCategory
    
}
