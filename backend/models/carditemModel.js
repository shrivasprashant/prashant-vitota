const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
    cart:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"cart",
        required:true
    }],

    product:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"product",
        required:true
    }],

    size:{
        type:String,
        required:true
    },

    Price: {
        type: Number,
        required: true,
        default:0
    },

    DiscountPrice: {
        type: Number,
        required: true,
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
});


const  CartItem =  mongoose.model("cartItems", cartItemSchema);
module.exports = CartItem
