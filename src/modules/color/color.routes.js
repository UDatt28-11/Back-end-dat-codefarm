import express from "express";
import {
  createColor,
  deleteColor,
  getAllColors,
  updateColor,
} from "./color.controllers.js";

const colorRoutes = express.Router();

colorRoutes.post("/", createColor);
colorRoutes.get("/", getAllColors);
colorRoutes.put("/:id", updateColor);
colorRoutes.delete("/:id", deleteColor);

export default colorRoutes;
