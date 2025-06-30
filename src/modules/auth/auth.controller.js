import MESSAGES from "../../common/contstants/messages.js";
import createError from "../../common/utils/error.js";
import handleAsync from "../../common/utils/handleAsync.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import createResponse from "../../common/utils/response.js";
import {
  JWT_EXPIRES_IN,
  JWT_SECRET_KEY,
  JWT_EXPIRES_IN_FOR_EMAIL,
  JWT_SECRET_KEY_FOR_EMAIL,
} from "../../common/configs/environments.js";
import User from "../user/user.model.js";
import sendEmail from "../../common/utils/mailSender.js";

export const authRegister = handleAsync(async (req, res, next) => {
  const { email, password } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return next(createError(400, MESSAGES.AUTH.EMAIL_ALREADY_EXISTS));
  }
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

  //Create User
  const newUser = await User.create({
    ...req.body,
    password: hashedPassword,
    role: "guest",
  });
  if (!newUser) {
    return next(createError(500, MESSAGES.AUTH.REGISTER_FAILED));
  }

  // Verify  email
  const verifyEmailToken = jwt.sign(
    { id: newUser._id },
    JWT_SECRET_KEY_FOR_EMAIL,
    { expiresIn: JWT_EXPIRES_IN_FOR_EMAIL }
  );

  const verifyEmailLink = `http://localhost:8888/api/auth/verify-email/${verifyEmailToken}`;

  sendEmail(
    newUser.email,
    "Verify your email",
    `
      <div style="font-family: Arial, sans-serif; color: #333; padding: 20px;">
        <h2 style="color:rgb(0, 0, 0);">Xin chào ${
          newUser.fullName || "User"
        },</h2>
        <p>Vui lòng click vào nút dưới đây để xác thực email của bạn:</p>
  
        <a href="${verifyEmailLink}"
           style="display: inline-block; padding: 12px 24px; background-color: #4CAF50; color: white; 
                  text-decoration: none; border-radius: 5px; font-weight: bold; margin: 20px 0; display: inline-block;">
           Xác thực email
        </a>
  
        <p>Nếu bạn không đăng ký tài khoản này, vui lòng bỏ qua email này.</p>
        <p style="margin-top: 30px;">Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi!<br>– Đội ngũ hỗ trợ</p>
      </div>
    `
  );

  // Respone
  newUser.password = undefined; // Remove password from response
  res
    .status(201)
    .json(createResponse(true, 201, MESSAGES.AUTH.REGISTER_SUCCESS, newUser));
});

export const authLogin = handleAsync(async (req, res, next) => {
  const { email, password } = req.body;
  const existingUser = await User.findOne({ email });
  if (!existingUser) {
    return next(createError(400, MESSAGES.AUTH.USER_NOT_EXITS));
  }
  const isMatch = bcrypt.compareSync(password, existingUser.password);
  if (!isMatch) {
    return next(createError(400, MESSAGES.AUTH.LOGIN_FAILED));
  }

  //Generate token

  const accessToken = jwt.sign({ id: existingUser._id }, JWT_SECRET_KEY, {
    expiresIn: JWT_EXPIRES_IN,
  });

  if (accessToken) {
    existingUser.password = undefined;
    return res.status(200).json(
      createResponse(true, 200, MESSAGES.AUTH.LOGIN_SUCCESS, {
        user: existingUser,
        accessToken,
      })
    );
  }
  return next(createError(500, MESSAGES.AUTH.LOGIN_FAILED));
});

export const authLogout = handleAsync(async (req, res, next) => {});

export const authRefreshToken = handleAsync(async (req, res, next) => {});

export const authForgotPassword = handleAsync(async (req, res, next) => {});

export const authResetPassword = handleAsync(async (req, res, next) => {});
