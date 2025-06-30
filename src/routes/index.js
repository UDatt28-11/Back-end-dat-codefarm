import { Router } from "express";

import productRotes from "../modules/product/product.routes.js";
import categoryRoutes from "../modules/category/category.routes.js";
import subCategoryRoutes from "../modules/subcategory/subcategory.routes.js";
import authRoutes from "../modules/auth/auth.routes.js";
const router = Router();

router.use("/products", productRotes);
router.use("/auth", authRoutes);

router.use("/categories", categoryRoutes);
router.use("/sub-categories", subCategoryRoutes);

export default router;
