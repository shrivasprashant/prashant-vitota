const express = require('express');
const router = express.Router();
const { isAuthenticated } = require("../middlewares/auth");
const { addToCart, fatchCardById, deleteCard, updatecard } = require('../controllers/cartController');





// post /user/singup
router.post('/add-card',isAuthenticated, addToCart)

router.get('/fatch-card',isAuthenticated, fatchCardById)

router.post('/delete-card/:id',isAuthenticated, deleteCard)

router.post('/update-card/:id',isAuthenticated, updatecard)








module.exports = router; 