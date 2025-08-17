import userModel from "../model/users/user.model.js"

export const verifyCode = async (req, res,next) => {
    const { email, role, code } = req.body;
    if (!email || !role || !code) {
        return res.status(403).json({ success: false, message: 'All fields are required' });
    }
    const foundUser = await userModel.findOne({ Email: email, role: role });
    if (!foundUser) {
        return res.status(404).json({ success: false, message: 'invalid credentials not found' });
    }
    if (foundUser.VerificationCode !== code || Date.now() > foundUser.VerificationCodeExpires) {
        return res.status(400).json({ success: false, message: 'Invalid or expired verification code' });
    }
    next();
    
}
// import userModel from "../../model/users/user.model"

// const verifyCode = async (req,res,next) => {
//     const userEmail = req.body
//     const verificationCode = req.body;
//     if (!userEmail){
//         return res.status(404).json({success:false,message:'email is required'})
//     } 
//     const foundUser = await userModel.find({Email: userEmail})

//      if (!foundUser){
//         return res.status(404).json({success:false,message:'no found User'})
//     }
//     try {
//         const UserverificationCode = foundUser.VerificationCode
//         const isVerificationCodeValid = UserverificationCode == verificationCode ? true:false
//         if (isVerificationCodeValid) {
//             next()
//             return res.status(200).json({success:true,message:'Verification successful'})
//         }
//     } catch (error) {
//         return res.status(403).json({success:false,message:`error ${error.message}`})
        
//     }

// }
