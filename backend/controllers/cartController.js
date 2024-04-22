const { catchError } = require("../middlewares/catchError")
const UserModel = require('../models/userModel')
const categoryModel = require("../models/categoryModel")
const ProductModel = require('../models/productModel')
const cardModel = require("../models/cardModel")

const ErrorHandler = require("../utils/ErrorHandler")

exports.addToCart = catchError(async (req, res, next) => {
    const card = new cardModel(req.body)
    const doc = await card.save()
    const result = await doc.populate("product")  
    res.status(201).json(result)
})

exports.fatchCardById = catchError(async (req, res, next) => {
    const { user } = req.query
    const carditem = await cardModel.find({ user: user }).populate("user").populate("product")
    console.log(carditem);
    res.status(201).json(carditem)
})



exports.deleteCard = catchError(async (req, res, next) => {
    const { id } = req.params;
    const card = await cardModel.findByIdAndDelete(id);
    res.status(200).json(card);
})

exports.updatecard = catchError(async (req, res, next) => {
    const { id } = req.params;
    const card = await cardModel.findByIdAndUpdate(id, req.body, { new: true });
    const result = await doc.populate("product")
    res.status(200).json(result);
})

