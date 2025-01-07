import { aysncHandler, ApiError, ApiResponse } from "../utils/index.js";
import { Podcast } from "../models/podcast.model.js";
import { Category } from "../models/category.model.js";
import { User } from "../models/user.model.js";

const addPodcast = aysncHandler(async (req, res) => {
  const { title, description, category } = req.body;

  const frontImage = await req.files['frontImage'][0].path
        const audioFile = await req.files['audioFile'][0].path
// console.log(title, description, category,frontImage, audioFile);
  if ([title, description, category].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }
  if (!frontImage) throw new ApiError(400, "All fields are required");
  if (!audioFile) throw new ApiError(400, "All fields are required");

  const { user } = req;
  const cat = await Category.findOne({ categoryName: category });

  if (!cat) {
    throw new ApiError(404, "No category found");
  }
  const catId = cat._id;
  const userId = user._id;

  const newPodcast = new Podcast({
    title,
    description,
    category: catId,
    frontImage,
    audioFile,
    user: userId,
  });
  await newPodcast.save();
  await Category.findByIdAndUpdate(catId, {
    $push: { podcasts: newPodcast._id },
  });
  await User.findByIdAndUpdate(userId, {
    $push: { podcasts: newPodcast._id },
  });

  return res
    .status(200)
    .json(new ApiResponse(201, "Podcast saved successfully"));
});

const getPodcast = aysncHandler(async (req, res) => {
  try {
    const podcasts = await Podcast.find()
      .populate("category")
      .sort({ createdAt: -1 });
    return res.status(200).json(new ApiResponse(201, { data: podcasts }));
  } catch (error) {
    throw new ApiError(500, error?.message || "Internal Server Error");
  }
});

const userPodcast = aysncHandler(async (req, res) => {
  try {
    const { user } = req;
    const userId = user._id;
    const data = await User.findById(userId)
      .populate({
        path: "podcasts",
        populate: { path: "category" },
      })
      .select("-password");

    if (data && data.podcasts) {
      data.podcasts.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    }
    return res
      .status(200)
      .json(new ApiResponse(200, data.podcasts, "Data received successfully"));
  } catch (error) {
    throw new ApiError(400, "Error while getting user podcast");
  }
});

const podcastById = aysncHandler(async (req, res) => {
  
    const { id } = req.params;
    const podcast = await Podcast.findById(id).populate("category");
    if(!podcast) {
      throw new ApiError(404, "Podcast not found");
    }
    return res
      .status(200)
      .json(new ApiResponse(200, podcast, "Podcast found successfully"));
 
});

const podcastByCategory = aysncHandler(async (req, res) => {
  const { cat } = req.params;
  const normalizedCat = cat.trim(); // Normalize input to avoid whitespace issues.

  const category = await Category.findOne({ categoryName: normalizedCat }).populate({
      path: "podcasts",
      populate: {
          path: "category",
      },
  });

  if (!category) {
      throw new ApiError(404, "category not found");
  }

  const podcasts = category.podcasts;

  return res
      .status(200)
      .json(new ApiResponse(200, podcasts, "Podcasts found successfully"));
});


export { addPodcast, getPodcast, userPodcast, podcastById, podcastByCategory };
