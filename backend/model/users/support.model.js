import mongoose from "mongoose"
const SupportSchema =  mongoose.Schema({
    Names:{
    type:String,
    required: true,
    trim:true

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
        enum: ['support'],
        required: true,
        trim:true

    },
    Email: {
        type:String,
        required: true,
        trim:true

    },
    Phone: {
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
const SupportModel = await mongoose.model("Support",SupportSchema)
export default SupportModel

 