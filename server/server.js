require("dotenv").config({ path: "../.env" });

const app = require("./app");

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("🚀 Phoenix Professionals Backend Started!");
  console.log("📍 Port:", PORT);
  console.log("🌍 Environment:", process.env.NODE_ENV);
  console.log("📧 Admin Email:", process.env.ADMIN_EMAIL);
  console.log("🔗 Client URL:", process.env.CLIENT_URL);
});
