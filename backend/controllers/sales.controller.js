import SaleModel from '../model/sales/sales.model.js';
import userModel from "../model/users/user.model.js";
import ItemModel from '../model/items/item.model.js'; 
import mongoose from 'mongoose';
import { request } from 'express';

export const createSaleByBarcode = async (req, res) => {

  const user = req.user;
  if (!user) {
    return res.status(403).json({success: false, message: "not authorized"})
  }
  else if(user.role !== "Vendor"){
    return res.status(403).json({success: false, message: "not authorized"})
  }
  try {
    const { customerPhoneNumber, barcode, paymentMethod } = req.body;

 
    const customer = await userModel.findOne({ phoneNumber: customerPhoneNumber });
    if (!customer) {
    //   return res.status(404).json({ message: "Customer with provided phone number not found." });
    console.log("phone nbr not found");
    
    }

    let barcodesToProcess = [];
    if (Array.isArray(barcode)) {
      barcodesToProcess = barcode;
    } else if (typeof barcode == 'string' && barcode.trim() !== '') {
      barcodesToProcess = [barcode.trim()];
    } else {
      return res.status(400).json({ message: "Barcode(s) not provided or invalid format." });
    }

    const saleItemsData = [];
    let totalAmount = 0;
    const itemUpdates = [];
    const notFoundBarcodes = [];

    for (const currentBarcode of barcodesToProcess) {
      const item = await ItemModel.findOne({ barcode: currentBarcode });
      if (!item) {
        notFoundBarcodes.push(currentBarcode);
        continue; 
      }

      if (item.Quantity < 1) {
        console.log(`Item "${item.Name}" with barcode "${currentBarcode}" is out of stock.` );
        
        return res.status(400).json({ message: `Item "${item.Name}" with barcode "${currentBarcode}" is out of stock.` });
      }

      saleItemsData.push({
        barcode:currentBarcode,
        item: item._id,                                                             
        quantitySold: 1,
        sellingPriceAtSale: item.Selling_Price,
      });
      totalAmount += item.Selling_Price;

      itemUpdates.push({
        updateOne: {
          filter: { _id: item._id },
          update: { $inc: { Quantity: -1 } },
        },
      });
    }

    if (saleItemsData.length === 0 && notFoundBarcodes.length > 0) {
      return res.status(404).json({ message: `No items found for barcodes: ${notFoundBarcodes.join(', ')}.` });
    }

   
    const newSale = new SaleModel({
      customerPhone: customerPhoneNumber,
      itemsSold: saleItemsData,
      totalAmount: totalAmount,
      paymentMethod: paymentMethod || 'cash',
    });

    const savedSale = await newSale.save();

    
    if (itemUpdates.length > 0) {
      await ItemModel.bulkWrite(itemUpdates);
    }

    const responseData = {
      sale: savedSale,
      notFoundBarcodes: notFoundBarcodes.length > 0 ? notFoundBarcodes : undefined,
    };

    res.status(201).json(responseData);
  } catch (error) {
    console.error("Error creating sale by barcode(s):", error);
    res.status(500).json({ message: "Failed to create sale by barcode(s).", error: error.message });
  }
};
export const deleteSaleByBarcode = async (req, res) => {
  const user = req.user;
  if(!user){
    return res.status(403).json({success:false,message:"unauthorised to do delete"})
  }
  if(user.role !== 'Vendor'){
    return res.status(403).json({success:false,message:"unauthorised to do so"})
  }
  const id = request.params;
  if(!id){
  return res.status(404).json({success:false,message:"no Id found"})
}
if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({success:false,message:"No valid Id found"})
    
  }
  try{
    await SaleModel.findByIdAndDelete(id);
    return res.status(200).json({success:true,message:"item deleted successfully"})
  }
  catch(error){
    console.log(error.message);
    return res.status(500).json({success:false,message:error.message})
  }};

export const getSaleByBarcode = async (req,res) => {
  try {
    
    const {user}= req.user;
    const {barcode}= req.body;
    if (!user) {
      return res.status(403).json({success: false, message: "not authorized"})
  }
  else if(user.role !== "Vendor"){
    return res.status(403).json({success: false, message: "not authorized"})
  }
   let barcodesToProcess = [];
   const saleItemsData = [];
   
    if (Array.isArray(barcode)) {
      barcodesToProcess = barcode;
       for (const currentBarcode of barcodesToProcess) {
      const item = await ItemModel.findOne({ barcode: currentBarcode });
      if (!item) {
        notFoundBarcodes.push(currentBarcode);
        continue; 
      }

    }
  } else if (typeof barcode == 'string' && barcode.trim() !== '') {
    barcodesToProcess = [barcode.trim()];
    const item = await ItemModel.findOne({ barcode: currentBarcode });
    
  } else {
    return res.status(400).json({ message: "Barcode(s) not provided or invalid format." });
  }
} catch (error) {
    return res.status(500).json({success:false,message:error.message})
  
}
    
 
  
}
export const getSales =  async (req,res)=>{
  const {user} = req.user;
  if (!user) {
    return res.status(403).json({success: false, message: "not authorized"})
  }
  else if(user.role !== "Vendor"){
    return res.status(403).json({success: false, message: "not authorized"})
  }
  try {
    const id = user._id;
    const sales = await SaleModel.find({ownerId:id})
   return res.json({sales})
  } catch (error) {
    return res.status(500).json({success:false,message:error.message})
  }

}