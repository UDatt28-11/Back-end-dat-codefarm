import handleAsync from "../../common/utils/handleAsync.js";

export const updateCart = handleAsync(async (req, res, next) => {
  const user = req.user;
  console.log("cart: ", user);
});
export const getCart = handleAsync(async (req, res, next) => {});
export const addCart = handleAsync(async (req, res, next) => {
  const userId = req.user._id;
  const { product, variant, quantity } = req.body;
});

export const deleteCart = handleAsync(async (req, res, next) => {});

// export const addToCart = async (userId, productId, quantity) => {
//   let cart = await Cart.findOne({ userId });

//   if (!cart) {
//     cart = await Cart.create({ userId, items: [] });
//   }

//   const existingItem = cart.items.find(
//     (item) => item.product.toString() === productId
//   );

//   if (existingItem) {
//     existingItem.quantity += quantity;
//   } else {
//     cart.items.push({ product: productId, quantity });
//   }

//   await cart.save();
//   return cart;
// };

// import handleAsync from "../../common/utils/handleAsync.js";
// import { addToCart } from "./cart.service.js";

// export const addCart = handleAsync(async (req, res, next) => {
//   const userId = req.user._id;
//   const { product, quantity } = req.body;

//   // Kiểm tra đầu vào
//   if (!product || typeof quantity !== "number" || quantity < 1) {
//     return res.status(400).json({ message: "Dữ liệu không hợp lệ" });
//   }

//   // Gọi service xử lý
//   const updatedCart = await addToCart(userId, product, quantity);

//   // Trả kết quả
//   return res.status(200).json({
//     message: "Đã thêm vào giỏ hàng",
//     cart: updatedCart,
//   });
// });
