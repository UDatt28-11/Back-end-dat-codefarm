import createResponse from "../../common/utils/response.js";
import Color from "./color.model.js";

export const createColor = async (req, res) => {
  const { name, hex } = req.body;
  const exists = await Color.findOne({ name });
  if (exists) return res.status(400).json({ message: "Màu đã tồn tại" });
  const color = await Color.create({ name, hex });
  return res
    .status(201)
    .json(createResponse(true, 201, "Thêm màu thành công", color));
};

export const getAllColors = async (req, res) => {
  const colors = await Color.find();
  return res.status(200).json(createResponse(true, 200, "OK", colors));
};

export const updateColor = async (req, res) => {
  const { id } = req.params;
  const { name, hex } = req.body;
  const updated = await Color.findByIdAndUpdate(
    id,
    { name, hex },
    { new: true }
  );
  return res.status(200).json(createResponse(true, 200, "OK", updated));
};
