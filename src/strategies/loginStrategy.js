import passportLocal from "passport-local";

import bcrypt from "bcrypt";
import userServices from "../services/user.service.js";

function isValidPassword(reqPassword, hasshedPassword) {
  return bcrypt.compareSync(reqPassword, hasshedPassword);
}
const loginStrategy = new passportLocal.Strategy(
  { passReqToCallback: true },
  async (req, username, password, done) => {
    try {
      const userToCompare = await userServices.getUser({ username });

      if (
        !userToCompare ||
        !isValidPassword(password, userToCompare.password)
      ) {
        return done(null, false);
      }
      return done(null, userToCompare);
    } catch (err) {
      loggerErrorFile.error(err);
      done(err, null);
    }
  }
);

export default loginStrategy;
