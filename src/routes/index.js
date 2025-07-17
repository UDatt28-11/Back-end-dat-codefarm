import { Router } from "express";

import productRotes from "../modules/product/product.routes.js";
import categoryRoutes from "../modules/category/category.routes.js";
import subCategoryRoutes from "../modules/subcategory/subcategory.routes.js";
import authRoutes from "../modules/auth/auth.routes.js";
import cartRouter from "../modules/cart/cart.routes.js";
import orderRouter from "../modules/order/order.routes.js";
import { verifyUser } from "../common/middlewares/verifyUser.js";
import { authMiddleware } from "../common/middlewares/authMiddleware.js";
import commentRouter from "./../modules/comment/comment.routes.js";
import userRoutes from "../modules/user/user.routes.js";
import sizeRoutes from "../modules/size/size.routes.js";
import colorRoutes from "../modules/color/color.routes.js";
import brandRouter from "../modules/brand/brand.routes.js";
const router = Router();

router.use("/auth", authRoutes);
router.use("/products", productRotes);
router.use("/sizes", sizeRoutes);
router.use("/colors", colorRoutes);

router.use("/brand", brandRouter);
router.use("/categories", categoryRoutes);
router.use("/sub-categories", subCategoryRoutes);

router.use("/cart", authMiddleware, verifyUser, cartRouter);
router.use("/order", orderRouter);
router.use("/comment", commentRouter);
router.use("/user", userRoutes);

export default router;
