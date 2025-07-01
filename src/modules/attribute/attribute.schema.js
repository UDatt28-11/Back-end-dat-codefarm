import { z } from "zod";

export const attributeSchema = z.object({
  attributeName: z.string().min(1, "Attribute name is required"),
  attributeCode: z.string().min(1, "Attribute code is required"),
  description: z.string().optional(),
  deletedAt: z.date().nullable().optional(),
});
