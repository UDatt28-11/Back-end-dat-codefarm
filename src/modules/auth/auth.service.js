import Cart from "./../cart/cart.model";
const createCartForUser = async (userId) => {
  const cart = await Cart.create();
};
