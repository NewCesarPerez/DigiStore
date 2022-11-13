import passportLocal from "passport-local";
import path from "path";
import config from "../config/config.js";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import bcrypt from "bcrypt";
import { loggerConsola } from "../loggerConfig.js";
import userServices from "../services/user.service.js";
import NodeMailerClass from "../services/nodeMailer.class.js";
import NodeMailerTemplatesClass from "../utils/nodemailer.templates.js";
import { type } from "os";
import carritoService from "../services/carrito.service.js";

//STRATEGY
function hashPassword(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}
const signupStrategy = new passportLocal.Strategy(
  { passReqToCallback: true },
  async (req,username, password, done) => {
    try {
      const existingUser = await userServices.getUser({ username: username });
      if (existingUser) done(null, false);
      console.log(typeof password)
      const newUser = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        address: req.body.address,
        admin: false,
        age: Number(req.body.age),
        username: username,
        password: hashPassword(password),
        telephone: req.body.telephone,
        avatar: req.body.avatar,
      };
        
      //NODEMAILER
      const nodeMailer = new NodeMailerClass(
        "Servidor node.js",
        config.ethereal.EMAIL,
        "Nuevo registro",
        NodeMailerTemplatesClass.getUserRegTemplate(newUser)
      );
      
      console.log("Ethereal email: " + config.ethereal.EMAIL);
      const info = await nodeMailer.sendEmail();
      

      loggerConsola.info(info);
      const createdUser = await userServices.createUser(newUser);
      console.log('user id: '+createdUser.id)
      const creatCart= await carritoService.createCart(createdUser.id)
      return done(null, createdUser);
    } catch (err) {
      console.log(err);
      return done(err, null);
    }
  }
);

export default signupStrategy;
