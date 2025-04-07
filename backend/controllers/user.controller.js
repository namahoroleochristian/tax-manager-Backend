import bcrypt from "bcryptjs";
import userModel from "../model/user.model.js";
import customerModel from "../model/customer.model.js";

export const TaxPayer_register =async (req,res) => { 
    const TaxPayer = req.body;
    const Names = TaxPayer.Names
    // const TIN = TaxPayer.TIN.trim() tin is not User in put it is generated
    const StringDOB = TaxPayer.Date_of_Birth.trim().split('/')
    console.log(StringDOB);
    
    const day = Number(StringDOB[0])
    console.log(day);
    
    const month = Number(StringDOB[1]) - 1
    console.log(month);
    const year = Number(StringDOB[2])
    console.log(year);
    const Date_of_Birth =new Date(year,month,day)
    console.log(Date_of_Birth);
    
    const NationalId = Number(TaxPayer.NationalId.trim())
    const role = TaxPayer.role.trim()
    const Email = TaxPayer.Email.trim()
    const password = TaxPayer.password.trim()
    if (!Names || !Date_of_Birth || !NationalId || !role) {
        return res.status(403).json({success: false,message :"all fields are required "})
    }
    if(role.toLowerCase() === 'admin'){
        return res.status(403).json({success: false,message :"can't create admin role Go back or you may be punished"})
    }
    const TIN = String(Math.round(Math.random()* 10**9))
    const hashed_Password = await bcrypt.hash(password,10)
    
    const newTaxPayer = new userModel({
        Names:Names,
        TIN:'RW-RRA-' + TIN,
        Date_of_Birth:Date_of_Birth,
        NationalId:NationalId,
        role:role,
        Email:Email,
        password:hashed_Password
    })
    try{
        await newTaxPayer.save()
        return res.status(200).json({success: true,message : "new usercreate"})
        
    }
    catch(error){
        return res.status(500).json({success: false,message :error.message})
    }
};
const Support_Register = async (req,res) => {
    
};
export const Customer_Register = async( req,res) => {
    const Customer = req.body;
    const Names = Customer.Names
    const Phone = Customer.Phone
    // const TIN = Customer.TIN.trim() tin is not User in put it is generated
    const StringDOB = Customer.Date_of_Birth.trim().split('/')
    console.log(StringDOB);
    
    const day = Number(StringDOB[0])
    console.log(day);
    
    const month = Number(StringDOB[1]) - 1
    console.log(month);
    const year = Number(StringDOB[2])
    console.log(year);
    const Date_of_Birth =new Date(year,month,day)
    console.log(Date_of_Birth);
    
    const NationalId = Number(Customer.NationalId.trim())
    const role = Customer.role.trim()
    const Email = Customer.Email.trim()
    const password = Customer.password.trim()
    if (!Names || !Date_of_Birth || !Phone || !role) {
        return res.status(403).json({success: false,message :"all fields are required "})
    }
    if(role.toLowerCase() === 'admin'){
        return res.status(403).json({success: false,message :"can't create admin role Go back or you may be punished"})
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
        return res.status(500).json({success: false,message :error.message})
    }
}
