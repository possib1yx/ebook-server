import { generateAuthLink,verifyAuthToken,sendProileInfo } from "@/controllers/auth";
import { emailValidationSchema, validate } from "@/middlewares/validator";
import { isAuth } from "@/middlewares/auth";
import { Router } from "express";

const authRouter = Router();

authRouter.post(
  "/generate-link",
 validate(emailValidationSchema),
  generateAuthLink
);

authRouter.get("/verify",verifyAuthToken)
authRouter.get("/profile",isAuth, sendProileInfo)



export default authRouter;
