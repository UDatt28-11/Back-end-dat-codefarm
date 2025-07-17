import { Router } from "express";
import {
  createBrand,
  deleteBrand,
  getDetailBrand,
  getListBrand,
  updateBrand,
} from "./brand.controller.js";

const brandRouter = Router();
brandRouter.get("/", getListBrand);
brandRouter.get("/id", getDetailBrand);
brandRouter.post("/", createBrand);
brandRouter.patch("/:id", updateBrand);
brandRouter.delete("/:id", deleteBrand);

export default brandRouter;
