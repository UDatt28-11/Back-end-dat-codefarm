import createError from "../../common/utils/error.js";
import handleAsync from "../../common/utils/handleAsync.js";
import createResponse from "./../../common/utils/response.js";
import MESSAGES from "./../../common/contstants/messages.js";
import Product from "./product.model.js";

export const getListProduct = handleAsync(async (req, res, next) => {
  const { q } = req.query;
  const filter = q
    ? {
        title: { $regex: q, $options: "i" }, // tìm không phân biệt hoa thường
      }
    : {};
  // const skip = (page - 1) * limit;

  const data = await Product.find(filter).populate("subCategory");
  if (!data || data.length === 0) {
    return next(createError(404, MESSAGES.PRODUCT.NOT_FOUND));
  }
  return res.json(
    createResponse(true, 200, MESSAGES.PRODUCT.GET_SUCCESS, data)
  );
});

export const getDetailProduct = handleAsync(async (req, res, next) => {
  const data = await Product.findById(req.params.id)
    .populate("category")
    .populate("subCategory");
  if (!data) {
    return next(createError(404, MESSAGES.PRODUCT.NOT_FOUND));
  }
  return res.json(
    createResponse(true, 200, MESSAGES.PRODUCT.GET_SUCCESS, data)
  );
});

export const createProduct = handleAsync(async (req, res, next) => {
  const { brand, subCategory } = req.body;
  // * Kiểm tra xem brand, category có còn tồn tại không?

  const product = await Product.create(req.body);

  if (!product) {
    return next(createError(500, MESSAGES.PRODUCT.CREATE_ERROR));
  }
  return res.json(
    createResponse(true, 201, MESSAGES.PRODUCT.CREATE_SUCCESS, product)
  );
});

export const updateProduct = handleAsync(async (req, res, next) => {
  const { id } = req.params;
  const updated = await Product.findByIdAndUpdate(id, req.body, { new: true });
  //Nếu không tìm thấy sản phẩm
  if (!updated) {
    return next(createError(404, MESSAGES.PRODUCT.UPDATE_ERROR));
  }
  return res.json(
    createResponse(true, 200, MESSAGES.PRODUCT.UPDATE_SUCCESS, updated)
  );
});

// Xóa sản phẩm
export const deleteProduct = handleAsync(async (req, res, next) => {
  const { id } = req.params;
  // dùng findbyidanddeletee để xóa vĩnh viễn
  const deleted = await Product.findByIdAndDelete(id);
  if (!deleted) {
    return next(createError(404, MESSAGES.PRODUCT.DELETE_ERROR));
  }
  return res.json(
    createResponse(true, 200, MESSAGES.PRODUCT.DELETE_SUCCESS, deleted)
  );
});

// Xóa mền
export const softDeleteProduct = handleAsync(async (req, res, next) => {
  const { id } = req.params;
  const deleted = await Product.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true }
  );
  if (!deleted) {
    return next(createError(404, MESSAGES.PRODUCT.DELETE_ERROR));
  }
  return res.json(
    createResponse(true, 200, MESSAGES.PRODUCT.DELETE_SUCCESS, deleted)
  );
});
// Khôi phục  sản phẩm bị soft delete
export const restoreProduct = handleAsync(async (req, res, next) => {
  const { id } = req.params;
  const restored = await Product.findByIdAndUpdate(
    id,
    { deleted: false },
    { new: true }
  );
  if (!restored) {
    return next(createError(404, MESSAGES.PRODUCT.RESTORE_FAILED));
  }
  return res.json(
    createResponse(true, 200, MESSAGES.AUTH.REGISTER_SUCCESS, restored)
  );
});
export const updateVariants = handleAsync(async (req, res, next) => {
  const { productId } = req.body;
  // * Kiểm tra xem productId có tồn tại không?

  const product = await Product.findByIdAndUpdate(
    productId,
    {
      $push: { variants: req.body.variants },
    },
    { new: true }
  );

  if (!product) {
    return next(createError(500, MESSAGES.PRODUCT.CREATE_FAILED));
  }
  return res.json(
    createResponse(true, 201, MESSAGES.PRODUCT.CREATE_SUCCESS, product)
  );
});
