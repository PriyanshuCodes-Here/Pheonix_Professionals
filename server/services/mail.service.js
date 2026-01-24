const transporter = require("../config/mail.config");

class MailService {
  static async sendContactEmail(formData) {
    const { name, email, phone, subject, message } = formData;

    // 🔎 LOG 1: Incoming Data
    console.log("📥 Incoming contact form data:", {
      name,
      email,
      phone,
      subject,
      message
    });

    try {
      // ===============================
      // HTML EMAIL TEMPLATE
      // ===============================
      const htmlTemplate = `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; background:#f4f4f4; color:#333; }
            .container { max-width:600px; margin:auto; background:#ffffff; padding:20px; }
            .header { background:#0d0d0d; color:#f2c94c; padding:15px; text-align:center; }
            .content p { margin:8px 0; }
            .message-box { background:#f9f9f9; padding:15px; border-left:4px solid #f2c94c; }
            .footer { margin-top:20px; font-size:12px; color:#777; text-align:center; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>📩 New Client Enquiry</h2>
              <p>Phoenix Professionals</p>
            </div>

            <div class="content">
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Phone:</strong> ${phone}</p>
              <p><strong>Subject:</strong> ${subject}</p>

              <p><strong>Message:</strong></p>
              <div class="message-box">
                ${message.replace(/\n/g, "<br>")}
              </div>

              <p><strong>Received:</strong> ${new Date().toLocaleString(
                "en-IN",
                { timeZone: "Asia/Kolkata" }
              )} (IST)</p>
            </div>

            <div class="footer">
              <p>Submitted via ${process.env.COMPANY_WEBSITE}</p>
              <p>© ${new Date().getFullYear()} Phoenix Professionals</p>
            </div>
          </div>
        </body>
        </html>
      `;

      // ===============================
      // MAIL OPTIONS (GMAIL SMTP)
      // ===============================
      const mailOptions = {
        from: `"${process.env.COMPANY_NAME}" <${process.env.SMTP_USER}>`,
        to: process.env.ADMIN_EMAIL,
        replyTo: email,
        subject: `New Enquiry: ${subject} | ${process.env.COMPANY_NAME}`,
        html: htmlTemplate,
        text: `
New Client Enquiry

Name: ${name}
Email: ${email}
Phone: ${phone}
Subject: ${subject}

Message:
${message}
        `
      };

      // 🔎 LOG 2
      console.log("📤 Sending email to:", process.env.ADMIN_EMAIL);

      const info = await transporter.sendMail(mailOptions);

      // ✅ SUCCESS LOGS
      console.log("✅ Email sent successfully via Gmail SMTP");
      console.log("📨 Message ID:", info.messageId);
      console.log("📬 Accepted:", info.accepted);

      return info;

    } catch (error) {
      console.error("❌ Email sending failed");
      console.error("🔴 Error message:", error.message);
      throw error;
    }
  }
}

module.exports = MailService;
