import Size from "./size.model.js";

export const createSize = async (req, res) => {
  const { name } = req.body;
  const exists = await Size.findOne({ name });
  if (exists) return res.status(400).json({ message: "Size đã tồn tại" });
  const size = await Size.create({ name });
  res.json(size);
};

export const getAllSizes = async (req, res) => {
  const sizes = await Size.find();
  res.json(sizes);
};

export const updateSize = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const updated = await Size.findByIdAndUpdate(id, { name }, { new: true });
  res.json(updated);
};

export const deleteSize = async (req, res) => {
  await Size.findByIdAndDelete(req.params.id);
  res.json({ message: "Đã xóa size" });
};
