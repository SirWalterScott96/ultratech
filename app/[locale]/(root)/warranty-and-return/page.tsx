import { useTranslations } from "next-intl";
import parse from "html-react-parser";

const WarrantyAndReturn = () => {
  const t = useTranslations("WarrantyAndReturn");
  return (
    <div className="wrapper flex-1 space-y-4 my-5">
      <div className="h2-bold">{parse(t("acceptOrder"))}</div>
      <div>{parse(t("acceptOrderDescription"))}</div>
      <div>
        <div className="h3-bold">{parse(t("returnTitle"))}</div>
        <div className="space-y-4">
          <div>{parse(t("return1"))}</div>
          <div>
            <div className="font-bold">{parse(t("return2"))}</div>
            <div>{parse(t("return3"))}</div>
          </div>
          <div>
            <div className="font-bold">{parse(t("return4"))}</div>
            <div>{parse(t("return5"))}</div>
            <ul className="list-inside list-disc mt-3">
              <li>{parse(t("return6"))}</li>
              <li>{parse(t("return7"))}</li>
              <li>{parse(t("return8"))}</li>
            </ul>
          </div>
          <div className="space-y-3">
            <div>{parse(t("return9"))}</div>
            <ul className="list-inside list-disc ">
              <li>{parse(t("return10"))}</li>
              <li>{parse(t("return11"))}</li>
            </ul>
            <div>{parse(t("return12"))}</div>
          </div>
          <div className="font-bold">{parse(t("return13"))}</div>
          <div>{parse(t("return14"))}</div>
          <div className="font-bold">{parse(t("return15"))}</div>
          <div className="space-y-2">
            <div>{parse(t("return16"))}</div>
            <ul className="list-inside list-disc">
              <li>{parse(t("return17"))}</li>
              <li>{parse(t("return18"))}</li>
              <li>{parse(t("return19"))}</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="h2-bold">{parse(t("waranty"))}</div>
      <div>{parse(t("waranty1"))}</div>
    </div>
  );
};

export default WarrantyAndReturn;
