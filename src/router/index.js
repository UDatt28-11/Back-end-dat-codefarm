import { Router } from "express";

import productRotes from "../modules/product/product.routes.js";
import categoryRoutes from "../modules/category/category.routes.js";
import subCategoryRoutes from "./../modules/subcategory/subcategory.routes";
const router = Router();

router.use("/products", productRotes);
router.use("/categories", categoryRoutes);
router.use("/sub-categories", subCategoryRoutes);

export default router;
