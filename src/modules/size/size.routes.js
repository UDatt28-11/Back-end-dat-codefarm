import express from "express";
import { createSize, getAllSizes, updateSize } from "./size.controllers.js";

const sizeRoutes = express.Router();

sizeRoutes.post("/", createSize);
sizeRoutes.get("/", getAllSizes);
sizeRoutes.put("/:id", updateSize);

export default sizeRoutes;
