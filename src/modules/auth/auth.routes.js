import { Router } from "express";
import valiBodyRequest from "./../../common/middlewares/validBodyRequest.js";
import { loginSchema, registerSchema } from "./auth.schema.js";
import { authLogin, authRegister, verifyEmail } from "./auth.controller.js";
import { authMiddleware } from "../../common/middlewares/authMiddleware.js";
import { requireRole } from "../../common/middlewares/requireRole.js";

const authRoutes = Router();

authRoutes.get("/verify-email/:token", verifyEmail);
authRoutes.post("/register", valiBodyRequest(registerSchema), authRegister);
authRoutes.post("/login", valiBodyRequest(loginSchema), authLogin);
// ✅ Route test: chỉ "admin" hoặc "superadmin" được phép truy cập
authRoutes.get(
  "/admin-only",
  authMiddleware,
  requireRole("admin", "superadmin"),
  (req, res) => {
    res.json({
      message: "Chào Admin",
    });
  }
);
export default authRoutes;
