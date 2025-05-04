const express = require('express');
const nodemailer = require('nodemailer');
const path = require('path');
const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());

// Serve static files (HTML, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Nodemailer transporter
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'pandaconnect7@gmail.com',
    pass: 'pvgitcnukcfuvhog' // Use an app password, not your Gmail password
  }
});

// Route to send a single email
app.post('/send-email', async (req, res) => {
  const mailOptions = {
    from: 'pandaconnect7@gmail.com',
    to: 'subramanyamchoda1@gmail.com',
    subject: 'Single Email',
    text: 'This is a single email sent on button click.'
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ Email sent: ${info.response}`);
    res.send('Single email sent on button click!');
  } catch (error) {
    console.error(`❌ Failed to send email: ${error.toString()}`);
    res.status(500).send('Failed to send email.');
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
