const nodemailer = require("nodemailer")
const ErrorHandler = require("./ErrorHandler")
exports.sendmail = (req, res, next, url) => {
    const transport = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 465,
        auth: {
            user: process.env.MAIL_EMAIL_ADDRESS,
            pass:process.env.MAIL_PASSWORD,
        },
    })

    const mailOption = {
        from: "prashant private limited",
        to: req.body.email,
        subject: "Confirmation: Your message has been received",
        html: `<p>Thank you for your message. Your message has been received, and we will get back to you shortly.</p>
            <a href="${url}"></a>`
    }

    transport.sendMail(mailOption, (err, info) => {
        if (err) return next(new ErrorHandler(err, 500));
        console.log(info);
        return res.status(200).json({
            message: "mail sent sucessfully",
            url,
        })
    })
}
