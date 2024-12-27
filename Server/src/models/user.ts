import { model,ObjectId,Schema } from "mongoose";
import { object, string } from "zod";

export interface userDoc {
    _id:ObjectId;
    email: string;
    role: "user" | "author";
    name?: string;
    signedUp: boolean;
    avatar?:{url:string; id: string} 
}


const userSchema = new Schema<userDoc>({
    name: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
    },
    role: {
        type: String,
        enum: ['user','author'],
        default: "user",
    },
    signedUp: {
        type: Boolean,
        default: false
    },
    avatar: {
        type: Object,
        url: String,
        id: String,
    }

});

const userModel =  model("user", userSchema)
export default userModel