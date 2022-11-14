import path from "path";
import { fileURLToPath } from "url";

import { loggerConsola, loggerErrorFile } from "../loggerConfig.js";
import config from "../config/config.js";
import userService from "../services/user.service.js";
import axios from "axios";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



export function postLogin(req, res) {
  try {
    loggerConsola.info(
      `Petición recibida para el endpoint: /login, método: POST`
    );

    loggerConsola.info("desde el login" + req.user);
    if(req.user.admin) res.redirect("/home");
    else res.redirect("/productos")
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
export async function getHome(req, res){
  const response=await axios.post('http://localhost:3000/usuario/login')
  

}
export function getSignup(req, res) {
  try {
    loggerConsola.info(
      `Petición recibida para el endpoint: /signup, método: GET`
    );
    res.render("signup.ejs");
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
    res.render('failsignup.ejs')
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
    
    res.render("faillogin.ejs")
  } catch (error) {
    loggerConsola.error(error);
    loggerErrorFile.error(error);
  }
}
export function getLogIn(req, res) {
  try {
    
    loggerConsola.info(
      `Petición recibida para el endpoint: /login, método: GET`
    );

    res.render("login.ejs");
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
