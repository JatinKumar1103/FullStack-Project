import mongoose, {Schema} from 'mongoose'

const podcastSchema = new Schema(
    {
        frontImage:{
            type:String,
            required:true,
            unique:true
        },
        audioFile:{
            type:String,
            required:true,
            unique:true
        },
        title:{
            type:String,
            required:true,
            unique:true
        },
        description:{
            type:String,
            required:true,
            unique:true
        },
        user:{
            type:Schema.Types.ObjectId,
            ref:'User'
        },
        category:{
            type:Schema.Types.ObjectId,
            ref:'Category'
        }

    },
    {
        timestamps: true
    }
)

export const Podcast = mongoose.model('Podcast', podcastSchema)