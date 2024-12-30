import userModel from "@/models/user";
import { formatUserProfile, sendErrorResponse } from "@/utils/helper";
import { RequestHandler } from "express-serve-static-core";
import jwt from "jsonwebtoken";

 declare global {
    namespace Express {
        export interface Request{
            user: {
                id: string;
                name?: string;
                email: string;
                role : 'user'| 'author';
                avatar?: string;
                signedUp: boolean;
            }
        }
    }
 }

export const isAuth: RequestHandler = async (req, res, next) => {
  const authToken = req.cookies.authToken;
  //send error response if there is no token
  if (!authToken) {
    return sendErrorResponse({
      message: "unauthorized request",
      status: 401,
      res,
    });
  }
  //otherwise if the token is valid or signed by same server
  const paylod = jwt.verify(authToken, process.env.JWT_SECRET!) as {
    userID: string; // The payload contains the userID if the token is valid
  };

  // if the token is valid find user form the playload
  // if the token  is invalid it will throw error which we can handle
  //from inside the error middleware
  const user = await userModel.findById(paylod.userID);
  if (!user) {
    return sendErrorResponse({
      message: "unauthorized request",
      status: 401,
      res,
    });
  }

  req.user = formatUserProfile(user)
  next()
};
