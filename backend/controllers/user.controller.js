import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
import userModel from "../model/users/user.model.js";
import customerModel from "../model/users/customer.model.js";
import SupportModel from "../model/users/support.model.js";
import moment from "moment";

dotenv.config();

export const TaxPayer_register =async (req,res) => { 
    const TaxPayer = req.body;
    const Names = TaxPayer.Names
    const Phone = TaxPayer.Phone
    // const TIN = TaxPayer.TIN.trim() tin is not User input it is generated
    const StringDOB = TaxPayer.Date_of_Birth.trim().split('/')
    // console.log(StringDOB);
    
    const day = Number(StringDOB[0])
    // console.log(day);
    
    const month = Number(StringDOB[1]) - 1
    console.log(month);
    const year = Number(StringDOB[2])
    // console.log(year);
    const Date_of_Birth =moment([year,month,day])
    Date_of_Birth.format('DD/MM/YYYY')
    // console.log(Date_of_Birth,"date");
    
    const NationalId = Number(TaxPayer.NationalId.trim())
    const role = TaxPayer.role.trim()
    const Email = TaxPayer.Email.trim()
    const password = TaxPayer.password.trim()
    if (!Names || !Date_of_Birth || !NationalId || !role || !Phone) {
        console.log("all fields are required  upon tax payer registration");
        
        return res.status(404).json({success: false,message :"all fields are required "})
    }
    if(role.toLowerCase() === 'admin'){
        return res.status(403).json({success: false,message :"can't create a user with admin role "})
    }
    const TIN = String(Math.round(Math.random() * 10**9))
    const hashed_Password = await bcrypt.hash(password,10)
    
    const newTaxPayer = new userModel({
        Names:Names,
        Phone: Phone,
        TIN:'RW-RRA-' + TIN,
        Date_of_Birth:Date_of_Birth,
        NationalId:NationalId,
        role:role,
        Email:Email,
        password:hashed_Password
    })
    try{
        await newTaxPayer.save()
        return res.status(200).json({success: true,message : "new user created "})
        
    }
    catch(error){
        console.log(error.message);
        return res.status(500).json({success: false,message: error.message})
    }
};
export const Support_Register = async (req,res) => {
    const Support = req.body;
    const Names = Support.Names

    const Phone = Support.Phone.trim()
    const StringDOB = Support.Date_of_Birth.trim().split('/')
    // console.log(StringDOB);
    
    const day = Number(StringDOB[0])
    // console.log(day);
    
    const month = Number(StringDOB[1]) - 1
    // console.log(month);
    const year = Number(StringDOB[2])
    // console.log(year);
    const Date_of_Birth =moment([year,month,day])
    Date_of_Birth.format('DD/MM/YYYY')
    
    const NationalId = Number(Support.NationalId.trim())
    const role = Support.role.trim()
    const Email = Support.Email.trim()
    const password = Support.password.trim()
    if (!Names || !Date_of_Birth || !NationalId || !role) {
        console.log("all fields are required  support registration");

        return res.status(404).json({success: false,message :"all fields are required "})
    }
    if(role.toLowerCase() === 'admin'){
        return res.status(403).json({success: false,message :"can't create admin role Go back or you may be punished"})
    }
    const hashed_Password = await bcrypt.hash(password,10)
    
    const newSupport = new SupportModel({
        Names:Names,
        Phone:Phone,
        Date_of_Birth:Date_of_Birth,
        NationalId:NationalId,
        role:role,
        Email:Email,
        password:hashed_Password
    })
    try{
        await newSupport.save()
        return res.status(201).json({success: true,message : "new user created "})
        
    }
    catch(error){
        console.log(error.message);
        return res.status(500).json({success: false,message :error.message})
    }
};
export const Customer_Register = async( req,res) => {
    const Customer = req.body;
    const Names = Customer.Names

    const Phone = Customer.Phone
    // console.log(Phone);
    // console.log("phone is up");
    
    // const TIN = Customer.TIN.trim() tin is not required for customer Users
    const StringDOB = Customer.Date_of_Birth.trim().split('/')
    // console.log(StringDOB);
    
    const day = Number(StringDOB[0])
    // console.log(day);
    
    const month = Number(StringDOB[1]) - 1
    // console.log(month);
    const year = Number(StringDOB[2])
    // console.log(year);
    const Date_of_Birth =moment([year,month,day])
    Date_of_Birth.format('DD/MM/YYYY')
    
    const NationalId = Number(Customer.NationalId.trim())
    const role = Customer.role.trim()
    const Email = Customer.Email.trim()
    const password = Customer.password.trim()
    if (!Names || !Date_of_Birth || !Phone || !role) {
        console.log("all fields are required  upon customer registration");
        
        return res.status(404).json({success: false,message :"all fields are required "})
    }
    if(role.toLowerCase() === 'admin'){
        
        console.log("can't create user with admin role Go back");
        return res.status(403).json({success: false,message :"can't create user with admin role Go back"})
    }
    const hashed_Password = await bcrypt.hash(password,10)
    
    const newCustomer = new customerModel({
        Names:Names,
        Phone:Phone,
        Date_of_Birth:Date_of_Birth,
        NationalId:NationalId,
        role:role,
        Email:Email,
        password:hashed_Password
    })
    try{
        await newCustomer.save()
        return res.status(200).json({success: true,message : "new usercreate"})
        
    }
    catch(error){
        console.log(error.message);
        return res.status(500).json({success: false,message :error.message})
    }
}
export const TaxPayer_Login = async (req,res) => {
    const credentials = req.body
    const email = credentials.email
    const password = credentials.password
    
    if (!email || !password) {
        return res.status(403).json({success:false,message: 'all fields are required'})
    }
    const foundUser =await userModel.findOne({Email:email})
    // console.log(foundUser);
    
    if(!foundUser){
        return res.status(404).json({success:false,message: 'invalid credential'})
    }
    const password_Match = await bcrypt.compare(password,foundUser.password)
    if (!password_Match) {
        return res.status(404).json({success:false,message: 'invalid credential'});
    }
    const token = jwt.sign({
        id:foundUser._id,
        role:foundUser.role
    },process.env.SECRET_KEY,
    {expiresIn:'100h'})
    
    res.cookie('jwt',token,{
        httpOnly: false,
        secure: process.env.NODE === 'production',
        sameSite:'strict',
        maxAge: 3600000 *10
    })
    res.status(200).json({success:true,message:'successfull login',token:token})
}
export const Customer_Login = async (req,res) => {
    const credentials = req.body
    const email = credentials.email
    const password = credentials.password
    console.log(password);
    
    if (!email || !password) {
        return res.status(403).json({success:false,message: 'all fields are required'})
    }
    const foundUser =await customerModel.findOne({Email:email})
    
    
    if(!foundUser){
        return res.status(404).json({success:false,message: 'invalid credential'})
    }
    const password_Match = await bcrypt.compare(password,foundUser.password)
    if (!password_Match) {
        return res.status(404).json({success:false,message: 'invalid credential'});
    }
    try{
    const token = jwt.sign({
        id:foundUser._id,
        role:foundUser.role
    },process.env.SECRET_KEY,
    {expiresIn:'100h'})
    
    res.cookie('jwt',token,{
        httpOnly: false,
        secure: process.env.NODE === 'production',
        sameSite:'strict',
        maxAge: 3600000 *10
    })
   return res.status(200).json({success:true,message:'successfull login',token:token})
}
catch(error){
    console.log(error.message);
    return res.status(500).json({success:false,message:error.message})

}
}

    export const Support_Login = async (req,res) => {
        const credentials = req.body
        const email = credentials.email
        const password = credentials.password
        if (!email || !password) {
            return res.status(403).json({success:false,message: 'all fields are required'})
        }
        const foundUser = await SupportModel.findOne({Email: email})
        if(!foundUser){
            return res.status(404).json({success:false,message: 'invalid credential'})
        }
        const password_Match = await bcrypt.compare(password,foundUser.password)
        if (!password_Match) {
            return res.status(404).json({success:false,message: 'invalid credentials '});
        }
        const token = jwt.sign({
            id:foundUser._id,
            role:foundUser.role
        },process.env.SECRET_KEY,
        {expiresIn:'100h'})
        
        res.cookie('jwt',token,{
            httpOnly: false,
            secure: process.env.NODE === 'production',
            sameSite:'strict',
            maxAge: 3600000 *10
        })
        res.status(200).json({success:true,message:'successfull login',token:token})
    }
export const forgotPassword = async (req,res) => {
    const user = req.body
    if(!user.email || !user.role){
        return res.status(403).json({success:false,message: 'all fields are required'})
    }
    
}