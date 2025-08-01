import createError from "../../common/utils/error.js";
import handleAsync from "../../common/utils/handleAsync.js";
import createResponse from "./../../common/utils/response.js";
import MESSAGES from "./../../common/contstants/messages.js";
import Product from "./product.model.js";
import { uploadSingleFile } from "../../common/utils/cloudinary.js";
import ProductVariant from "../product-variant/product-variant.model.js";

export const getListProduct = handleAsync(async (req, res, next) => {
  const {
    q,
    page = 1,
    limit = 9,
    minPrice = 0,
    maxPrice = 1000000,
    sortBy = "title",
    order = "asc",
    filter,
  } = req.query;

  const skip = (page - 1) * limit;

  const query = {};

  // Tìm kiếm theo tên sản phẩm
  if (q) {
    query.title = { $regex: q, $options: "i" };
  }

  // Lọc theo giá
  // query.price = { $gte: Number(minPrice), $lte: Number(maxPrice) };

  // Lọc theo trạng thái sale hoặc new
  // if (filter === "sale") {
  //   query.sale = true;
  // } else if (filter === "new") {
  //   query.sale = false;
  // }

  // Sắp xếp
  const sort = {};
  sort[sortBy] = order === "desc" ? -1 : 1;

  const data = await Product.find(query)
    .populate("subCategory")
    .sort(sort)
    .skip(Number(skip))
    .limit(Number(limit));

  if (!data || data.length === 0) {
    return next(createError(404, MESSAGES.PRODUCT.NOT_FOUND));
  }

  // Optionally: Đếm tổng số sản phẩm (phục vụ phân trang phía client)
  const total = await Product.countDocuments(query);

  return res.json(
    createResponse(true, 200, MESSAGES.PRODUCT.GET_SUCCESS, {
      products: data,
      total,
      page: Number(page),
      limit: Number(limit),
    })
  );
});

export const getDetailProduct = handleAsync(async (req, res, next) => {
  const data = await Product.findById(req.params.id)
    .populate("category")
    .populate("subCategory")
    .populate("brand")
    .populate({
      path: "variants",
      populate: [
        { path: "colorId", model: "Color" },
        { path: "sizeId", model: "Size" },
      ],
    });

  if (!data) {
    return next(createError(404, MESSAGES.PRODUCT.NOT_FOUND));
  }

  return res.json(
    createResponse(true, 200, MESSAGES.PRODUCT.GET_SUCCESS, data)
  );
});

export const createProduct = handleAsync(async (req, res, next) => {
  // const { brand, subCategory } = req.body;
  const files = req.files;
  const thumbnail = files?.thumbnail[0];
  const payload = { ...req.body };
  const product = new Product(payload);

  let variantsId = [];
  if (thumbnail) {
    const thumnailData = await uploadSingleFile(thumbnail);
    product.thumbnail = thumnailData.downloadUrl;
  }
  if (req.body.variants) {
    const variantsBody = JSON.parse(req.body.variants);
    const insertVariantsData = variantsBody.map((item) => {
      return {
        ...item,
        productId: product._id,
      };
    });
    const newVariants = await ProductVariant.insertMany(insertVariantsData);
    newVariants.forEach((item) => variantsId.push(item._id));
  }
  product.variants = variantsId;
  if (!product) {
    return next(createError(500, MESSAGES.PRODUCT.CREATE_ERROR));
  }
  console.log(product);
  await product.save();
  return res.json(
    createResponse(true, 201, MESSAGES.PRODUCT.CREATE_SUCCESS, product)
  );
});

export const updateProduct = handleAsync(async (req, res, next) => {
  const { id } = req.params;

  // Nếu có file ảnh mới, cập nhật ảnh
  if (req.file && req.file.path) {
    req.body.image = req.file.path;
  }

  const updated = await Product.findByIdAndUpdate(id, req.body, { new: true });

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
export const uploadProductImage = handleAsync(async (req, res, next) => {
  if (!req.file) {
    return next(createError(400, "Không có ảnh được upload"));
  }

  const imageUrl = req.file.path;

  return res.json(
    createResponse(true, 201, MESSAGES.PRODUCT.UPLOAD_IMAGE_SUCCESS, {
      url: imageUrl,
    })
  );
});
