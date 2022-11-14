 export default async (req, res, next) =>{
    
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.json({ error: true, message: "you are not log in" });
  }
 }