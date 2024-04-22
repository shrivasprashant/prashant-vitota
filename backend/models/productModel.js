const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({

  title: {
    type: String,
    required: true
  },

  Description: {
    type: String,
    required: true
  },

  price: {
    type: Number,
    required: true,
    min: [0, "wrong min price"]
  },

  discountepersent: {
    type: Number,
    min: [1, "wrong min percent"],
    mix: [99, "wrong max percent"],
  },

  rating: {
    type: Number,
    min: [1, "wrong min rating"],
    mix: [5, "wrong max rating"],
  },

  stock: {
    type: Number,

  },

  brand: {
    type: String,
    required: true
  },

  
  category: {
    type: String,
    required:true
  },
  
  // thumbnail:{
  //   type:String,
  //   required:true
  // },
  
  images: {
    type: [String]
  },
  
  
  deleted: {
    type: Boolean,
    default:false
  },

  sizes: {
    type: [mongoose.Schema.Types.Mixed],
  },

  highlights: {
    type: [String],
  },


  // user: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "User"
  // },
  
  // reviews: [{
    //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "reviews"
  // }],

  // numRatings: {
  //   type: Number,
  //   default: 0
  // },

});

// const virtualId  = ProductSchema.virtual('id');
// virtualId.get(function(){
//     return this._id;
// })

// ProductSchema.set('toJSON',{
//     virtuals: true,
//     versionKey: false,
//     transform: function (doc,ret) { delete ret._id}
// })


const product = mongoose.model("Product", ProductSchema);

module.exports = product
