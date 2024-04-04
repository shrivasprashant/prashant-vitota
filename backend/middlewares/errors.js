// const { stack } = require("../routes/indexRoutes")

exports.genetatedErrors = (err, req, res ,next )=>{
  const statuscode = err.statuscode || 500;

  if(err.name === "MongoServerError" && err.message.includes("E11000 duplicate key") ){
    err.message = "User with this email address allreday exists"
  }


  res.status(statuscode).json({
    message: err.message,
    errName: err.name,
    stack: err.stack

  })
}