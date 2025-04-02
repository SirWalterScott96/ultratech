"use server";

import { prisma } from "@/db/prisma";

export async function getHomeReviews() {
  return prisma.review.findMany({
    where: {
      productSlug: null,
    },
  });
}
