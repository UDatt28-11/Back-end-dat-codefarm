import { Router } from "express";
import { getAllUser, getUserById } from "./user.controller.js";

const userRoutes = Router();

userRoutes.get("/", getAllUser);
userRoutes.get("/:id", getUserById);
export default userRoutes;
