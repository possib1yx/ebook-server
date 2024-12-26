import { sendErrorResponse } from "@/utils/helper"
import { RequestHandler } from "express-serve-static-core"
import jwt from "jsonwebtoken"

export const isAuth : RequestHandler =(req,res,next) =>{
    const authToken = req.cookies.authToken
    //send error response if there is no token
    if(!authToken){
        return sendErrorResponse({
            message: 'unauthorized request',
            status:401,
            res
        })
    }
    //otherwise if the token is valid or signed by same server
    const paylod =  jwt.verify(authToken,process.env.JWT_SECRET!) as{
            userID: string;
        
    }
    console.log(paylod)

    res.send()
}