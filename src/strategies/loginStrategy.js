import passportLocal from "passport-local";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import bcrypt from "bcrypt";
import userServices from "../services/user.service.js";
//import user from "../daos/usuario/user.Dao.js"

function isValidPassword(reqPassword, hasshedPassword) {
  return bcrypt.compareSync(reqPassword, hasshedPassword);
}
const loginStrategy = new passportLocal.Strategy(
  { passReqToCallback: true },
  async (req, username, password, done) => {
    try {
      
      const userToCompare = await userServices.getUser({username});

      if (
        !userToCompare ||
        !isValidPassword(password, userToCompare.password)
      ) {
        return done(null, false);
      }
      return done(null, userToCompare);
    } catch (err) {
      console.log(err);
      done(err, null);
    }finally{
      console.log('auth deesde loginstr'+req.isAuthenticated())
    }
  }
  
);

export default loginStrategy;
