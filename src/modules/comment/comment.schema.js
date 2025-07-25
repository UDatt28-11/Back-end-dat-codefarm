import { z } from "zod";

export const commentSchema = z.object({
  productId: z
    .string({
      required_error: "Thiếu productId",
    })
    .min(1, "productId không được để trống"),

  content: z
    .string({
      required_error: "Nội dung bình luận là bắt buộc",
    })
    .min(1, "Nội dung không được để trống"),

  rating: z
    .number({
      required_error: "Vui lòng đánh giá sao",
      invalid_type_error: "rating phải là số",
    })
    .min(1, "Tối thiểu là 1 sao")
    .max(5, "Tối đa là 5 sao"),

  images: z.array(z.string().url("URL ảnh không hợp lệ")).optional(),
});
