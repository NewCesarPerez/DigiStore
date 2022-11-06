 
 export default async (req, res, next) =>{
    console.log('desde el checkouth '+req.isAuthenticated());
  if (req.isAuthenticated()) {
    
    return next();
  } else {
    res.json({ error: true, message: "you are not log in" });
  }
 }