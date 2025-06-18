import { Router } from "express";
import productRotes from "./productRoutes.js";
import categoryRoutes from "./categoryRoutes.js";

const router = Router();

router.use("/products", productRotes);
router.use("/categories", categoryRoutes);

export default router;
