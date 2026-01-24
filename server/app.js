const express = require("express");
const cors = require("cors");
const path = require("path");

const contactRoutes = require("./routes/contact.routes");

const app = express();

// ===============================
// Middleware
// ===============================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ===============================
// CORS (SAFE for same-origin + local dev)
// ===============================
app.use(
  cors({
    origin: process.env.CLIENT_URL || true,
    credentials: true
  })
);

// ===============================
// API ROUTES (ALWAYS FIRST)
// ===============================
app.use("/api/contact", contactRoutes);

app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Phoenix Professionals Backend is running",
    timestamp: new Date().toISOString()
  });
});

// ===============================
// SERVE FRONTEND (STATIC)
// ===============================
const clientPath = path.join(__dirname, "../client/main");
app.use(express.static(clientPath));

// ===============================
// FRONTEND FALLBACK (IMPORTANT)
// ===============================
app.get("*", (req, res) => {
  // ❌ Never serve index.html for API routes
  if (req.path.startsWith("/api")) {
    return res.status(404).json({
      success: false,
      message: "API route not found"
    });
  }

  res.sendFile(path.join(clientPath, "index.html"));
});

// ===============================
// GLOBAL ERROR HANDLER
// ===============================
app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err);

  res.status(500).json({
    success: false,
    message: "Internal server error",
    error:
      process.env.NODE_ENV === "development"
        ? err.message
        : undefined
  });
});

module.exports = app;
