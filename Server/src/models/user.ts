import { model,ObjectId,Schema } from "mongoose";

export interface userDoc {
    _id:ObjectId;
    email: string;
    role: "user" | "author";
    name?: string;
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

});

const userModel =  model("user", userSchema)
export default userModel