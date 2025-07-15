import { Router } from "express";
import {
  approveComment,
  createComment,
  deleteComment,
  getDetailComment,
  getListComment,
  updateComment,
} from "./comment.controllers.js";
import {
  authMiddleware,
  isAdmin,
} from "../../common/middlewares/authMiddleware.js";
import valiBodyRequest from "./../../common/middlewares/validBodyRequest.js";
import { commentSchema } from "./comment.schema.js";

const commentRouter = Router();
commentRouter.get("/", getListComment);
commentRouter.get("/:id", getDetailComment);
commentRouter.post(
  "/",
  authMiddleware,
  valiBodyRequest(commentSchema),
  createComment
);
commentRouter.put("/:id", authMiddleware, updateComment);
commentRouter.delete("/:id", authMiddleware, deleteComment);
commentRouter.patch("/:id/approve", authMiddleware, isAdmin, approveComment);

export default commentRouter;
