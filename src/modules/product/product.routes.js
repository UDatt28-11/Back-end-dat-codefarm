import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getDetailProduct,
  getListProduct,
  restoreProduct,
  softDeleteProduct,
  updateProduct,
  uploadProductImage,
} from "../product/product.controllers.js";
import upload from "../../common/middlewares/upload.js";

const productRotes = Router();

productRotes.get("/", getListProduct); // Lấy danh sách sản phẩm
productRotes.get("/:id", getDetailProduct); // Lấy chi tiết sản phẩm theo ID
productRotes.post(
  "/",
  upload.fields([{ name: "thumbnail", maxCount: 1 }]),
  createProduct
); // Tạo mới sản phẩm
productRotes.patch("/:id", updateProduct); // Cập nhật
productRotes.patch("/restore/:id", restoreProduct); // Khôi phục sản phẩm nhật
productRotes.delete("/soft-delete/:id", softDeleteProduct); // Xóa mền
productRotes.delete("/:id", deleteProduct); // Xóa
//Upload ảnh
productRotes.post("/upload-image", upload.single("image"), uploadProductImage);

export default productRotes;
