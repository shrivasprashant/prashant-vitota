const { catchError } = require("../middlewares/catchError")
const UserModel = require('../models/userModel')
const ProductModel = require('../models/productModel')



const ErrorHandler = require("../utils/ErrorHandler")






// upload.single("post"),
exports.productupload = catchError(async (req, res, next) => {
  const product = new ProductModel(req.body)
  product.images = req.file.filename;
  const response = await product.save()
  console.log(response);
  res.json(response)
})

exports.getallproduct = catchError(async (req, res, next) => {
  let condition = {}
  if(!req.query.admin){
    condition.deleted = {$ne:true}
  }
  let query = ProductModel.find(condition)
  let totalProductQuery = ProductModel.find(condition)


  if (req.query.category) {
    query = query.find({ category: req.query.category });
    totalProductQuery = totalProductQuery.find({ category: req.query.category });

  }

  if (req.query.brand) {
    query = query.find({ brand: req.query.brand });
    totalProductQuery = totalProductQuery.find({ brand: req.query.brand });

  }

  const totaldocs = await totalProductQuery.count().exec()
  console.log({ totaldocs });

  if (req.query._sort && req.query._order) {
    query = query.sort({ [req.query._sort]: req.query._order });
    totalProductQuery = totalProductQuery.sort({ [req.query._sort]: req.query._order });

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

exports.getproductbyid = catchError(async (req, res, next) => {
  const { id } = req.params;
  const product = await ProductModel.findById(id);
  res.status(200).json(product);
})

exports.updateproduct = catchError(async (req, res, next) => {
  const { id } = req.params;
  const product = await ProductModel.findByIdAndUpdate(id, req.body , {new:true});
  res.status(200).json(product);
})


