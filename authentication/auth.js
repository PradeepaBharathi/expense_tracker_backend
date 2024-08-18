import jwt from 'jsonwebtoken'

export async function isAuthenticated(req,res,next){
    const token = req.headers['x-auth-token']

    if(!token){
        return res.status(400).json({ message: "Invalid Authorization" });
    }

    const decode = jwt.verify(token,process.env.SECRET_KEY)
    console.log(decode)
    next()
}