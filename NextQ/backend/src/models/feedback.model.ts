import mongoose, {Schema, Document} from "mongoose";

interface IFeedback extends Document {
    userId : Schema.Types.ObjectId;
    quizId : Schema.Types.ObjectId;
    rating : 1| 2 | 3| 4 |5;
    comment : string;
}

const feedbackSchema = new Schema<IFeedback>({
    userId : {
        type : Schema.Types.ObjectId,
        ref : "User",
        required: true
    },
    quizId : {
        type : Schema.Types.ObjectId,
        ref : "Quiz",
        required: true
    },
    rating : {
        type : Number,
        enum : [1,2,3,4,5],
        default : 1
    },
    comment : {
        type : String,
        trim : true,
        default : ""
    }

},
{
    timestamps : true
})

export const Feedback = mongoose.model<IFeedback>("Feedback",feedbackSchema)