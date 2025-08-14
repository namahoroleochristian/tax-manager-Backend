import mongoose from "mongoose";
import ItemModel from "../model/items/item.model.js";




export const createItem = async (req,res ) => { 
       const {user} = req.user;
  if (!user) {
    return res.status(403).json({success: false, message: "not authorized"})
  }
  else if(user.role !== "Vendor"){
    return res.status(403).json({success: false, message: "not authorized"})
  }
    const ItemData = req.body
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(403).json({success: false, message:"invalid user Id in the URI"})
    }
    if(!ItemData.name || !ItemData.barcode || !ItemData.quantity || !ItemData.unit  || !id || !ItemData.sold || !ItemData.category || !ItemData.buyingPrice || !ItemData.sellingPrice){
        return res.status(403).json({success:false,message: 'all fields are not full'})
    }
    const Input_VAT = ItemData.buyingPrice * 0.18
    const Output_VAT = ItemData.sellingPrice * 0.18
    
    const Payable_VAT = Output_VAT - Input_VAT
    if(Payable_VAT < 0){
        return res.status(403).json({success:false,message: 'forbidden for selling price to be lower than buying price'})
    }
   
    const newItem = await ItemModel({
        Name:ItemData.name,
        barcode:ItemData.barcode,
        Quantity:ItemData.quantity,
        unit:ItemData.unit,
        owner: id,
        Sold:ItemData.sold,
        Category:ItemData.category,
        Buying_price:Number(ItemData.buyingPrice),
        Selling_Price:Number(ItemData.sellingPrice),
        Input_VAT:Number(Input_VAT),
        Output_VAT:Number(Output_VAT),
        Payable_VAT:Number(Payable_VAT)
    })
    try{
        await newItem.save()
        return res.status(200).json({success: true,message: "item created"})
    }
    catch(error){
        console.log(error.message);
        
        res.status(500).json({success:false,message: error.message})
    }


}

export const deleteItem = async (req,res) => {
       const {user} = req.user;
  if (!user) {
    return res.status(403).json({success: false, message: "not authorized"})
  }
  else if(user.role !== "Vendor"){
    return res.status(403).json({success: false, message: "not authorized"})
  }
    const {id} = req.params
     if(!id){
        return res.status(404).json({success:false,message:"no Id provided in the URI"})
     }

     if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(403).json({success:false,message:'the Id is invalid'})
     }

     try {
       const result= await ItemModel.findByIdAndDelete(id)
        res.status(204).json({success: true,message:'item deleted successfully'})
    }
    catch(error){
        console.log(error.message);
        return res.status(500).json({success:false, message: error.message})
    }
    
}
export const updateItem = async (req,res) => { 
    const {id} = req.params
    const newData = req.body
    if(!id){
        return res.status(400).json({success:false,message:'Id not provided in the URI'})
    }
    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(403).json({success:false,message:'the Id is invalid'})
    }
    if(!newData.name || !newData.barcode || !newData.quantity || !newData.unit  || !id || !newData.sold || !newData.category || !newData.buyingPrice || !newData.sellingPrice){
        return res.status(403).json({success:false,message: 'all fields are not full'})
    }
    
    try {
        await ItemModel.findByIdAndUpdate(id,newData,{new:true,runValidators:true})
        res.status(201).json({success: true,message:'item updated successfully'})

    } catch (error) {
        console.log(error.message);
    return res.status(500).json({success:false,message: error.message})
    }



}
export  const getItems = async (req,res) => {
    const {user} = req.user;
  if (!user) {
    return res.status(403).json({success: false, message: "not authorized"})
  }
  else if(user.role !== "Vendor"){
    return res.status(403).json({success: false, message: "not authorized"})
  }
  try {
    const id = user._id;
    const items = await ItemModel.find({ownerId:id})
   return res.json({items})
  } catch (error) {
    return res.status(500).json({success:false,message:error.message})
  }
}