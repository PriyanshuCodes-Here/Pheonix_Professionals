const express = require("express");
const cors = require("cors");
const path = require("path"); // ✅ NEW (safe)
const contactRoutes = require("./routes/contact.routes");

const app = express();

// ===============================
// CORS Configuration
// ===============================
const corsOptions = {
  origin: process.env.CLIENT_URL || "http://localhost:3000",
  credentials: true,
  optionsSuccessStatus: 200
};

// ===============================
// Middleware
// ===============================
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ===============================
// 🔥 SERVE FRONTEND (NEW - SAFE)
// ===============================
app.use(
  express.static(
    path.join(__dirname, "../client/main")
  )
);

// ===============================
// Health Check Route (UNCHANGED)
// ===============================
app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Phoenix Professionals Backend is running",
    timestamp: new Date().toISOString()
  });
});

// ===============================
// API Routes (UNCHANGED)
// ===============================
app.use("/api/contact", contactRoutes);

// ===============================
// 🔥 DEFAULT ROUTE (NEW - SAFE)
// ===============================
app.get("/", (req, res) => {
  res.sendFile(
    path.join(__dirname, "../client/main/index.html")
  );
});

// ===============================
// 404 Handler (UNCHANGED)
// ===============================
app.use("*", (req, res) => {
  res.status(404).json({
    status: "error",
    message: "Route not found"
  });
});

// ===============================
// Error Handler (UNCHANGED)
// ===============================
app.use((err, req, res, next) => {
  console.error("Server Error:", err);
  res.status(500).json({
    status: "error",
    message: "Internal server error",
    error: process.env.NODE_ENV === "development" ? err.message : undefined
  });
});

module.exports = app;
