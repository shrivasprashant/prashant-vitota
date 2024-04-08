const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    orderItems:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "orderitems"
    }],

    orderDate:[{
        type:Date,
        required:true,
        default:Date.now()
    }],

    deliveryDate:{
        type:Date
    },
    shipingAddress:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "addresses"
    },

    paymentDetails:{
        paymentMethod:{
            type:String,
        },
        transactionId:{
            type:String
        },
        paymentId:{
            type:String
        },
        paymentStatus:{
            type:String,
            default:"pending"
        },
    },

    totalPrice:{
        type:Number,
        required:true
    },

    totalDiscountedPrice:{
        type:Number,
        required:true
    },

    discounte:{
        type:Number,
        required:true
    },

    orderStatus:{
        type:String,
        required:true,
        default:"pending"
    },

    totalitem:{
        type:Number,
        required:true
    },

    createdAt:{
        type:Date,
        default:Date.now()
    }

});
const order =  mongoose.model("orders", ProductSchema);
module.exports = order
