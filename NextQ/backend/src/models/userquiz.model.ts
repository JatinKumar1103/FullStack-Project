import mongoose, {Schema, Document} from "mongoose";

interface IUserQuiz extends Document {
    userId : Schema.Types.ObjectId;
    quizId : Schema.Types.ObjectId;
    answer : string[];
    score :  number;
    startedAt : Date;
    completedAt: Date;
}

const userQuizSchema = new Schema<IUserQuiz> ({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required :true
    },
    quizId : {
        type: Schema.Types.ObjectId,
        ref: "Quiz",
        required :true
    },
    answer : {
        type : [String],
        default : []
    },
    score : {
        type : Number,
        required : true,
        default : 0
    },
    startedAt :{
        type : Date,
          
    },
    completedAt :{
        type : Date,
        default: null 
    }
}, {
    timestamps: true
})

export const UserQuiz = mongoose.model<IUserQuiz>("UserQuiz",userQuizSchema)