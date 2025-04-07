import express from "express";
import dotenv from 'dotenv';

import userModel from "./model/user.model.js";
import connectDB from "./config/db.js";

dotenv.config()
const app = express()

const PORT = process.env.PORT

connectDB()

app.use(express.json())

app.listen(PORT,async ()=>{
    console.log(`app running on http://localhost:${PORT}`)

    
   

})
    


app.post('/register',async (req,res) => {
    const user = req.body
     

     if(!user.name || !user.age){
        return res.status(400).json({
            success: false,
            message:'the data was empty'
        })
     }
     const newUser =new userModel(user)
     try{
        await newUser.save()
        res.status(200).json({
            success: true,
            message: newUser
        })
     }
     catch(error){
        return res.status(400).json({
            success:false,
            message : error.message
        })
     }
   
   
})
