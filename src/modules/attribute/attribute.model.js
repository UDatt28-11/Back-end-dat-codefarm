import mongoose from "mongoose";

const attributeSchema = new mongoose.Schema(
  {
    attributeName: { type: String, required: true, unique: true }, // Màu sắc
    attributeCode: { type: String, required: true, unique: true }, // col
    description: { type: String, default: "" },
    deletedAt: { type: Date, default: null },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Attribute = mongoose.model("Attribute", attributeSchema);

export default Attribute;
