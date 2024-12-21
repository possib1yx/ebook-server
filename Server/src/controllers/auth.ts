import { Request, Response, RequestHandler } from "express";
import crypto from 'crypto';


export const generateAuthLink: RequestHandler = (req:Request, res: Response) => {

 const randomToken =  crypto.randomBytes(36).toString("hex")
  console.log(req.body);
  res.json({ ok: true });
};
  