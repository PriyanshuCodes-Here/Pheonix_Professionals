const express = require("express");
const ContactController = require("../controllers/contact.controller");

const router = express.Router();

// @route   POST /api/contact
// @desc    Submit contact form
// @access  Public
router.post("/", ContactController.submitContactForm);

// @route   GET /api/contact/test
// @desc    Test email functionality
// @access  Public (for testing only)
router.get("/test", async (req, res) => {
  try {
    res.json({
      success: true,
      message: "Contact API is working",
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;