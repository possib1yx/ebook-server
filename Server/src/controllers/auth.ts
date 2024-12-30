import { Request, Response, RequestHandler } from "express";
import crypto from "crypto";
import nodemailer from "nodemailer";

import verificationTokenModel from "@/models/verificationtoken";
import userModel from "@/models/user";
import mail from "@/utils/mail";
import { formatUserProfile } from "@/utils/helper";
import { sendErrorResponse } from "@/utils/helper";
import jwt from "jsonwebtoken";
import { profile } from "console";

export const generateAuthLink: RequestHandler = async (
  req: Request,
  res: Response
) => {
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

  const link = `${process.env.VERIFICAION_LINK}?token=${randomToken}&userID=${userID}`;

  await mail.sendVerificationMail({
    link,
    to: user.email,
  });
  // console.log(req.body);
  res.json({ message: "please check your email for link" });
};

export const verifyAuthToken: RequestHandler = async (req, res) => {
  const { token, userID } = req.query;

  if (typeof token !== "string" || typeof userID !== "string") {
    return sendErrorResponse({
      status: 403,
      message: "invalid request",
      res,
    });
  }
  const verificationtoken = await verificationTokenModel.findOne({ userID });
  if (!verificationtoken || !verificationtoken.compare(token)) {
    return sendErrorResponse({
      status: 403,
      message: "invalid request ,token mismatch",
      res,
    });
  }

  const user = await userModel.findById(userID);
  if (!user) {
    return sendErrorResponse({
      status: 500,
      message: "something went wrong, user not found",
      res,
    });
  }

  await verificationTokenModel.findByIdAndDelete(verificationtoken._id);

  //authentication
  const payload = { userID: user._id };

  const authToken = jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: "25d",
  });
  res.cookie("authToken", authToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    expires: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000),
  });

  res.redirect(
    `${process.env.AUTH_SUCCESS_URL}?profile=${JSON.stringify(
      formatUserProfile(user)
    )}`
  );
};


export const sendProfileInfo : RequestHandler =(req,res) => {
  res.json({
    profile: req.user,
  });
};

export const logout : RequestHandler =(req,res) => {
 res.clearCookie('authToken').send();
}
export const updateProfile: RequestHandler = async (req, res) => {
  const user = await userModel.findByIdAndUpdate(
    req.user.id,
    {
      name: req.body.name,
      signedUp: true,
    },
    {
      new: true,
    }
  );

  if (!user)
    return sendErrorResponse({
      res,
      message: "Something went wrong user not found!",
      status: 500,
    });

  // if there is any file upload them to cloud and update the database

  res.json({ profile: formatUserProfile(user) });
};