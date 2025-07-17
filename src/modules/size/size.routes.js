import express from "express";
import {
  createSize,
  deleteSize,
  getAllSizes,
  updateSize,
} from "./size.controllers.js";

const sizeRoutes = express.Router();

sizeRoutes.post("/", createSize);
sizeRoutes.get("/", getAllSizes);
sizeRoutes.put("/:id", updateSize);
sizeRoutes.delete("/:id", deleteSize);

export default sizeRoutes;
