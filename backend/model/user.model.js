import mongoose from "mongoose"
const UserSchema =  mongoose.Schema({
    Names:{
    type:String,
    required: true,
    trim:true

    },
    TIN:{
        type:String,
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
        enum: ['Vendor','support','admin','customer'],
        required: true,
        trim:true

    }
})
const userModel = await mongoose.model("Users",UserSchema)
export default userModel

 