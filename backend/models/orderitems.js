const mongoose = require("mongoose");

const orderitemSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "products",
        required:true
    },

    size:{
        type:String
    },

    quantity:{
        type:Number,
        required:true
    },

    price: {
        type: Number,
        required: true,
    },

    DiscountedPrice:{
        type:Number,
        required:true
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    // deliveryDate:{
    //     type:date
    // }
    
});
const orderItem =  mongoose.model("orderitems", orderitemSchema);

module.exports = orderItem
