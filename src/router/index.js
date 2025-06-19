import { Router } from "express";

import productRotes from "../modules/product/product.routes.js";
import categoryRoutes from "../modules/category/category.routes.js";
const router = Router();

router.use("/products", productRotes);
router.use("/categories", categoryRoutes);

export default router;
