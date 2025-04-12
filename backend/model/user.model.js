import mongoose from "mongoose"
const UserSchema =  mongoose.Schema({
    Names:{
    type:String,
    required: true,
    trim:true

    },
    Phone:{
        type:String,
        required:true
    },
    TIN:{
        type:String,
        unique:true,
        required:true,
        trim:true,
        uppercase:true
    },
    Date_of_Birth:{
        type: Date,
        required: true,
        trim:true

    },
    NationalId:{
        type: Number,
        required: true,
        trim:true
    },
    role: {
        type:String,
        enum: ['Vendor','admin'],
        required: true,
        trim:true

    },
    Email: {
        type:String,
        required: true,
        trim:true

    },
    password:{
        type:String,
        required:true,
        trim:'true'
    }
},{timestamps:true})
const userModel = await mongoose.model("Users",UserSchema)
export default userModel

 