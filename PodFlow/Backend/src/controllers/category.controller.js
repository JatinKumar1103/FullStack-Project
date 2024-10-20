import { aysncHandler, ApiError, ApiResponse } from "../utils/index.js";
import {Category} from '../models/category.model.js'

const addCategory = aysncHandler(async (req,res) => {
    const {categoryName } = req.body;
    const cat = new Category({categoryName});
    await cat.save();
    return res
    .status(200)
    .json(
       new ApiResponse(200,"Category saved successfully")
    )
})

export{
    addCategory
}