"use client";
import ProductCard from "@/components/shared/product/product-card";
import { Product } from "@prisma/client";
import { useTranslations } from "next-intl";
import parse from "html-react-parser";

interface ProductsGridProps {
  isLoading: boolean;
  filteredProducts: Product[];
}

const ProductsGrid = ({ isLoading, filteredProducts }: ProductsGridProps) => {
  const t = useTranslations("LinksAndGeneral");

  if (isLoading) {
    return <p className="text-lg font-semibold">{parse(t("searching"))}</p>;
  }

  if (filteredProducts.length === 0) {
    return (
      <p className="col-span-full">{parse(t("filteredProductNotFound"))}</p>
    );
  }

  return (
    <>
      {filteredProducts.map((product) => (
        <ProductCard key={product.slug} product={product} />
      ))}
    </>
  );
};

export default ProductsGrid;
