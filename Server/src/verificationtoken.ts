import {Schema, model} from "mongoose"
import { string } from "zod"


const verificationTokenSchema = new Schema({
    userID: {
        type: String,
        required: true

    },
    token:{
        type: string,
        required: true
    },
    expires:{
        type: Date,
        default: Date.now(),
        expires: 60 * 60 * 24
    },
});


const verificationTokenModel = model("verificationToken", verificationTokenSchema)

export default verificationTokenModel