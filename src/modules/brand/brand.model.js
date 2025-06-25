import mongoose from "mongoose";

const brandSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    logoUrl: { type: String, required: true },
    description: { type: String, default: "" },
    deletedAt: { type: Date, default: null },
    slug: { type: String, required: true, unique: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Brand = mongoose.model("Brand", brandSchema);

export default Brand;
