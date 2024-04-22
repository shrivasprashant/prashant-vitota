const express = require('express');
const router = express.Router();
const { isAuthenticated } = require("../middlewares/auth");
const { fatchOrderByUser, deleteorder, updateorder, createOrder, fatchallorder } = require('../controllers/orderController');






// post /user/singup
router.post('/create-order',isAuthenticated, createOrder)

router.post('/fatch-order/:userId',isAuthenticated, fatchOrderByUser)

router.post('/delete-order/:id',isAuthenticated, deleteorder)

router.post('/update-order/:id',isAuthenticated, updateorder)

router.get('/fatch-all-order',isAuthenticated, fatchallorder)



module.exports = router; 