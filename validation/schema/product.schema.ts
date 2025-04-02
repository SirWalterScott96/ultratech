import { z } from "zod";

export const CategoryEnum = z.enum(["tablet", "phone", "tv"]);
const BrandEnum = z.enum(["Samsung", "Huawei"]);

const CharacteristicRowSchema = z.tuple([z.string(), z.string()]);

export const CharacteristicGroupSchema = z.tuple([
  z.string(),
  z.array(CharacteristicRowSchema),
]);

export const DescriptionInfoSchema = z.object({
  description: z.array(CharacteristicGroupSchema),
});

export const ReviewSchema = z.object({
  id: z.number().int().positive(),
  author: z.string().min(1),
  reviewBody: z.string().min(1),
  rating: z.number().int().min(1).max(5),
  createdAt: z.date(),
  productSlug: z.string().min(1).nullable().optional(),
});

export const ProductSchema = z.object({
  slug: z.string().min(1),
  category: CategoryEnum,
  brand: BrandEnum,
  model: z.string().min(1),
  fullName: z.string().min(1),
  memory: z.number().int().positive().optional().nullable(),
  images: z.array(z.string()),
  price: z.number().int().positive(),
  oldPrice: z.number().int().positive().optional().nullable(),
  isNew: z.boolean().optional().nullable(),
  isBestseller: z.boolean().optional().nullable(),
  inStock: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
  descriptionInfo: DescriptionInfoSchema,
  reviews: z.array(ReviewSchema).optional(),
});

export const CreateProductSchema = ProductSchema.omit({
  createdAt: true,
  updatedAt: true,
});

export const UpdateProductSchema = CreateProductSchema.partial();
