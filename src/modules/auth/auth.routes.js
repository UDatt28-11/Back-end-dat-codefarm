import { Router } from "express";
import valiBodyRequest from "./../../common/middlewares/validBodyRequest.js";
import { loginSchema, registerSchema } from "./auth.schema.js";
import { authLogin, authRegister, verifyEmail } from "./auth.controller.js";

const authRoutes = Router();

authRoutes.get("/verify-email/:token", verifyEmail);
authRoutes.post("/register", valiBodyRequest(registerSchema), authRegister);
authRoutes.post("/login", valiBodyRequest(loginSchema), authLogin);
export default authRoutes;
