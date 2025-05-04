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

  const mailOptions = {
    from: 'pandaconnect7@gmail.com',
    to: recipients.join(','),
    subject: 'Group Email',
    text: 'This is a single email sent to multiple recipients.'
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ Email sent to: ${recipients.join(', ')} | ${info.response}`);
    res.send('Email sent to multiple recipients!');
  } catch (error) {
    console.error(`❌ Failed to send email: ${error.toString()}`);
    res.status(500).send('Failed to send email.');
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
