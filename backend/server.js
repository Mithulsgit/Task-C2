const express = require("express");
const cors = require("cors");
require("dotenv").config();
const sgMail = require("@sendgrid/mail");

const app = express();

app.use(express.json());
app.use(cors({ origin: process.env.FRONTEND_URL || true }));

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

app.get("/api/health", (req, res) => {
  res.json({ message: "Backend is running" });
});
app.post("/subscribe", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({
      message: "Email is required."
    });
  }

  try {
    await sgMail.send({
      to: email,
      from: process.env.FROM_EMAIL,
      subject: "DEV@Deakin Daily Insider",
      text: "Thank you for subscribing to the DEV@Deakin Daily Insider!"
    });

    res.status(200).json({
      message: "Thank you for subscribing!"
    });
  } catch (error) {
    console.error("SendGrid error:", error);
    res.status(500).json({
      message: "Failed to send subscription email."
    });
  }
});
const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});