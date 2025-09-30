const express = require("express");
const nodemailer = require("nodemailer");
const path = require("path");

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "saisubbusai0@gmail.com",      // your Gmail
    pass: "kxzzppnnzlwfnwss",            // your Gmail App Password
  },
});

// Email sending route (send to a single recipient quickly)
app.post("/send-email", async (req, res) => {
  const recipient = "Subbuchoda0@gmail.com"; // just one recipient

  const mailOptions = {
    from: "saisubbusai0@gmail.com",
    to: recipient,
    subject: `Email to ${recipient}`,
    text: `Hello ${recipient}, this is your personal email.`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ Sent to ${recipient}: ${info.response}`);
    res.json({ success: true, message: `Email sent to ${recipient}` });
  } catch (error) {
    console.error(`❌ Failed to send to ${recipient}: ${error.toString()}`);
    res.status(500).json({ success: false, message: "Failed to send email", error: error.toString() });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
