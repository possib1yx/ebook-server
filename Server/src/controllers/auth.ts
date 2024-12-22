import { Request, Response, RequestHandler } from "express";
import crypto from "crypto";
import nodemailer from "nodemailer";

import verificationTokenModel from "@/models/verificationtoken";
import userModel from "@/models/user";
import mail from "@/routes/utils/mail";

import { link } from "fs";

export const generateAuthLink: RequestHandler = async (
  
  req: Request,
  res: Response,
  next
) => {


  try {
    const { email } = req.body;
    let user = await userModel.findOne({ email });
    if (!user) {
      user = await userModel.create({ email });
    }
  
    const userID = user._id.toString();
  
    //if we already have token for user it will remove that first
    await verificationTokenModel.findOneAndDelete({ userID });
  
    const randomToken = crypto.randomBytes(36).toString("hex");
  
    await verificationTokenModel.create<{ userID: string }>({
      userID,
      token: randomToken,
    });
  
    // Looking to send emails in production? Check out our Email API/SMTP product!
    const link = `${process.env.VERIFICAION_LINK}=${randomToken}&userID=${userID}`;
  
  
  
    await mail.sendVerificationMail({
      link,
      to: user.name,
      
    });
    // console.log(req.body);
    res.json({ message: "please check your email for link" });
    
  } catch (error) {
    next(error);
    
  }
 
};
