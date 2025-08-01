import mongoose from "mongoose"
const ItemSchema =  mongoose.Schema({
    Name:{
    type:String,
    required: true,
    trim:true

    },
    barcode:{
        type:String,
        required:true,
        unique:true,
    },
    Quantity:{
        type:Number,
        min:1,
        required:true,
        

    },
    unit:{
        type:String,
        enum: ["single","pack"],
        required:true
    },
    owner:{
        type: mongoose.Types.ObjectId,
        ref:'Users',
        required: true,

    },
    Sold:{
        type: Boolean,
        required: true,
        trim:true,
        default:false

    },
   
    Category: {
        type:String,
        enum: [
            "Food",
            "Processed Agricultural Product",
            "Textile",
            "Footwear",
            "Construction Material",
            "Petroleum Product",
            "Pharmaceutical",
            "Cosmetic",
            "Electronic Equipment",
            "Machinery",
            "Vehicle",
            "Furniture",
            "Paper Product",
            "Chemical",
            "Plastic Product",
            "Metal Product",
            "Wood Product",
            "Handicraft",
            "Telecommunications Equipment",
            "Renewable Energy Equipment",
            "Fertilizer",
            "Seed",
            "Livestock",
            "Mining Product",
            "Packaging Material",
            "Tobacco Product",
            "Alcoholic Beverage",
            "Soft Beverage",
            "Software (Physical Media)",
            "Second-hand Good",
            "Spare Part",
            "Office Supply",
            "Cleaning Product",
            "Safety Equipment",
            "Tool",
            "Toy"
          ],
        required: true,
        trim:true
    
    },
    Buying_price:{
        type:Number,
        min:0,
        required:true
    },
    Selling_Price:{
        type:Number,
        min:0,
        required:true
    },
    Input_VAT:{
        type:Number,
        min:0,
        required:true
    },
    Output_VAT:{
        type:Number,
        min:0,
        required:true
    },
    Payable_VAT:{
        type:Number,
        required: true
    }

},{timestamps:true})
const ItemModel = await mongoose.model("Items",ItemSchema)
export default ItemModel

 