import mongoose, {Schema, Document} from 'mongoose'

interface IAdmin extends Document{
    userId : Schema.Types.ObjectId;
    adminLevel : "superadmin" | "moderator"
}

const adminSchema = new Schema<IAdmin>({
    userId : {
        type : Schema.Types.ObjectId,
        ref: "User",
        required : true
    },
    adminLevel : {
        type : String, 
        enum : ["superadmin","moderator"],
        default: "moderator"
    }
},
{timestamps : true})

export const Admin = mongoose.model<IAdmin>("Admin", adminSchema);