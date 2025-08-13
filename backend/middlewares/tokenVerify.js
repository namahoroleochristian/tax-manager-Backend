import jwt from 'jsonwebtoken'

import dotenv from 'dotenv';
dotenv.config()


export const tokenVerify  = async (req,res,next) => { 
    // for this code to work on mobile we user req.body insteady of req.cookies as mobile apps don't have cookies
    const token = req.cookies.jwt || req.body;
    console.log(token);
    
    if(!token){
        return res.status(404).json({success:false, message:'token not found'})
    }
    try {
         jwt.verify(token,process.env.SECRET_KEY,(err,decoded) => {
            if(err){
                res.status(403).json({success: false,message:"token is invalid hence unauthorised"})
            }
            // sends as decoded user to the next handler inline this allows that handler to verify the decoded User  
            req.user = decoded
            
            next();
        })
    } catch (error) {
        res.status(500).json({success: false,message:error.message})
        
    }
}
