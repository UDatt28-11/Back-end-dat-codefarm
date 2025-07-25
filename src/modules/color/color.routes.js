import express from "express";
import { createColor, getAllColors, updateColor } from "./color.controllers.js";

const colorRoutes = express.Router();

colorRoutes.post("/", createColor);
colorRoutes.get("/", getAllColors);
colorRoutes.put("/:id", updateColor);

export default colorRoutes;
