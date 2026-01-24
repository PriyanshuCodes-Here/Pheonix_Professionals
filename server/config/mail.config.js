const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false, // TLS
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

// Verify Gmail SMTP
transporter.verify((error) => {
  if (error) {
    console.error("❌ Gmail SMTP connection failed:", error);
  } else {
    console.log("✅ Gmail SMTP is ready to send emails");
  }
});

module.exports = transporter;
