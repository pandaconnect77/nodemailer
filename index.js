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

// Email sending route (send to multiple recipients with delay)
app.post("/send-email", async (req, res) => {
  const recipients = [
    "Subbuchoda0@gmail.com",
    "subramanyamchoda1@gmail.com"
  ];

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const results = [];

  for (let i = 0; i < recipients.length; i++) {
    const recipient = recipients[i];
    const mailOptions = {
      from: "saisubbusai0@gmail.com",
      to: recipient,
      subject: `Email to ${recipient}`,
      text: `Hello ${recipient}, this is your personal email.`,
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      console.log(`✅ Sent to ${recipient}: ${info.response}`);
      results.push({ recipient, status: "sent" });
    } catch (error) {
      console.error(`❌ Failed to send to ${recipient}: ${error.toString()}`);
      results.push({ recipient, status: "failed", error: error.toString() });
    }

    if (i < recipients.length - 1) {
      await delay(2000); // wait 2s before next send
    }
  }

  res.json({
    success: true,
    message: "Email sending process finished",
    results,
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
