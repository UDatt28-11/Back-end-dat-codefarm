import mongoose from "mongoose";
const commentSchema = new mongoose.Schema(
  {
    userId: {
      //Liên kết bình luận với người dùng
      type: mongoose.Schema.Types.ObjectId,
      // Để mongoose biết liên kết với bảng nào
      ref: "User",
      required: true,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    images: [String],
    isApproved: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);
// tạo index theo userId để tố ưu khi tìm tất cả bình luận của một người dùng
commentSchema.index({ userId: 1 });
//Tạo index theo productId để tìm nhanh bình luận của một sản phẩm
commentSchema.index({ productId: 1 });
// Tạo index giảm dần theo createdAt để lấy tất cả các bình luận mới nhất trước
commentSchema.index({ createdAt: -1 });

const Comment = mongoose.model("Comment", commentSchema);
export default Comment;
