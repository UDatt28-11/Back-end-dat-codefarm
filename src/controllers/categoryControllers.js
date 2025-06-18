import Category from "../models/Category";
import createError from "../utils/error.js";
import handleAsync from "../utils/handleAsync.js";
import createResponse from "../utils/response.js";

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
  const { id } = req.params;
  if (id) {
    const data = await Category.findById(id);
    return res.json(
      createResponse(true, 200, "Category detail successfully", data)
    );
  }
  next(createError(false, 404, "Category not found"));
});

export const updateCategory = handleAsync(async (req, res, next) => {
  const { id } = req.params;
  if (id) {
    const data = await Category.findByIdAndUpdate(id, req.body);
    return res.json(
      createResponse(true, 200, "Category updated successfully", data)
    );
  }
  next(createError(false, 404, "Category update found"));
});
export const deleteCategory = handleAsync(async (req, res, next) => {
  const { id } = req.params;
  if (id) {
    const data = await Category.findByIdAndDelete(id);
    return res.json(
      createResponse(true, 200, "Category deleted successfully", data)
    );
  }
  next(createError(false, 404, "Category delete found"));
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
