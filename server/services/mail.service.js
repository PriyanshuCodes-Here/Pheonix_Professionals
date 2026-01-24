const { Resend } = require("resend");

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

class MailService {
  static async sendContactEmail(formData) {
    const { name, email, phone, subject, message } = formData;

    // 🔎 LOG: Incoming data
    console.log("📥 Incoming contact form data:", {
      name,
      email,
      phone,
      subject,
      message
    });

    try {
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
              <p>${process.env.COMPANY_NAME}</p>
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
              <p>© ${new Date().getFullYear()} ${process.env.COMPANY_NAME}</p>
            </div>
          </div>
        </body>
        </html>
      `;

      console.log("📤 Sending email via RESEND to:", process.env.ADMIN_EMAIL);

      const { data, error } = await resend.emails.send({
        from: `${process.env.COMPANY_NAME} <onboarding@resend.dev>`,
        to: [process.env.ADMIN_EMAIL],
        reply_to: email,
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
      });

      if (error) {
        console.error("❌ Resend API error:", error);
        throw error;
      }

      console.log("✅ Email sent successfully via RESEND");
      console.log("📨 Resend Message ID:", data.id);

      return data;

    } catch (error) {
      console.error("❌ Email sending failed (RESEND)");
      console.error("🔴 Error:", error.message || error);
      throw error;
    }
  }
}

module.exports = MailService;
