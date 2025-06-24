import { Router } from "express";
import valiBodyRequest from "./../../common/middlewares/validBodyRequest";
import { loginSchema, registerSchema } from "./auth.schema";
import { authLogin, authRegister } from "./auth.controller";

const authRoutes = Router();

authRoutes.post("/register", valiBodyRequest(registerSchema), authRegister);
authRoutes.post("/login", valiBodyRequest(loginSchema), authLogin);

export default authRoutes;
