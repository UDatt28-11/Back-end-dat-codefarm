import Color from "./color.model.js";

export const createColor = async (req, res) => {
  const { name, hex } = req.body;
  const exists = await Color.findOne({ name });
  if (exists) return res.status(400).json({ message: "Màu đã tồn tại" });
  const color = await Color.create({ name, hex });
  res.json(color);
};

export const getAllColors = async (req, res) => {
  const colors = await Color.find();
  res.json(colors);
};

export const updateColor = async (req, res) => {
  const { id } = req.params;
  const { name, hex } = req.body;
  const updated = await Color.findByIdAndUpdate(
    id,
    { name, hex },
    { new: true }
  );
  res.json(updated);
};

export const deleteColor = async (req, res) => {
  await Color.findByIdAndDelete(req.params.id);
  res.json({ message: "Đã xóa màu" });
};
