const nodemailer = require("nodemailer");

require("dotenv").config();

const sendEmail = async ({ to, sender, subject, html, attachments, text }) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: sender,
      to: to,
      subject: subject,
      html: html,
      text: text,
      attachments: attachments,
    };

    return await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

exports.sendEmail = sendEmail;
