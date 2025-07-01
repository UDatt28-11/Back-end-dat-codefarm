import createError from "../../common/utils/error.js";
import handleAsync from "../../common/utils/handleAsync.js";
import createResponse from "./../../common/utils/response.js";
import MESSAGES from "./../../common/contstants/messages.js";
import Product from "./product.model.js";

export const getListProduct = handleAsync(async (req, res, next) => {
  const data = await Product.find().populate("subCategory");
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
    return next(createError(500, MESSAGES.PRODUCT.CREATE_FAILED));
  }
  return res.json(
    createResponse(true, 201, MESSAGES.PRODUCT.CREATE_SUCCESS, product)
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
