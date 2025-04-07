import mongoose from "mongoose"
const UserSchema =  mongoose.Schema({
    name:{
    type:String,
    required: true
},
    age:{
    type:Number,
    required: true
}
})
const userModel = await mongoose.model("users",UserSchema)
export default userModel

 