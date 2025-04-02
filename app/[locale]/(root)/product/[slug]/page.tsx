import {
  getAllProducts,
  getProductBySlug,
} from "@/lib/actions/products.action";
import { notFound } from "next/navigation";
import ProductImages from "@/components/shared/product/product-images";
import MemorySelector from "@/components/shared/product/memory-selector";
import ProductDescription from "@/components/shared/product/product-description";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import ProductCarousel from "@/components/shared/product/product-carousel";
import ProductReviews from "@/components/shared/product/product-reviews";
import ProductReviewForm from "@/components/shared/product/product-review-form";
import AddToCart from "@/components/shared/cart/add-to-cart";
import QuickOrder from "@/components/shared/cart/quick-order";

const ProductPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const allProducts = await getAllProducts();

  return (
    <div className="wrapper flex-1 space-y-4 my-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4 md:px-8 lg:px-16 py-6">
        {/* Ліва колонка: зображення + опис */}
        <div className="sticky top-4 h-fit">
          <ProductImages images={product.images.slice(1)} />
          <ProductReviews reviews={product.reviews} />
          <ProductReviewForm />
        </div>

        {/* Права колонка: ціна + детальна інформація */}
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
          <div>
            <div className="text-xl text-blue-500 font-bold">
              {product.price} грн
            </div>
            <div className="text-sm text-green-500">В наявності</div>
          </div>
          {product.memory && (
            <div>
              <MemorySelector
                baseModel={product.model}
                currentMemory={product.memory}
              />
            </div>
          )}
          <div className="space-x-4">
            <AddToCart className="" product={product} quantity={1} />
            <QuickOrder product={product} />
            {/* <Button variant={"outline"}>Замовити швидко</Button> */}
          </div>
          <div className="border-b-2 font-bold">Опис</div>
          <ProductDescription descriptionInfo={product.descriptionInfo} />

          <div className="space-y-3">
            <div className="border-b-2 font-bold ">Дивитись також</div>
            <div>
              <ProductCarousel small={true} products={allProducts} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
