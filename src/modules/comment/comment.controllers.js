import createError from "../../common/utils/error.js";
import createResponse from "../../common/utils/response.js";
import MESSAGES from "./../../common/contstants/messages.js";
import handleAsync from "./../../common/utils/handleAsync.js";
import Comment from "./comment.model.js";

// Tạo bình luận
export const createComment = handleAsync(async (req, res, next) => {
  const { content, rating, images, productId } = req.body;
  const userId = req.user.id;

  const data = await Comment.create({
    userId,
    productId,
    content,
    rating,
    images,
  });

  return res.json(
    createResponse(true, 201, MESSAGES.COMMENT.CREATE_SUCCESS, data)
  );
});

// Lấy danh sách bình luận
export const getListComment = handleAsync(async (req, res, next) => {
  const { productId, userId, isApproved } = req.query;

  const filter = {};
  if (productId) filter.productId = productId;
  if (userId) filter.userId = userId;
  if (isApproved !== undefined) filter.isApproved = isApproved;

  const data = await Comment.find(filter)
    .populate("userId", "name")
    .sort({ createdAt: -1 });

  if (!data.length) {
    return next(createError(404, MESSAGES.COMMENT.NOT_FOUND));
  }

  return res.json(
    createResponse(true, 200, MESSAGES.COMMENT.GET_SUCCESS, data)
  );
});

// Lấy chi tiết 1 bình luận
export const getDetailComment = handleAsync(async (req, res, next) => {
  const data = await Comment.findById(req.params.id).populate("userId", "name");
  if (!data) return next(createError(404, MESSAGES.COMMENT.NOT_FOUND));

  return res.json(
    createResponse(true, 200, MESSAGES.COMMENT.GET_SUCCESS, data)
  );
});

// Cập nhật bình luận
export const updateComment = handleAsync(async (req, res, next) => {
  const comment = await Comment.findById(req.params.id);
  if (!comment) return next(createError(404, MESSAGES.COMMENT.NOT_FOUND));

  const isOwner = comment.userId.toString() === req.user.id;
  if (!isOwner && !req.user.isAdmin) {
    return next(createError(403, MESSAGES.COMMENT.UPDATE_DENIED));
  }

  const { content, rating, images } = req.body;
  comment.content = content ?? comment.content;
  comment.rating = rating ?? comment.rating;
  comment.images = images ?? comment.images;

  const data = await comment.save();
  return res.json(
    createResponse(true, 200, MESSAGES.COMMENT.UPDATE_SUCCESS, data)
  );
});

// Xóa bình luận (hard)
export const deleteComment = handleAsync(async (req, res, next) => {
  const comment = await Comment.findById(req.params.id);
  if (!comment) return next(createError(404, MESSAGES.COMMENT.NOT_FOUND));

  const isOwner = comment.userId.toString() === req.user.id;
  if (!isOwner && !req.user.isAdmin) {
    return next(createError(403, MESSAGES.COMMENT.DELETE_DENIED));
  }

  await comment.deleteOne();
  return res.json(createResponse(true, 200, MESSAGES.COMMENT.DELETE_SUCCESS));
});

// Duyệt bình luận
export const approveComment = handleAsync(async (req, res, next) => {
  const data = await Comment.findByIdAndUpdate(
    req.params.id,
    { isApproved: true },
    { new: true }
  );
  if (!data) return next(createError(404, MESSAGES.COMMENT.NOT_FOUND));

  return res.json(
    createResponse(true, 200, MESSAGES.COMMENT.APPROVE_SUCCESS, data)
  );
});
