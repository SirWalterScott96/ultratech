import { prisma } from "./prisma";
import sampleData from "./sample-data";

async function main() {
  await prisma.product.deleteMany();
  await prisma.review.deleteMany();
  await prisma.productTranslation.deleteMany();

  // Create products without translations first
  for (const product of sampleData.products) {
    // Extract translations data
    const { translations, ...productData } = product;

    // Create the product
    const createdProduct = await prisma.product.create({
      data: productData,
    });

    // Create translations if they exist
    if (translations && translations.create) {
      for (const translation of translations.create) {
        await prisma.productTranslation.create({
          data: {
            ...translation,
            productSlug: createdProduct.slug,
          },
        });
      }
    }
  }

  // Create reviews
  for (const review of sampleData.reviews) {
    await prisma.review.create({ data: review });
  }

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Error while seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
