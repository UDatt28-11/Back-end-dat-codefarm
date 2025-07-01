import mongoose from "mongoose";

const attributeValueSchema = new mongoose.Schema(
  {
    value: { type: String, required: true, unique: true },
    attributeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Attribute",
      required: true,
    },
    deteledAt: { type: Date, default: null },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const AttributeValue = mongoose.model("AttributeValue", attributeValueSchema);

export default AttributeValue;
