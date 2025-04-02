import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Product } from "@/types";
import AddToCart from "../cart/add-to-cart";

const ProductCard = ({
  product,
  small = false,
}: {
  product: Product;
  small?: boolean;
}) => {
  return (
    <Card
      className={
        "w-full max-w-sm py-4 h-full border-stone-400 hover:border-blue-500 transition-all duration-300 relative"
      }
    >
      {(product.isNew || product.isBestseller) && (
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.isNew && (
            <Badge
              className={`bg-blue-500 text-white ${
                small ? "text-xs" : "text-sm"
              }`}
            >
              Новинка
            </Badge>
          )}
          {product.isBestseller && (
            <Badge
              className={`bg-green-500 text-white ${
                small ? "text-xs" : "text-sm"
              }`}
            >
              Хіт
            </Badge>
          )}
        </div>
      )}
      <CardHeader className={`items-center flex-grow-0 ${small ? "pb-2" : ""}`}>
        <Link
          href={`/product/${product.slug}`}
          className="flex justify-center items-center"
        >
          <Image
            src={product.images[0]}
            alt="product image"
            height={small ? 120 : 200}
            width={small ? 120 : 200}
          />
        </Link>
      </CardHeader>
      <CardContent className="flex flex-col h-full justify-between gap-4">
        <div>
          <div className={`text-balance ${small ? "text-xs" : "text-md"}`}>
            {product.fullName}
          </div>
          <div className={`font-bold flex gap-4 ${small ? "text-sm" : ""}`}>
            <div className="text-blue-500">{product.price} грн</div>
            {product.oldPrice && (
              <div className="line-through">{product.oldPrice} грн</div>
            )}
          </div>
          <div className={`text-green-500 ${small ? "text-xs" : "text-sm"}`}>
            В наявності
          </div>
        </div>
        {!small && (
          <AddToCart className="w-full" product={product} quantity={1} />
        )}
      </CardContent>
    </Card>
  );
};

export default ProductCard;
