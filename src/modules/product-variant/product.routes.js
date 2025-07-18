import { Router } from "express";
import { createProductVariantAttribute } from "./product-variant.controller.js";
const testRouter = Router();

testRouter.post("/test-variant", createProductVariantAttribute);

export default testRouter;
