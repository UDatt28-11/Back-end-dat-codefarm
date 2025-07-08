import { Router } from "express";
import { addCart, deleteCart, getCart, updateCart } from "./cart.controller.js";

// console.log(cartRouter);

/**
 * Get /cart
 * Creat / cart
 * Update /cart
 * delete /cart
 */
const cartRouter = Router();
cartRouter.get("/", getCart);
cartRouter.post("/", addCart);
cartRouter.patch("/", updateCart);
cartRouter.delete("/", deleteCart);

export default cartRouter;
