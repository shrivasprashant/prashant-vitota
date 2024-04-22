const { catchError } = require("../middlewares/catchError")
const UserModel = require('../models/userModel')
const categoryModel = require("../models/categoryModel")



const ErrorHandler = require("../utils/ErrorHandler")


exports.fatchcategories = catchError(async (req, res, next) => {
    const categories = await categoryModel.find()
    res.status(201).json(categories)
})


exports.createcategories = catchError(async (req, res, next) => {
    const category = new categoryModel(req.body)
    const doc = await category.save()
    res.status(201).json(doc)
})

exports.deletecategory = catchError(async (req, res, next) => {
    const { id } = req.params;
    const category = await categoryModel.findByIdAndDelete(id);
    res.status(200).json(category);
})

exports.updatecategory = catchError(async (req, res, next) => {
    const { id } = req.params;
    const category = await categoryModel.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(category);
})



