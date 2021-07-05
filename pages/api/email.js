export default function (req, res) {
    require("dotenv").config();
    let nodemailer = require("nodemailer");

    const transporter = nodemailer.createTransport({
        port: 465,
        host: "smtp.gmail.com",
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD,
        },
        secure: true,
    });
    const mailData = {
        from: process.env.EMAIL,
        to: req.body.to,
        subject: `${req.body.title}`,
        text: req.body.message,
        html: `${req.body.html}`,
    };
    transporter.sendMail(mailData, function (err, info) {
        if (err) {
            console.log(err);
            res.status(200).json(err);
        } else {
            console.log(info);
            res.status(200).json(info);
        }
    });
}
