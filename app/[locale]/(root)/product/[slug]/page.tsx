import {
  getAllProducts,
  getProductBySlugAndLocale,
} from "@/lib/actions/products.action";
import { notFound } from "next/navigation";
import ProductImages from "@/components/shared/product/product-images";
import MemorySelector from "@/components/shared/product/memory-selector";
import ProductDescription from "@/components/shared/product/product-description";
import { Star } from "lucide-react";
import ProductReviews from "@/components/shared/product/product-reviews";
import ProductReviewForm from "@/components/shared/product/product-review-form";
import AddToCart from "@/components/shared/cart/add-to-cart";
import QuickOrder from "@/components/shared/cart/quick-order";
import SmallProductCarousel from "@/components/shared/product/small-product-carousel";
import PriceAndStock from "@/components/shared/product/price-stock";
import ProductFeatures from "@/components/shared/product/product-features";

const ProductPage = async ({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) => {
  const { slug, locale } = await params;
  const product = await getProductBySlugAndLocale(slug, locale);
  if (!product) notFound();

  const allProducts = await getAllProducts();
  return (
    <div className="wrapper flex-1 space-y-4 my-5">
      {/* Mobile view (column layout) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* First column: Images and Info (reordered on mobile) */}
        <div className="md:sticky md:top-4 md:h-fit space-y-6">
          {/* Product Images - Responsive sizing */}
          <div className="">
            <ProductImages images={product.images.slice(1)} />
          </div>

          {/* These components will only be shown on desktop view */}
          <div className="hidden md:block">
            <ProductFeatures />
            <ProductReviews reviews={product.reviews} />
            <ProductReviewForm />
          </div>
        </div>

        {/* Second column: Product details */}
        <div className="flex flex-col gap-6">
          <h2 className="h3-bold">{product.fullName}</h2>
          <div className="flex align-center">
            <div className="mr-2 font-bold">Рейтинг</div>
            <div className="flex self-center">
              <Star color="#108dda" fill="#108dda" size={18} />
              <Star color="#108dda" fill="#108dda" size={18} />
              <Star color="#108dda" fill="#108dda" size={18} />
              <Star color="#108dda" fill="#108dda" size={18} />
              <Star color="#108dda" fill="#108dda" size={18} />
            </div>
          </div>
          <PriceAndStock price={product.price} />
          {product.memory && (
            <div>
              <MemorySelector
                baseModel={product.model}
                currentMemory={product.memory}
              />
            </div>
          )}
          <div className="space-y-6 md:space-y-0 md:space-x-4">
            <AddToCart
              className="w-full md:w-fit"
              product={product}
              quantity={1}
            />
            <QuickOrder className="w-full md:w-fit" product={product} />
          </div>
          <ProductDescription descriptionInfo={product.descriptionInfo} />

          <SmallProductCarousel products={allProducts} />
        </div>
      </div>

      {/* These components will only be shown on mobile view - below both columns */}
      <div className="md:hidden px-4 space-y-6">
        <ProductFeatures />
        <ProductReviews reviews={product.reviews} />
        <ProductReviewForm />
      </div>
    </div>
  );
};

export default ProductPage;
