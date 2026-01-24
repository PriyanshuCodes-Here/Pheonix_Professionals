const MailService = require("../services/mail.service");

class ContactController {
  static async submitContactForm(req, res) {
    try {
      const { name, email, phone, subject, message } = req.body;

      // ===============================
      // Validation
      // ===============================
      if (!name || !email || !phone || !subject || !message) {
        return res.status(400).json({
          success: false,
          message: "All fields are required",
          requiredFields: ["name", "email", "phone", "subject", "message"]
        });
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({
          success: false,
          message: "Please enter a valid email address"
        });
      }

      const phoneRegex = /^[0-9+\-\s()]{10,}$/;
      if (!phoneRegex.test(phone)) {
        return res.status(400).json({
          success: false,
          message: "Please enter a valid phone number"
        });
      }

      // ===============================
      // Send Email
      // ===============================
      await MailService.sendContactEmail({
        name,
        email,
        phone,
        subject,
        message
      });

      console.log(`✅ New enquiry: ${name} | ${email} | ${subject}`);

      // ===============================
      // SUCCESS RESPONSE (IMPORTANT)
      // ===============================
      return res.status(200).json({
        success: true,
        message: "Thank you! Your message has been sent successfully.",
        data: {
          name,
          email,
          subject,
          timestamp: new Date().toISOString()
        }
      });

    } catch (error) {
      console.error("❌ Contact form error:");
      console.error(error);

      return res.status(500).json({
        success: false,
        message: "Failed to send message. Please try again later."
      });
    }
  }
}

module.exports = ContactController;
