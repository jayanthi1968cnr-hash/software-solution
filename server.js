// server.js - Backend API for sending emails to firecloudslap@gmail.com
// Install required packages: npm install express nodemailer cors dotenv

const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Email configuration
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: process.env.SMTP_PORT || 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER, // Your email (e.g., firecloudslap@gmail.com)
    pass: process.env.EMAIL_PASS, // Your email password or app password
  },
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  const { name, email, phone, company, subject, message } = req.body;

  // Validate required fields
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ 
      success: false, 
      message: 'Please provide all required fields' 
    });
  }

  // Email to firecloudslap@gmail.com (actual recipient)
  // User sees team@fireclouds.in in the UI
  const mailOptions = {
    from: `"${name}" <${process.env.EMAIL_USER}>`, // Sender address
    to: 'firecloudslap@gmail.com', // Actual recipient email (internal)
    replyTo: email, // Reply to customer's email
    subject: `New Contact Form: ${subject}`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #f9f9f9;
            }
            .header {
              background: linear-gradient(90deg, #ff4500, #ff8a00);
              color: white;
              padding: 20px;
              text-align: center;
              border-radius: 8px 8px 0 0;
            }
            .content {
              background: white;
              padding: 30px;
              border-radius: 0 0 8px 8px;
            }
            .field {
              margin-bottom: 15px;
              padding: 10px;
              background: #f5f5f5;
              border-radius: 4px;
            }
            .label {
              font-weight: bold;
              color: #ff4500;
            }
            .message-box {
              background: #fff;
              border: 2px solid #ff8a00;
              padding: 15px;
              border-radius: 4px;
              margin-top: 10px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>🔥 New Contact Form Submission</h2>
              <p>FireClouds Software Solutions</p>
            </div>
            <div class="content">
              <div class="field">
                <span class="label">Name:</span> ${name}
              </div>
              <div class="field">
                <span class="label">Email:</span> 
                <a href="mailto:${email}">${email}</a>
              </div>
              ${phone ? `
              <div class="field">
                <span class="label">Phone:</span> 
                <a href="tel:${phone}">${phone}</a>
              </div>
              ` : ''}
              ${company ? `
              <div class="field">
                <span class="label">Company:</span> ${company}
              </div>
              ` : ''}
              <div class="field">
                <span class="label">Subject:</span> ${subject}
              </div>
              <div class="message-box">
                <span class="label">Message:</span>
                <p>${message.replace(/\n/g, '<br>')}</p>
              </div>
              <p style="margin-top: 20px; color: #666; font-size: 14px;">
                📅 Received: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
              </p>
              <hr style="margin: 20px 0; border: none; border-top: 1px solid #ddd;">
              <p style="font-size: 12px; color: #999;">
                This message was sent via the FireClouds contact form.<br>
                Display email: team@fireclouds.in | Support: 08069328924
              </p>
            </div>
          </div>
        </body>
      </html>
    `,
    text: `
New Contact Form Submission - FireClouds Software Solutions

Name: ${name}
Email: ${email}
Phone: ${phone || 'Not provided'}
Company: ${company || 'Not provided'}
Subject: ${subject}

Message:
${message}

Received: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
Display email: team@fireclouds.in
Support: 08069328924
    `
  };

  try {
    // Send email
    await transporter.sendMail(mailOptions);
    
    console.log(`Email sent to firecloudslap@gmail.com from ${name} (${email})`);
    
    res.status(200).json({ 
      success: true, 
      message: 'Message sent successfully!' 
    });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to send message. Please try again later.' 
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Contact API is running',
    recipient: 'firecloudslap@gmail.com',
    display: 'team@fireclouds.in'
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Emails will be sent to: firecloudslap@gmail.com`);
  console.log(`Display email: team@fireclouds.in`);
});

module.exports = app;