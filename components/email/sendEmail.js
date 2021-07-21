async function sendEmail(target, title, header, html) {
    const memberEmailList = "";
    const officerEmailList = "895090@lcps.org,";
    const advisorEmailList = "1036566@lcps.org,895090@lcps.org,";
    const testEmailList = "1036566@lcps.org,895090@lcps.org,";
    const selfEmailList = "rvhnhs@gmail.com,";

    // Init
    let to = "";
    let cc = "";
    let bcc = "";

    if (target === "member") {
        to += selfEmailList;
        cc += advisorEmailList;
        cc += officerEmailList;
        bcc += memberEmailList;
    } else if (target === "officer") {
        to += officerEmailList;
        cc += advisorEmailList;
    } else if (target === "advisor") {
        to += advisorEmailList;
    } else {
        to += target;
        cc += advisorEmailList;
    }

    // Body
    let emailBody = `<!DOCTYPE html><html> <head> <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"> <style> @import url("https://fonts.googleapis.com/css2?family=Oxygen"); @import url(https://fonts.googleapis.com/css?family=Montserrat:400,500,800,900,80); .wrapper{ width: 100%; } .header{ background-color: #0e447b; padding-top: 1%; padding-left: 5%; padding-right: 5%; width: 90%; text-align: center; } .top-nhs-logo{ width: 8rem; } .header .title{ margin-top: -1rem; font-family: 'Montserrat', sans-serif; color: white; font-size: 3rem; font-weight: 700; padding-bottom: 1%; } .header .subtitle{ font-family: 'Oxygen', sans-serif; color: white; font-size: 2rem; padding-bottom: 3%; } .body{ background-color: #F1F1E6; padding-top: 5%; padding-left: 10%; padding-right: 10%; width: 80%; } .body .title{ color: #2793fa; font-family: 'Montserrat', sans-serif; font-weight: 700; font-size: 2rem; } .body .text{ font-family: 'Oxygen', sans-serif; color: black; font-size: 1.2rem; padding-bottom: 5%; } .footer{ background-color: #0e447b; padding-left: 5%; padding-right: 5%; padding-bottom: 5%; width: 90%; text-align: center; } .footer .motto{ font-family: 'Montserrat', sans-serif; color: white; font-size: 2rem; font-weight: 700; padding-top: 5%; padding-bottom: 1rem; } .fa { padding: 1rem; font-size: 30px; width: 30px; text-align: center; text-decoration: none; color: white; transition: 0.3s all; } .fa:hover { color: #2793fa; transition: 0.3s all; } .footer .socials { position: relative; text-align: center; } .footer .info{ font-family: "Oxygen",sans-serif; color: white; } .footer .info a{ color: white; transition: 0.3s all; } .footer .info a:hover{ color: #2793fa; transition: 0.3s all; } </style> </head> <body> <div class="wrapper"> <div class="header"> <img class="top-nhs-logo" src="https://firebasestorage.googleapis.com/v0/b/rvhnhs.appspot.com/o/email%2Fnhs_white.png?alt=media&token=72839346-da98-4fe7-8b18-e5d4528cefbb"/> <div class="title"> National Honor Society </div> <div class="subtitle"> Riverside Chapter </div> </div> <div class="divider"></div> <div class="body"> <div class="title">${header}</div> <div class="text">${html}<br> <br>Sincerely,<br>Officers, Riverside NHS 2021-2022</div> </div> <div class="footer"> <div class="motto"> VOLUNTEER, ADVOCATE, SERVE </div> <div class="socials"> <a href="#" class="fa fa-twitter"></a> <a href="#" class="fa fa-facebook"></a> <a href="#" class="fa fa-instagram"></a> </div> <div class="info"> No longer want to receive these emails? <a href="https://rvhnhs.vercel.app/" class="unsubscribe-text">Unsubscribe</a>. <br> 19019 Upper Belmont Pl, Leesburg, VA 20176 </div> </div> </div> </body></html>`;
    const message = "";

    // Send
    let email_data = {
        to,
        cc,
        bcc,
        title,
        message,
        emailBody,
    };

    email_data = JSON.stringify(email_data);
    const https = require("https");

    const options = {
        path: "/api/email",
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Content-Length": email_data.length,
        },
        body: email_data,
    };

    const req = https.request(options, (res) => {
        console.log("statusCode:", res.statusCode);
    });

    req.on("error", (error) => {
        console.error(error);
    });

    req.write(email_data);
    req.end();
}

export default sendEmail;
