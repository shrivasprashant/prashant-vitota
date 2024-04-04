const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  productname: {
    type: String
  },
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
  },
  price: {
    type: Number,
    required: true,
  },
  images: String,
  Description: String,
});
module.exports = mongoose.model("Product", ProductSchema);
