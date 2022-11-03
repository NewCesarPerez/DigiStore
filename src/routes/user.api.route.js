import { Router } from "express";
import passport from "passport";

import {
  getFailLogin,
  getSignup,
  getLogIn,
  getLogout,
  getFailSignUp,
  postLogin,
  postApiLogin,
  postSignup,
} from "../controllers/userController.js";
const router = Router();
//router Login

router.post(
    "/api/login",
    passport.authenticate("login", { failureRedirect: "/usuario/faillogin" }),
    postApiLogin
  );

  export default router