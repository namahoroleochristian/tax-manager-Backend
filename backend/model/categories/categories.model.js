import mongoose from "mongoose"
const CategoriesSchema =  mongoose.Schema({
    
   
    Categories: {
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
    

})
const Categories = await mongoose.model("Categories",CategoriesSchema)
export default Categories

 