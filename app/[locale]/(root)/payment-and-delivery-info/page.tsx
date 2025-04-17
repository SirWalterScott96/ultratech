import { useTranslations } from "next-intl";
import parse from "html-react-parser";

const PaymentAndDeliveryInfo = () => {
  const t = useTranslations("PaymentAndDeliveryInfo");

  return (
    <div className="wrapper flex-1 space-y-4 my-5">
      <div className="h2-bold">{parse(t("mainTitle"))}</div>
      {/* Payment info */}
      <div>
        <div className="h3-bold">{parse(t("payment"))}</div>
        <div className="space-y-2">
          <div>{parse(t("variantsPayment"))}</div>
          <ul className="list-decimal list-inside">
            <li>
              <span className="font-bold italic underline">
                {parse(t("firstOptionPayment"))}
              </span>
              {parse(t("firstDescriptionPayment"))}
            </li>
            <li>
              <span className="font-bold italic underline">
                {parse(t("secondOptionPayment"))}
              </span>
              {parse(t("secondDescription"))}
            </li>
          </ul>
          <div>{parse(t("generalDescriptionPayment"))}</div>
        </div>
      </div>
      {/* Delivery info */}
      <div>
        <div className="h3-bold">{t("delivery")}</div>
        <div className="space-y-2">
          <div>{parse(t("generalDescriptionDelivery"))}</div>
          <div>{parse(t("variantsDelivery"))}</div>
          <ul className="list-decimal list-inside">
            <li>
              <span className="font-bold italic underline">
                {parse(t("firstOptionDelivery"))}
              </span>
              {parse(t("firstDescriptionDelivery"))}
            </li>
            <li>
              <span className="font-bold italic underline">
                {parse(t("secondOptionDelivery"))}
              </span>
              {parse(t("secondDescriptionDelivery"))}
            </li>
            <li>
              <span className="font-bold italic underline">
                {parse(t("thirdOptionDelivery"))}
              </span>
              {parse(t("thirdDescriptionDelivery"))}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PaymentAndDeliveryInfo;
