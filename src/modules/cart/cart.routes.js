import { Router } from "express";
import {
  addCart,
  clearCart,
  deleteCartItem,
  getCart,
  updateCart,
} from "./cart.controller.js";
import { authMiddleware } from "../../common/middlewares/authMiddleware.js";

// console.log(cartRouter);

/**
 * Get /cart
 * Creat / cart
 * Update /cart
 * delete /cart
 */
const cartRouter = Router();
cartRouter.get("/", getCart);
cartRouter.post("/items", addCart);
cartRouter.patch("/items/:productId", updateCart);
cartRouter.delete("/items/:productId", deleteCartItem);
cartRouter.delete("/", clearCart);

export default cartRouter;
