async function sendEmail(target, title, message, html) {
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

    // Send
    let email_data = {
        to,
        cc,
        bcc,
        title,
        message,
        html,
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
