import path from "path";
import { fileURLToPath } from "url";
import userService from "../services/user.service.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import { loggerConsola, loggerErrorFile } from "../loggerConfig.js";
import config from "../config/config.js";

export function getSignup(req, res) {
  try {
    loggerConsola.info(
      `Petición recibida para el endpoint: /signup, método: GET`
    );
    res.sendFile(path.join(__dirname, "../views/signup.html"));
  } catch (error) {
    loggerConsola.error(error);
    loggerErrorFile.error(error);
  }
}

export function postLogin(req, res) {
  try {
    loggerConsola.info(
      `Petición recibida para el endpoint: /login, método: POST`
    );

    loggerConsola.info("desde el login" + req.user);
    res.redirect("/home");
  } catch (error) {
    loggerConsola.error(error);
    loggerErrorFile.error(error);
  }
}

export async function postApiLogin(req, res) {
  try {
    loggerConsola.info(
      `Petición recibida para el endpoint: /login, método: POST`
    );

    const userToCompare = await userService.getUser({
      username: req.user.username,
    });

    
    loggerConsola.info("desde el login" + req.user);
    if(userToCompare.admin) res.json({ status: 200, existence: true, admin:true });
    else res.json({ status: 200, existence: true, admin:false });
  } catch (error) {
    loggerConsola.error(error);
    loggerErrorFile.error(error);
  }
}

export function postSignup(req, res) {
  try {
    loggerConsola.info(
      `Petición recibida para el endpoint: /signup, método: POST`
    );
    let user = req.user;

    res.redirect("usuario/login");
  } catch (error) {
    loggerConsola.error(error);
    loggerErrorFile.error(error);
  }
}

export function getFailSignUp(req, res) {
  try {
    loggerConsola.info(
      `Petición recibida para el endpoint: /failsignup, método: GET`
    );
    res.sendFile(path.join(__dirname, "../views/failsignup.html"));
  } catch (error) {
    loggerConsola.error(error);
    loggerErrorFile.error(error);
  }
}
export function getFailLogin(req, res) {
  try {
    loggerConsola.info(
      `Petición recibida para el endpoint: /faillogin, método: GET`
    );
    res.sendFile(path.join(__dirname, "../views/faillogin.html"));
  } catch (error) {
    loggerConsola.error(error);
    loggerErrorFile.error(error);
  }
}
export function getLogIn(req, res) {
  try {
    console.log(config.ethereal.EMAIL);
    loggerConsola.info(
      `Petición recibida para el endpoint: /login, método: GET`
    );
    res.sendFile(path.join(__dirname, "../views/login.html"));
  } catch (error) {
    loggerConsola.error(error);
    loggerErrorFile.error(error);
  }
}
export function getLogout(req, res) {
  try {
    loggerConsola.info(
      `Petición recibida para el endpoint: /logout, método: GET`
    );
    req.logout((err) => {
      if (err) {
        return res.json({ error: true, message: err });
      }
      res.redirect("/");
    });
  } catch (error) {
    loggerConsola.error(error);
    loggerErrorFile.error(error);
  }
}
