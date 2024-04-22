const express = require('express');
const router = express.Router();
const { isAuthenticated } = require("../middlewares/auth");
const { createcategories, fatchcategories, deletecategory, updatecategory } = require('../controllers/categoryController');






// post /user/singup
router.post('/create-category',isAuthenticated, createcategories)

router.get('/fatch-category',isAuthenticated, fatchcategories)

router.post('/delete-category/:id',isAuthenticated, deletecategory)

router.post('/update-category/:id',isAuthenticated, updatecategory)




module.exports = router; 