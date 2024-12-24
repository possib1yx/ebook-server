import {Model, Schema, model} from "mongoose"
import {hashSync, compareSync, genSaltSync} from 'bcrypt'

interface verificationTokenDoc {
    userID : string;
    token : string;
    expires : Date
}

interface Methods {
    compare (token:string): boolean
}

const verificationTokenSchema = new Schema<verificationTokenDoc,{}, Methods>({
    userID: {
        type: String,
        required: true,

    },
    token:{
        type: String,
        required: true,
    },
    expires:{
        type: Date,
        default: Date.now(),
        expires: 60 * 60 * 24,
    },
});

verificationTokenSchema.pre('save',function(next){
    if(this.isModified('token')){
        const salt = genSaltSync(10)
        this.token = hashSync(this.token,salt)
    }
    next()
})

verificationTokenSchema.methods.compare = function(token){
    return compareSync(token ,this.token)
}


const verificationTokenModel = model("verificationToken", verificationTokenSchema)

export default verificationTokenModel as Model<verificationTokenDoc,{},  Methods>