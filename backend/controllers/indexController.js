const { catchError } = require("../middlewares/catchError")
const UserModel = require('../models/userModel')
const ProductModel = require('../models/productModel')
const QueryModel = require("../models/QueryModel")
const otpModel = require("../models/otpModel")
const { Twilio } = require("twilio");


const ErrorHandler = require("../utils/ErrorHandler")
const { sendToken } = require("../utils/sendToken")
const upload = require("../utils/Multer")
const { sendmail } = require("../utils/nodemailer")

const client = new Twilio(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);

const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};





exports.homepage = catchError(async (req, res, next) => {
  res.json({ massage: 'homepage@!' })
})

exports.usersignup = catchError(async (req, res, next) => {
  const { phoneNumber, otp } = req.body;
  let otpDocument;

  if (otp) {
    // Verify OTP if userOTP is provided
    otpDocument = await otpModel.findOne({ phoneNumber, otp });

    if (!otpDocument) {
      // Invalid OTP
      return res.status(401).json({ success: false, error: "Invalid OTP" });
    }
  } else {
    // Generate OTP if userOTP is not provided
    const otp = generateOtp();

    // Save OTP along with user's phone number
    await otpModel.create({ phoneNumber, otp });

    // Send OTP via Twilio
    await client.messages.create({
      body: `Your OTP for signup is: ${otp}`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phoneNumber
    });

    // Retrieve OTP document for verification
    otpDocument = await otpModel.findOne({ phoneNumber, otp });
  }

  // Proceed with user creation if OTP is valid
  if (otpDocument) {
    const user = await new UserModel(req.body).save();
    sendToken(user, 201, res);
  } else {
    res.status(500).json({ success: false, error: "Failed to verify OTP" });
  }
});





// exports.usersignup = catchError(async (req, res, next) => {
//   const user = await new UserModel(req.body).save();
//   //  res.status(201).json(Users)
//   sendToken(user, 201, res)
// })

exports.usersignin = catchError(async (req, res, next) => {
  const user = await UserModel.findOne({ email: req.body.email }).select("+password")
  if (!user) return next(new ErrorHandler("user not found with this email address", 404))
  const isMatch = user.comparepassword(req.body.password);
  if (!isMatch) return next(new ErrorHandler("wrong credential", 500))
  sendToken(user, 200, res)
})

exports.usersignout = catchError(async (req, res, next) => {
  res.clearCookie("token");
  res.json({ message: 'Sucessfully signOut ho gaye h0' })

})

exports.currentuser = catchError(async (req, res, next) => {
  const user = await UserModel.findById(req.id).exec()
  console.log(user);
  res.json({ user })


})

// upload.single("post"),
exports.postupload = catchError(async (req, res, next) => {
  const user = await UserModel.findById(req.id).exec()
  const postData = await ProductModel.create({
    images: req.file.filename,
    price: req.body.price,
    user: user._id,
    Description: req.body.Description,
    Productname: req.body.Productname
  })
  user.Products.push(postData._id)
  await user.save()
  res.json(user)
})

exports.studentsendmail = catchError(async function (req, res, next) {
  const student = await UserModel.findOne({ email: req.body.email }).exec()
  if (!student) return next(new ErrorHandler("user not found with this email address", 404))
  // const url = `${req.protocol}://${req.get("host")}/student/forget-link/${student._id}`
  sendmail(req, res, next)
  const queryDataData = await QueryModel.create({
    Queryemail: req.body.email,
    user: student._id,
    name: req.body.name,
    message: req.body.message
  })
  student.Queries.push(queryDataData._id)
  await student.save()
  res.json({ student })
})


exports.sendotp = catchError(async (req, res, next) => {
  const { phoneNumber } = req.body;
  const otp = generateOtp();

  await otpModel.create({ phoneNumber, otp });

  await client.messages.create({
    body: `LO BHAIYA TUMHARI OTP DIDI AA GAYI😂 ${otp}`,
    from: process.env.TWILIO_PHONE_NUMBER,
    to: phoneNumber
  });

  res.status(200).json({ success: true, message: "OTP sent successfully" });
})

