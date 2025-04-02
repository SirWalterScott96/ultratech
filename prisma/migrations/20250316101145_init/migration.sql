-- CreateEnum
CREATE TYPE "Category" AS ENUM ('TABLET', 'PHONE', 'TV');

-- CreateEnum
CREATE TYPE "Brand" AS ENUM ('Samsung', 'Huawei');

-- CreateTable
CREATE TABLE "Device" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "category" "Category" NOT NULL,
    "brand" "Brand" NOT NULL,
    "model" TEXT NOT NULL,
    "images" TEXT[],
    "price" INTEGER NOT NULL,
    "oldPrice" INTEGER,
    "isNew" BOOLEAN,
    "isBestseller" BOOLEAN,
    "inStock" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "descriptionInfo" JSON NOT NULL,

    CONSTRAINT "Device_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "product_slug_idx" ON "Device"("slug");
