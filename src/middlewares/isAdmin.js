//import user from "../daos/usuario/user.Dao.js"
import user from "../services/user.service.js";
export default async (req, res, next) => {
  const userNameToFilter = req.user.username;

  const userToCompare = await user.getUser({ username: userNameToFilter });

  const isAdmin = userToCompare.admin;
  if (isAdmin) next();
  else res.json({ mensaje: "No tienes credenciales para esta operacion" });
};
