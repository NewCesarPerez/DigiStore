import { Router } from "express";
import passport from "passport";

import {
  getFailLogin,
  getSignup,
  getLogIn,
  getLogout,
  getFailSignUp,
  postLogin,
  postSignup,
} from "../controllers/userController.js";
const router = Router();
//router Login

router.get("/login", getLogIn);
router.post(
  "/login",
  passport.authenticate("login", { failureRedirect: "/usuario/faillogin" }),
  postLogin
);
router.get("/signup", getSignup);
router.post(
  "/signup",
  passport.authenticate("register", { failureRedirect: "/usuario/failsignup" }),
  postSignup
);
router.get("/failsignup", getFailSignUp);
router.get("/faillogin", getFailLogin);
router.get("/logout", getLogout);

export default router
