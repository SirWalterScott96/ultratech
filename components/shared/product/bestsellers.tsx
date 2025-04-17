import { Product } from "@/types";
import ProductCarousel from "./product-carousel";
import { useTranslations } from "next-intl";
import parse from "html-react-parser";

const Bestsellers = ({ bestsellers }: { bestsellers: Product[] }) => {
  const t = useTranslations("LinksAndGeneral");
  return (
    <>
      <div className="wrapper flex-1 space-y-4 my-5">
        <div className="h2-bold text-center mb-4">
          {parse(t("bestsellers"))}
        </div>

        <ProductCarousel products={bestsellers} />
      </div>
    </>
  );
};

export default Bestsellers;
