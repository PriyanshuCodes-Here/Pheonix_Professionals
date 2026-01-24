const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.resend.com",
  port: 587,
  secure: false, // STARTTLS
  auth: {
    user: "resend",
    pass: process.env.RESEND_API_KEY
  }
});

// Verify SMTP connection
transporter.verify((error) => {
  if (error) {
    console.error("❌ Resend SMTP connection failed:", error);
  } else {
    console.log("✅ Resend SMTP is ready to send emails");
  }
});

module.exports = transporter;
