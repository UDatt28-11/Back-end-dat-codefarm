import Category from "./Category.model.js";
import createError from "../../common/utils/error.js";
import handleAsync from "../../common/utils/handleAsync.js";
import createResponse from "../../common/utils/response.js";
import findByIdCategory from "./category.service.js";

export const createCategory = handleAsync(async (req, res, next) => {
  const existing = await Category.findOne({ title: req.body.title });
  if (existing) return next(createError(400, "This Category already exists!"));
  const data = await Category.create(req.body);
  return res.json(
    createResponse(true, 201, "Category created successfully", data)
  );
});
export const getListCategory = handleAsync(async (req, res, next) => {
  const data = await Category.find();
  return res.json(
    createResponse(true, 200, "Category list category successfully", data)
  );
});

export const getDetailCategory = handleAsync(async (req, res, next) => {
  const data = await findByIdCategory(req.params.id);
  if (!data) {
    next(createError(false, 404, "Category not found"));
  }
  return res.json(
    createResponse(true, 200, "Category detail successfully", data)
  );
});

export const updateCategory = handleAsync(async (req, res, next) => {
  const data = await findByIdCategory(req.id);
  if (!data) {
    next(createError(false, 404, "Category not found"));
  }
  return res.json(
    createResponse(true, 200, "Category updated successfully", data)
  );
});
export const deleteCategory = handleAsync(async (req, res, next) => {
  const data = await findByIdCategory(req.id);
  if (!data) {
    next(createError(false, 404, "Category not found"));
  }
  return res.json(
    createResponse(true, 200, "Category deleted successfully", data)
  );
});
export const softDeleteCategory = handleAsync(async (req, res, next) => {
  const { id } = req.params;
  if (id) {
    await Category.findByIdAndUpdate(id, {
      deletedAt: new Date(),
    });
    return res.json(createResponse(true, 200, "Category soft hidden found"));
  }
  next(createError(false, 404, "Hidden Category soft delete found"));
});

export const restoreCategory = handleAsync(async (req, res, next) => {
  const { id } = req.params;
  if (id) {
    const data = await Category.findByIdAndUpdate(id, {
      deletedAt: null,
    });
    return res.json(
      createResponse(true, 200, "Category restored successfully", data)
    );
  }
  next(createError(false, 404, "Category restore found"));
});
