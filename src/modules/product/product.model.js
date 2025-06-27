import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    thumbnail: { type: String, required: true },
    description: { type: String, default: "" },
    shortDescription: { type: String, default: "" },
    specifications: { type: Object, default: {} },
    priceDefault: { type: Number, required: true },
    slug: { type: String, required: true, unique: true },
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brand",
      required: true,
    },
    subCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubCategory",
      required: true,
    },
    soldCountTotal: { type: Number, default: 0 },
    seoTitle: { type: String, default: "" },
    seoDescription: { type: String, default: "" },
    tags: { type: [String], default: [] },
    variants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ProductVariant",
        required: true,
      },
    ],
    deletedAt: { type: Date, default: null },
    deletedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { versionKey: false, timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
