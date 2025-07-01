import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        variantId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "ProductVariant",
        },
        quantity: { type: Number, required: true, default: 1 },
      },
    ],
    totalPrice: { type: Number, required: true, default: 0 },
    totalQuantity: { type: Number, required: true, default: 0 },
    createdAt: { type: Date, default: Date.now },
    deletedAt: { type: Date, default: null },
  },
  {
    timeseries: true,
  }
);
const Cart = mongoose.model("Cart ", cartSchema);
export default Cart;
