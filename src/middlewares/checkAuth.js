 export default async (req, res, next) =>{
    console.log(req.session.user);
    console.log('is auth?'+req.isAuthenticated())
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.json({ error: true, message: "you are not log in" });
  }
 }