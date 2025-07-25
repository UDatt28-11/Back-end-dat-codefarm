import jwt from "jsonwebtoken";

import User from "./../../modules/user/user.model.js";
import { JWT_SECRET_KEY } from "../configs/environments.js";

export const authMiddleware = async (req, res, next) => {
  const token = req.headers?.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Không có token" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET_KEY);
    // console.log(decoded);
    const user = await User.findById(decoded.id);
    if (!user)
      return res.status(401).json({ message: "Người dùng không tồn tại" });
    req.user = user;
    next();
  } catch (err) {
    // console.log(err);
    res.status(401).json({ message: "Token không hợp lệ" });
  }
};
export const isAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return res
      .status(403)
      .json({ message: "Bạn không có quyền truy cập admin" });
  }
  next();
};
