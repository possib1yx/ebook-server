import { model,Schema } from "mongoose";


const userSchema = new Schema({
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