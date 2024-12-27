import { generateAuthLink,verifyAuthToken,sendProileInfo, logout ,updateProfile} from "@/controllers/auth";
import { fileParser } from "@/middlewares/file";

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
authRouter.post("/logout",isAuth, logout)
authRouter.put("/logout", fileParser, isAuth, validate(), updateProfile)



export default authRouter;
