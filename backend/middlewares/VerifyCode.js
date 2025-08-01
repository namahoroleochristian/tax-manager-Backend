export const verifyCode = async (req, res,next) => {
    const { email, role, code } = req.body;
    if (!email || !role || !code) {
        return res.status(403).json({ success: false, message: 'All fields are required' });
    }
    const foundUser = await userModel.findOne({ Email: email, role: role });
    if (!foundUser) {
        return res.status(404).json({ success: false, message: 'User not found' });
    }
    if (foundUser.VerificationCode !== code || Date.now() > foundUser.VerificationCodeExpires) {
        return res.status(400).json({ success: false, message: 'Invalid or expired verification code' });
    }
    next();
    return res.status(200).json({ success: true, message: 'Verification code is valid' });
}