export default async (req, res, next) => {
    const passwordVer=req.body.passwordVer
    const password=req.body.password
   
     
     if (passwordVer===password) next();
     else res.status(401).json({PasswordsMatch:false});
   };