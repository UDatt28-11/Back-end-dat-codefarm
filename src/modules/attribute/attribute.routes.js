import { Router } from "express";
import validBodyRequest from "../../common/middlewares/validBodyRequest.js";
import {
  createAttribute,
  deleteAttribute,
  getAllAttribute,
  getAttributeById,
  restoreAttribute,
  softDeleteAttribute,
  updateAttribute,
} from "./attribute.controller.js";
import { attributeSchema } from "./attribute.schema.js";

const attributeRoutes = Router();

attributeRoutes.get("/", getAllAttribute);
attributeRoutes.get("/:id", getAttributeById);

// * Role: Admin
attributeRoutes.use();
attributeRoutes.delete("/:id", deleteAttribute);
attributeRoutes.patch("/soft-delete/:id", softDeleteAttribute);
attributeRoutes.patch("/restore/:id", restoreAttribute);

attributeRoutes.use(validBodyRequest(attributeSchema));
attributeRoutes.post("/", createAttribute);
attributeRoutes.patch("/:id", updateAttribute);

export default attributeRoutes;
