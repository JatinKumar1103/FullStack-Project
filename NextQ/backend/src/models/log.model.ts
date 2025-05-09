import mongoose, {Schema,Document} from "mongoose";

interface ILog extends Document{
    action : string;
    performedBy : Schema.Types.ObjectId;
    performedByType : string;
    affectedUserId : Schema.Types.ObjectId
}

const logSchema = new Schema<ILog>({
    action : {
        type : String,
        required : true,
        trim : true,

    }, 
    performedBy: {
        type: Schema.Types.ObjectId,
        refPath: "performedByType",
        required: true,
      },
      performedByType: {
        type: String,
        required: true,
        enum: ["User", "Admin"],
      },
    affectedUserId : {
         type : Schema.Types.ObjectId,
        ref : "User"
    }
}, {
    timestamps : true,
})

export const Log = mongoose.model<ILog>("Log", logSchema);