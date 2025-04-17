import { Product } from "@/types";
import ProductCarousel from "./product-carousel";
import { useTranslations } from "next-intl";
import parse from "html-react-parser";

const SmallProductCarousel = ({ products }: { products: Product[] }) => {
  const t = useTranslations("LinksAndGeneral");
  return (
    <div className="space-y-3">
      <div className="border-b-2 font-bold ">{parse(t("alsoSee"))}</div>
      <ProductCarousel small={true} products={products} />
    </div>
  );
};

export default SmallProductCarousel;
