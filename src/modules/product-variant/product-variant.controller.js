import handleAsync from "../../common/utils/handleAsync.js";
import ProductVariant from "./product-variant.model.js";

export const createProductVariantAttribute = handleAsync(async (req, res) => {
  const create = await ProductVariant.create(req.body);
  return res.status(201).json({
    data: create,
  });
});
