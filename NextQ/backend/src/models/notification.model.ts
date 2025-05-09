import mongoose, {Schema,Document} from "mongoose"

interface INotification extends Document {
    userId : Schema.Types.ObjectId;
    message : string,
    read : boolean,
}

const notificationSchema = new Schema<INotification>({
    userId : {
        type : Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    message : {
        type : String,
        required: true,
        default : "",
        trim : true
    },
    read : {
        type : Boolean ,
        default : false
    }
}, {
    timestamps : true
})

export const Notification = mongoose.model<INotification>("Notification",notificationSchema);