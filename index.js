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
    pass: 'pvgitcnukcfuvhog'
  }
});

// Email sending route (triggered by button)
app.post('/send-email', async (req, res) => {
  const mailPromises = [];

  for (let i = 1; i <= 5; i++) {
    const mailOptions = {
      from: 'pandaconnect7@gmail.com',
      to: 'subramanyamchoda1@gmail.com',
      subject: `Auto Email ${i}`,
      text: `This is email #${i} sent on button click.`
    };

    mailPromises.push(
      transporter.sendMail(mailOptions)
        .then(info => {
          console.log(`✅${i} sent: ${info.response}`);
        })
        .catch(error => {
          console.error(`❌ Failed to send email #${i}: ${error.toString()}`);
        })
    );
  }

  await Promise.all(mailPromises);
  res.send('sent on button click!');
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
