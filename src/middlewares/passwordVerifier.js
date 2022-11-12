export default async (req, res, next) => {
    const passwordVer=req.body.passwordVer
    const password=req.body.password
    console.log('Password 1: '+password)
    console.log('Password 2: '+passwordVer)
     
     if (passwordVer===password) next();
     else res.status(401).json({PasswordsMatch:false});
   };