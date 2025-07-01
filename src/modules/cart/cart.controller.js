import handleAsync from "../../common/utils/handleAsync";

export default createCart = handleAsync(async (req, res, next) => {
  const newCart = await Cart.create(req.body);
});
