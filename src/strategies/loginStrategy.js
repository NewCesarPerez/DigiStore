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
      
      //const userToCompare= await user.findOne({username})
      console.log(username)
      console.log(userToCompare.firstName)

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
    }
  }
);

export default loginStrategy;
