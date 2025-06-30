import { Router } from "express";
import valiBodyRequest from "./../../common/middlewares/validBodyRequest.js";
import { loginSchema, registerSchema } from "./auth.schema.js";
import { authLogin, authRegister } from "./auth.controller.js";

const authRoutes = Router();

authRoutes.post("/register", valiBodyRequest(registerSchema), authRegister);
authRoutes.post("/login", valiBodyRequest(loginSchema), authLogin);

export default authRoutes;
