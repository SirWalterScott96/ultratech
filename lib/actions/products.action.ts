"use server";
import { Category } from "@/types";
import { convertToPlainObject } from "../utils";
import { prisma } from "@/db/prisma";

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
  const data = await prisma.product.findMany();
  return convertToPlainObject(data);
}

// Get products length
export async function getProductsLength() {
  const productsLength = (await prisma.product.findMany()).length;
  return productsLength;
}

// Get single product by it's slug
export async function getProductBySlug(slug: string) {
  return prisma.product.findFirst({
    where: {
      slug: slug,
    },
    include: {
      reviews: true,
    },
  });
}

export async function getProductsByCategory({
  category,
}: {
  category: Category;
}) {
  const data = await prisma.product.findMany({ where: { category: category } });
  return convertToPlainObject(data);
}
