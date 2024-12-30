import {
  generateAuthLink,
  verifyAuthToken,
  sendProfileInfo,
  logout,
  updateProfile,
} from "@/controllers/auth";
import { fileParser } from "@/middlewares/file";

import {
  emailValidationSchema,
  newUserSchema,
  validate,
} from "@/middlewares/validator";
import { isAuth } from "@/middlewares/auth";
import { Router } from "express";

const authRouter = Router();

authRouter.post(
  "/generate-link",
  validate(emailValidationSchema),
  generateAuthLink
);

authRouter.get("/verify", verifyAuthToken);
authRouter.get("/profile", isAuth, sendProfileInfo);
authRouter.post("/logout", isAuth, logout);
authRouter.put(
  "/profile",
  isAuth,
  fileParser,
  validate(newUserSchema),
  updateProfile
);

export default authRouter;

