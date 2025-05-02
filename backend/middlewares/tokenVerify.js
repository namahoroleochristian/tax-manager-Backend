import jwt from 'jsonwebtoken'

import dotenv from 'dotenv';
dotenv.config()


export const tokenVerify  = async (req,res,next) => { 
    const token =req.cookies.jwt;
    console.log(token);
    
    if(!token){
        return res.status(404).json({success:false, message:'token not found'})
    }
    try {
        await jwt.verify(token,process.env.SECRET_KEY,(err,decoded) => {
            if(err){
                res.status(403).json({success: false,message:"token is invalid hence unauthorised"})
            }
            req.user = decoded
            next();
        })
    } catch (error) {
        res.status(500).json({success: false,message:error.message})
        
    }
}
