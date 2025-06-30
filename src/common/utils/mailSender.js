import { EMAIL_PASSWORD, EMAIL_USER } from "../configs/environments.js";
import createError from "./error.js";
import nodemailer from "nodemailer";
const sendEmail = async (email, subject, text) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: "June",
    to: email,
    subject: subject,
    text: text,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    // Ném lỗi cho middleware xử lý
    throw createError(500, `Gửi email thất bại: ${error.message}`);
  }
};

export default sendEmail;
