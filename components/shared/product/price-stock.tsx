import { useTranslations } from "next-intl";
import parse from "html-react-parser";

const PriceAndStock = ({ price }: { price: number }) => {
  const t = useTranslations("LinksAndGeneral");

  return (
    <div>
      <div className="text-xl text-blue-500 font-bold">{price} грн</div>
      <div className="text-sm text-green-500">{parse(t("inStock"))}</div>
    </div>
  );
};

export default PriceAndStock;
