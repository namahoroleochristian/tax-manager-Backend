import mongoose from "mongoose";
import ItemModel from "../items/item.model.js";

const SaleSchema = new mongoose.Schema({
  ownerId: {
    type: mongoose.Types.ObjectId,
    ref: 'Users'
  },
  saleId: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    default: () => Math.random().toString(36).substring(2, 15).toUpperCase(),
  },

  saleDate: {
    type: Date,
    default: Date.now,
  },
  customer: {
    type: mongoose.Types.ObjectId,
    ref: 'Users',
    // required: true,
  },

  customerPhone: {
    type: String,
    // ref: 'Users', 
    required: true,
  },
  itemsSold: [{
    item: {
      type: mongoose.Types.ObjectId,
      ref: 'Items',
      required: true,
    },
    quantitySold: {
      type: Number,
      required: true,
      min: 1,
    },
    sellingPriceAtSale: {
      type: Number,
      required: true,
      min: 0,
    },
  }],
  totalAmount: {
    type: Number,
    required: true,
    min: 0,
  },
  paymentMethod: {
    type: String,
    default: 'cash',
    enum: ['cash', 'credit_card', 'mobile_money', 'other'],
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'refunded', 'failed'],
    default: 'paid',
  },

});


SaleSchema.pre('save', function (next) {
  this.totalAmount = this.itemsSold.reduce((sum, item) => sum + (item.quantitySold * item.sellingPriceAtSale), 0);
  this.updatedAt = new Date();
  next();
}, { timestamps: true });

const SaleModel = mongoose.model("Sales", SaleSchema);
export default SaleModel;