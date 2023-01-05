import * as AWS from "aws-sdk";
import * as nodemailer from "nodemailer";
AWS.config.update({
    accessKeyId: process.env.LITE_AWS_ACCESS_KEY,
    secretAccessKey: process.env.LITE_AWS_SECRET_ACCESS_KEY,
    region: "us-east-2",
});
AWS.config.getCredentials(function (error) {
    if (error) {
        console.log(error.stack);
    }
});
const ses = new AWS.SES({ apiVersion: "2010-12-01" });

// change this to the "to" email that you want
const adminMail = "florez.joys@gmail.com";
// Create a transporter of nodemailer
const transporter = nodemailer.createTransport({
    SES: ses,
});
export const testMail = async (userEmail: string) => {
try {
const response = await transporter.sendMail({
from: adminMail,
to: userEmail,
subject: "Test Mail",
html: `
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" "http://www.w3.org/TR/REC-html40/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
</head>
<body>
<div style="padding:20px;">
<div style="max-width: 500px;">
<h2>Test Mail</h2>
<p>
Hi there,<br/><br/>
This is a test mail.
</p>
</div>
</div>
</body>
</html>
`,
});
return response?.messageId
? { ok: true }
: { ok: false, msg: "Failed to send email" };
} catch (error: any) {
console.log("ERROR", error.message);
return { ok: false, msg: "Failed to send email" };
}
};