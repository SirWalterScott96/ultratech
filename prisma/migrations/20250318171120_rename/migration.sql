/*
  Warnings:

  - You are about to drop the `Device` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Device";

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "category" "Category" NOT NULL,
    "brand" "Brand" NOT NULL,
    "model" TEXT NOT NULL,
    "memory" INTEGER,
    "images" TEXT[],
    "price" INTEGER NOT NULL,
    "oldPrice" INTEGER,
    "isNew" BOOLEAN,
    "isBestseller" BOOLEAN,
    "inStock" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "descriptionInfo" JSON NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "product_slug_idx" ON "Product"("slug");
