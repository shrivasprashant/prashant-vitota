const express = require('express');
const router = express.Router();
const { isAuthenticated } = require("../middlewares/auth")
const upload = require("../utils/Multer");
const { getallproduct, getproductbyid, updateproduct, productupload } = require('../controllers/productController');

// create product

router.post('/upload-product',isAuthenticated,upload.single("images"), productupload)


router.get('/all-products',isAuthenticated, getallproduct)

router.get('/productById/:id',isAuthenticated, getproductbyid)

router.patch('/update-product/:id',isAuthenticated, updateproduct)





module.exports = router; 