import { z } from "zod";

export const cartShema = z.object({
  userId: z.string().min(1),
  products: z.array(
    z.object({
      productId: z.string().min(1),
      quantity: z.number().min(1).max(1000),
    })
  ),
  totalPrice: z.number().min(0),
});
