import mongoose, {Schema, SchemaTypes} from 'mongoose'

const categorySchema = new Schema(
    {
        categoryName:{
            type:String,
            required:true,
            unique:true
        },
        podcasts:[{
            type:Schema.Types.ObjectId,
            ref:'Podcast'
        }]
    },
    {
        timestamps: true
    }
)

export const Category = mongoose.model('Category', categorySchema)