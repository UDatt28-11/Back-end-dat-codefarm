import createResponse from "../../common/utils/response.js";
import Size from "./size.model.js";

export const createSize = async (req, res) => {
  const { name } = req.body;
  const exists = await Size.findOne({ name });
  if (exists) return res.status(400).json({ message: "Size đã tồn tại" });
  const size = await Size.create({ name });
  return res
    .status(201)
    .json(createResponse(true, 201, "Thêm size thành công", size));
};

export const getAllSizes = async (req, res) => {
  const sizes = await Size.find();
  return res.status(200).json(createResponse(true, 200, "OK", sizes));
};

export const updateSize = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const updated = await Size.findByIdAndUpdate(id, { name }, { new: true });
  return res.status(200).json(createResponse(true, 200, "OK", updated));
};
