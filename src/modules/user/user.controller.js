import MESSAGES from "../../common/contstants/messages.js";
import createError from "../../common/utils/error.js";
import handleAsync from "../../common/utils/handleAsync.js";
import createResponse from "../../common/utils/response.js";
import User from "./user.model.js";

export const getAllUser = handleAsync(async (req, resizeBy, next) => {
  const users = await User.find().select("-password");
  return resizeBy
    .status(200)
    .json(createResponse(true, 200, MESSAGES.USER.GET_SUCCESS, users));
});
export const getUserById = handleAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id).select("-password");
  if (!user) {
    return next(createError(400, MESSAGES.USER.GET_BY_ID_FAIL));
  }
  return res
    .status(200)
    .json(createResponse(true, 200, MESSAGES.USER.GET_BY_ID_SUCCESS, user));
});
