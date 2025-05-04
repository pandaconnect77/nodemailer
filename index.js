const express = require('express');
const nodemailer = require('nodemailer');
const path = require('path');
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Nodemailer transporter
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'pandaconnect7@gmail.com',
    pass: 'pvgitcnukcfuvhog' // Use Gmail App Password
  }
});

// Email sending route (send to 4 people)
app.post('/send-email', async (req, res) => {
  const recipients = [
    'saisubbusai0@gmail.com',
    'Subbuchoda0@gmail.com',
    'subramanyamchoda50@gmail.com',
    'subramanyamchoda1@gmail.com',
    'pandaconnect7@gmail.com'
  ];

  // Delay helper
  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  // Send emails one by one with delay
  for (let i = 0; i < recipients.length; i++) {
    const recipient = recipients[i];
    const mailOptions = {
      from: 'pandaconnect7@gmail.com',
      to: recipient,
      subject: `Email to ${recipient}`,
      text: `Hello ${recipient}, this is your personal email.`
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      console.log(`✅ Sent to ${recipient}: ${info.response}`);
    } catch (error) {
      console.error(`❌ Failed to send to ${recipient}: ${error.toString()}`);
    }

    if (i < recipients.length - 1) {
      await delay(2000); // Wait 2 seconds before next
    }
  }

  res.send('✅ All  sent');
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
