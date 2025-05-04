const express = require('express');
const nodemailer = require('nodemailer');
const app = express();
const PORT = 3000;

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

// GET route — send 10 emails when this route is opened
app.get('/', async (req, res) => {
  const mailPromises = [];

  for (let i = 1; i <= 10; i++) {
    const mailOptions = {
      from: 'pandaconnect7@gmail.com',
      to: 'subramanyamchoda50@gmail.com',
      subject: `Auto Email ${i}`,
      text: `This is email #${i} sent automatically on homepage visit.`
    };

    // Add the promise to array
    mailPromises.push(
      transporter.sendMail(mailOptions)
        .then(info => {
          console.log(`✅ Email #${i} sent: ${info.response}`);
        })
        .catch(error => {
          console.error(`❌ Failed to send email #${i}: ${error.toString()}`);
        })
    );
  }

  // Wait for all to finish
  await Promise.all(mailPromises);

  res.send('Sended');
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
