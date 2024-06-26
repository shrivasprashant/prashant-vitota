const express = require('express');
const { homepage, usersignout, usersignup, usersignin,  currentuser, studentsendmail, sendotp, alluser,  ratings, review, category,  updateuser } = require('../controllers/indexController');
const router = express.Router();
const { isAuthenticated } = require("../middlewares/auth")
const upload = require("../utils/Multer")



router.get('/', isAuthenticated, homepage)

// post /user/singup
router.post('/user/signup', usersignup)

router.post('/user/send-otp', sendotp)


router.post('/user/currentuser',isAuthenticated, currentuser)

router.post('/user/alluser', alluser)



// post /user/singup
router.post('/user/signin', usersignin)

// /user/singOut
router.get('/user/signout',isAuthenticated, usersignout)

router.post('/user/createcategory',isAuthenticated, category)


router.patch('/user/updateuser/:id',isAuthenticated, updateuser)







// router.post('/user/rating',isAuthenticated, ratings)

router.post('/user/review',isAuthenticated, review)



// student/send mail link

router.post("/user/send-mail", studentsendmail)




module.exports = router; 