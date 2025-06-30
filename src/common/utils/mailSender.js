import nodemailer from "nodemailer";
import { EMAIL_PASSWORD, EMAIL_USER } from "../configs/environments.js";
import createError from "./error.js";

const sendEmail = async (to, subject, html) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: `"June 👩‍💻" <${EMAIL_USER}>`,
    to,
    subject,
    html,
  };

  try {
    const info = await transporter.sendMail(mailOptions); // ✅ Gán info tại đây
    console.log("✅ Email đã được gửi:", info.response); // ✅ Giờ info mới tồn tại
  } catch (error) {
    console.error("❌ Gửi email lỗi:", error);
    throw createError(500, `Gửi email thất bại: ${error.message}`);
  }
};

export default sendEmail;
