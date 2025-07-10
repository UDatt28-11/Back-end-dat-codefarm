import MESSAGES from "../../common/contstants/messages.js";
import createError from "../../common/utils/error.js";
import handleAsync from "../../common/utils/handleAsync.js";
import createResponse from "../../common/utils/response.js";
import ProductVariant from "../product-variant/product-variant.model.js";
import Cart from "./cart.model.js";

export const getCart = handleAsync(async (req, res, next) => {
  // Tìm giỏ hàng theo userId tương ứng
  console.log(req.user);
  const cart = await Cart.findOne({ userId: req.user._id });
  console.log(cart);
  return res.json(createResponse(true, 200, MESSAGES.CART.GET_SUCCESS, cart));
});
export const addCart = handleAsync(async (req, res, next) => {
  // Lấy userId từ request
  const userId = req.user._id;
  // Lấy thông tin sản phẩm người dùng gửi lên từ body (Post)
  const { product, variant, quantity } = req.body;
  // Tìm giỏ hàng theo userId
  const cart = await Cart.findOne({ userId });
  //Nếu chưa chọn variant mà cố thêm vào thì trả ra lệnh này và thêm rồi thì Gửi về client thông báo thành công cùng giỏ hàng cập nhập
  if (!variant) {
    return next(createError(400, MESSAGES.CART.NO_VARIANT_SELECTED));
  }
  //Tìm biến thể sản phẩm để kiếm hàng tồn kho
  const selectedVariant = await ProductVariant.findById(variant);
  if (!selectedVariant) {
    return next(createError(400, MESSAGES.CART.NO_VARIANT));
  }
  // Tìm xem trong giỏ hàng có item với product + variant giống cái người dùng muốn thêm không
  const existingItem = cart.items.find(
    (item) =>
      item.product.toString() === product && item.variant.toString() === variant
  );
  // Nếu có sản phẩm í rồi thêm số lượng nếu chưa có thì thêm mới vào giỏ hàng
  const newQuantity = existingItem
    ? existingItem.quantity + quantity
    : quantity;
  // kiểm tra tồn kho
  if (newQuantity > selectedVariant.stock) {
    return next(createError(400, MESSAGES.CART.ERROR_STOCK));
  }
  // nếu hợp lệ thì thêm mới
  if (existingItem) {
    existingItem.quantity = newQuantity;
  } else {
    cart.items.push({ product, variant, quantity });
  }
  //Lưu lại thay đổi trong database
  await cart.save();

  return res.json(
    createResponse(true, 200, MESSAGES.CART.ADD_ITEM_SUCCESS, cart)
  );
});

export const updateCart = handleAsync(async (req, res, next) => {
  // Lay thong tin nguoi dung
  const userId = req.user._id;
  const { productId } = req.params;
  const { variantId, quantity } = req.body;
  // Tim gio hang tuong ung voi nguoi dung
  const cart = await Cart.findOne({ userId });

  // sua item trong gio hang
  const item = cart.items.find(
    (item) =>
      item.product.toString() === productId &&
      item.variant.toString() === variantId
  );
  if (!item) {
    return next(createError(400, MESSAGES.CART.NO_ITEM_ERROR));
  }
  //Kiểm tra tồn kho trước khi cập nhật
  const selectedVariant = await ProductVariant.findById(variantId);
  // Kiểm tra biến thể
  if (!selectedVariant) {
    return next(createError(400, MESSAGES.CART.NO_VARIANT));
  }
  // Kiểm tra số lượng
  if (quantity > selectedVariant.stock) {
    return next(createError(400, MESSAGES.CART.ERROR_STOCK));
  }
  item.quantity = quantity;
  //luu du lieu vao data base
  await cart.save();
  return res.json(
    createResponse(true, 200, MESSAGES.CART.UPDATE_ITEM_SUCCESS, cart)
  );
});

export const deleteCartItem = handleAsync(async (req, res, next) => {
  //Lấy thông tin
  const userId = req.user._id;
  const { productId } = req.params;
  const { variantId } = req.body;
  //Tìm giỏ hàng tương ứng với người dùng
  const cart = await Cart.findOne({ userId });
  //Xóa item trong giỏ hàng
  cart.items = cart.items.filter(
    (item) =>
      !(
        item.product.toString() === productId &&
        item.variant.toString() === variantId
      )
  );
  // Lưu du lieu vao data base
  await cart.save();
  // phản hồi với người dùng
  return res.json(
    createResponse(true, 200, MESSAGES.CART.REMOVE_ITEM_SUCCESS, cart)
  );
});
export const clearCart = handleAsync(async (req, res, next) => {
  // Lay thong tin
  const userId = req.user._id;
  // tim gio hang tuong ung voi nguoi dung
  const cart = await Cart.findOne({ userId });
  // Co bao nhieu san pham trong gio hang xoa het
  cart.items = [];
  // luu du lieu vao data base
  await cart.save();
  //Phan hoi voi nguoi dung
  return res.json(
    createResponse(true, 200, MESSAGES.CART.CLEAR_CART_SUCCESS, cart)
  );
});
