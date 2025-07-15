import mongoose from "mongoose";
import { string } from "zod/v4";

const orderSchema = new mongoose.Schema(
  {
    orderCode: {
      type: Number,
    },
    userId: {
      type: String,
    },
    address: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    note: { type: String },
    products: {
      type: [
        {
          name: {
            type: String,
          },
          price: {
            type: Number,
          },
          quantity: {
            type: Number,
          },
        },
      ],
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    paymenMethods: {
      type: String,
      enum: ["COD", "ONLINE"],
    },
    status: {
      type: String,
      enum: ["pending", "confirm", "shipping", "delivered", "done"],
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
