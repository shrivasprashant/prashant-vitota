const express = require('express');
const { homepage, usersignout, usersignup, usersignin, postupload, currentuser, studentsendmail, sendotp } = require('../controllers/indexController');
const router = express.Router();
const { isAuthenticated } = require("../middlewares/auth")
const upload = require("../utils/Multer")



router.get('/', isAuthenticated, homepage)

// post /user/singup
router.post('/user/signup', usersignup)

router.post('/user/send-otp', sendotp)


router.post('/user/currentuser',isAuthenticated, currentuser)


// post /user/singup
router.post('/user/signin', usersignin)

// /user/singOut
router.get('/user/signout',isAuthenticated, usersignout)

router.post('/user/uploadpost',isAuthenticated,upload.single("images"), postupload)



// student/send mail link

router.post("/user/send-mail", studentsendmail)




module.exports = router; 