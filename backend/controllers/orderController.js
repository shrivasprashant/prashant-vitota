const { catchError } = require("../middlewares/catchError")
const UserModel = require('../models/userModel')
const orderModel = require('../models/orderModel')



const ErrorHandler = require("../utils/ErrorHandler")

exports.createOrder = catchError(async (req, res, next) => {
    const order = new orderModel(req.body)
    const doc = await order.save()
    res.status(201).json(doc)
})

exports.fatchOrderByUser = catchError(async (req, res, next) => {
    const { userID } = req.params
    const orders = await orderModel.find({ user: userID })
    res.status(201).json(orders)
})



exports.deleteorder = catchError(async (req, res, next) => {
    const { id } = req.params;
    const order = await orderModel.findByIdAndDelete(id);
    res.status(200).json(order);
})

exports.updateorder = catchError(async (req, res, next) => {
    const { id } = req.params;
    const order = await orderModel.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(order);
})




exports.fatchallorder = catchError(async (req, res, next) => {

    let query = orderModel.find({ deleted: { $ne: true } })
    let totalorderQuery = orderModel.find({ deleted: { $ne: true } })

    const totaldocs = await totalorderQuery.count().exec()
    console.log({ totaldocs });

    if (req.query._sort && req.query._order) {
        query = query.sort({ [req.query._sort]: req.query._order });
        totalorderQuery = totalorderQuery.sort({ [req.query._sort]: req.query._order });

    }
    if (req.query._page && req.query._limit) {
        const pageSize = req.query._limit;
        const page = req.query._page;
        query = query.skip(pageSize * (page - 1)).limit(pageSize);
    }

    const docs = await query.exec()
    res.set("x-total-count", totaldocs)
    res.status(200).json(docs)
})



