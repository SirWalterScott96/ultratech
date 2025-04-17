"use server";
import { Category } from "@/types";
import { convertToPlainObject } from "../utils";
import { prisma } from "@/db/prisma";
import { z } from "zod";
import { DescriptionInfoSchema } from "@/validation/schema";

type SearchType = "isNew" | "isBestseller";

// Get products by feature(isNew or isBestseller)
export async function getProductBy({ types }: { types: SearchType }) {
  const whereCondition =
    types === "isNew" ? { isNew: true } : { isBestseller: true };

  const data = await prisma.product.findMany({
    where: whereCondition,
  });

  return convertToPlainObject(data);
}

// Get all products
export async function getAllProducts() {
  const product = await prisma.product.findMany();
  return convertToPlainObject(product);
}

// Get products length
export async function getProductsLength() {
  const productsLength = (await prisma.product.findMany()).length;
  return productsLength;
}

// Get single product by it's slug
export async function getProductBySlugAndLocale(slug: string, locale: string) {
  try {
    const product = await prisma.product.findUnique({
      where: { slug },
      include: {
        ProductTranslation: {
          where: { locale },
        },
        reviews: true,
      },
    });

    if (!product || product.ProductTranslation.length === 0) return null;

    // Перетворюємо дані до правильного типу
    const descriptionInfo = product.ProductTranslation[0]
      .descriptionInfo as unknown as z.infer<typeof DescriptionInfoSchema>;

    return {
      ...product,
      descriptionInfo,
    };
  } catch (error) {
    console.error("Error fetching product by slug and locale:", error);
    return null;
  }
}

export async function getProductsByCategory({
  category,
}: {
  category: Category;
}) {
  const data = await prisma.product.findMany({ where: { category: category } });
  return convertToPlainObject(data);
}
