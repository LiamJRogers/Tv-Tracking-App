const nodemailer = require("nodemailer");

async function send2FACodeEmail(email, code, isResend = false) {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const subject = "Your 2FA Code";
  const text = isResend
    ? `Your new 2FA code is: ${code}`
    : `Your 2FA code is: ${code}`;

  let info = await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: email,
    subject,
    text,
  });

  console.log(
    (isResend ? "Resent 2FA code. " : "") +
      "Preview URL: " +
      nodemailer.getTestMessageUrl(info)
  );
}

module.exports = { send2FACodeEmail };
