export default function (req, res) {
    require("dotenv").config();
    let nodemailer = require("nodemailer");

    const transporter = nodemailer.createTransport({
        port: 465,
        host: "smtp.gmail.com",
        // auth: {
        //     user: process.env.EMAIL,
        //     pass: process.env.PASSWORD,
        // },
        auth: {
            type: "OAuth2",
            user: process.env.EMAIL,
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            refreshToken: process.env.REFRESH_TOKEN,
            accessToken: process.env.ACCESS_TOKEN,
        },
        secure: true,
    });

    transporter.set("oauth2_provision_cb", (user, renew, callback) => {
        let accessToken = userTokens[user];
        if (!accessToken) {
            return callback(new Error("Unknown user"));
        } else {
            return callback(null, accessToken);
        }
    });

    const mailData = {
        from: process.env.EMAIL,
        to: req.body.to,
        cc: req.body.cc,
        bcc: req.body.bcc,
        subject: `${req.body.title}`,
        text: req.body.message,
        html: `${req.body.html}`,
        // attachments: {
        //     filename: "nhs_white.png",
        //     path: "/images/nhs_white.png",
        //     cid: "nhswhite",
        // },
    };
    transporter.sendMail(mailData, function (err, info) {
        if (err) {
            console.log(err);
            res.status(500);
        } else {
            console.log(info);
            res.status(200);
        }
    });
}
