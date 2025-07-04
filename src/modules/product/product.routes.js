import { Router } from "express";
import {
  getDetailProduct,
  getListProduct,
} from "../product/product.controllers.js";

const productRotes = Router();

productRotes.get("/", getListProduct); // Lấy danh sách sản phẩm
productRotes.get("/:id", getDetailProduct); // Lấy chi tiết sản phẩm theo ID
// productRotes.post("/", createProduct); // Tạo mới sản phẩm
// productRotes.patch("/:id", updateProduct); // Cập nhật
// productRotes.delete("/:id", deleteProduct); // Xóa

export default productRotes;
