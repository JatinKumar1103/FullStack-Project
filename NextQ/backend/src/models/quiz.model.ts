import mongoose,{Schema,Document} from "mongoose";

interface IQuiz extends Document{
    title : string;
    description : string;
    level: "easy" | "medium" | "hard" | "notspecify";
    count : number;
    time : number;
    questions : Schema.Types.ObjectId[];
    createdBy : Schema.Types.ObjectId;
}

const quizSchema = new Schema<IQuiz>({
    title: {
        type : String,
        required : true,
        trim : true
    },
    description: {
        type : String,
        trim: true,
        default:""
    },
    level: {
        type : String,
        enum : ["easy","medium","hard","notspecify"],
        default : "notspecify",
        required: true
    },
    count: {
        type : Number,
        required : true,
        min : 1
    },
    time: {
        type : Number,
        required : true,
        min : 1
    },
    questions : {
        type : [Schema.Types.ObjectId],
        ref: "Question",
        required:true

    },
    createdBy: {
        type : Schema.Types.ObjectId,
        ref : "User",
        required: true
    }

},{
    timestamps:true
});

export const Quiz = mongoose.model<IQuiz>("Quiz",quizSchema);