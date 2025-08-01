import mongoose from "mongoose"
const CustomerSchema =  mongoose.Schema({
    Names:{
    type:String,
    required: true,
    trim:true

    },
    Phone:{
        type: String,
        required:true,
        trim:true,
        // uppercase:true
    },
    Date_of_Birth:{
        type: Date,
        // required: true,
        trim:true

    },
    NationalId:{
        type: Number,
        // required: true,
        trim:true
    },
    role: {
        type:String,
        enum: ['customer'],
        required: true,
        trim:true

    },
    Email: {
        type:String,
        unique:true,
        required: true,
        trim:true

    },
    password:{
        type:String,
        required:true,
        trim:'true'
    }
})
const customerModel = await mongoose.model("Customers",CustomerSchema)
export default customerModel

 