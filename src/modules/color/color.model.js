import mongoose from "mongoose";
const colorSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  hex: { type: String }, // VD: #FF0000
});
const Color = mongoose.model("Color", colorSchema);
export default Color;
