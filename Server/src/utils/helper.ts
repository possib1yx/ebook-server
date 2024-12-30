import { Response,Request } from "express";
import { userDoc } from "@/models/user";

type ErrorResponseType = {
  res: Response;
  message: string;
  status: number;
};

export const sendErrorResponse = ({
  res,
  message,
  status,
}: ErrorResponseType) => {
  res.status(status).json({ message });
};


export const formatUserProfile = (user:userDoc) : Request["user"]=>{
  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    role:user.role,
    avatar: user.avatar?.url,
    signedUp:user.signedUp,
  };
};