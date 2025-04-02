import {
  CreateProductSchema,
  DescriptionInfoSchema,
  ProductSchema,
  UpdateProductSchema,
  ReviewSchema,
  CategoryEnum,
} from "@/validation/schema";
import { z } from "zod";

export type Product = z.infer<typeof ProductSchema>;
export type CreateProduct = z.infer<typeof CreateProductSchema>;
export type UpdateProduct = z.infer<typeof UpdateProductSchema>;
export type ProductsDescription = z.infer<typeof DescriptionInfoSchema>;
export type Review = z.infer<typeof ReviewSchema>;
export type Category = z.infer<typeof CategoryEnum>;
export type CartItem = Product & { quantity: number };