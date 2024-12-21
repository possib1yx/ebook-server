import { Request, Response, RequestHandler } from "express";
import crypto from 'crypto';
import verificationTokenModel from "@/models/verificationtoken";
import userModel from "@/models/user";


export const generateAuthLink: RequestHandler =async (req:Request, res: Response) => {

 const {email} = req.body
 let user = await userModel.findOne({email});
 if(!user){
  user = await userModel.create({email})
 }
 
 
  const randomToken =  crypto.randomBytes(36).toString("hex")

  await verificationTokenModel.create<{userId: string}>({
  userID: user._id.toString(),
  token: randomToken,
 })
  console.log(req.body);
  res.json({ ok: true });
};
  