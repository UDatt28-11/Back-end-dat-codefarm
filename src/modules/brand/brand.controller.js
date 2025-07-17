import createError from "../../common/utils/error.js";
import handleAsync from "../../common/utils/handleAsync.js";
import createResponse from "../../common/utils/response.js";
import Brand from "./brand.model.js";

export const getListBrand = handleAsync(async (req, res) => {
  const data = await Brand.find({ deletedAt: null });
  return res.json(
    createResponse(true, 200, "Lấy danh sách thương hiệu thành công", data)
  );
});

export const getDetailBrand = handleAsync(async (req, res, next) => {
  const { id } = req.params;
  const brand = await Brand.findById(id);
  if (!brand || brand.deletedAt) {
    return next(createError(404, "Thương hiệu không tồn tại"));
  }
  return res.json(createResponse(true, 200, "Chi tiết thương hiệu", brand));
});

export const createBrand = handleAsync(async (req, res, next) => {
  const existing = await Brand.findOne({ title: req.body.title });
  if (existing) {
    return next(createError(400, "Thương hiệu đã tồn tại"));
  }

  const brand = await Brand.create(req.body);
  if (!brand) {
    return next(createError(500, "Tạo thương hiệu thất bại"));
  }

  return res.json(
    createResponse(true, 201, "Tạo thương hiệu thành công", brand)
  );
});

export const updateBrand = handleAsync(async (req, res, next) => {
  const { id } = req.params;
  const brand = await Brand.findByIdAndUpdate(id, req.body, { new: true });
  if (!brand) {
    return next(createError(404, "Không tìm thấy thương hiệu để cập nhật"));
  }
  return res.json(
    createResponse(true, 200, "Cập nhật thương hiệu thành công", brand)
  );
});

export const deleteBrand = handleAsync(async (req, res, next) => {
  const { id } = req.params;
  const brand = await Brand.findByIdAndUpdate(
    id,
    { deletedAt: new Date() },
    { new: true }
  );
  if (!brand) {
    return next(createError(404, "Không tìm thấy thương hiệu để xóa"));
  }
  return res.json(
    createResponse(true, 200, "Xóa thương hiệu thành công", brand)
  );
});
