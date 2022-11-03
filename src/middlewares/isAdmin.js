//import user from "../daos/usuario/user.Dao.js"
import user from "../services/user.service.js"
export default async (req, res, next) => {
 const userNameToFilter=req.user.username
 console.log(userNameToFilter)
  const userToCompare=await user.getUser({username:userNameToFilter})
  console.log(userToCompare)
  const isAdmin=userToCompare.admin
  if (isAdmin) next();
  else res.json({mensaje:"No tienes credenciales para esta operacion"});
};
