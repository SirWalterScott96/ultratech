import { useTranslations } from "next-intl";
import Link from "next/link";

const ContactInfo = () => {
  const t = useTranslations("ContactInfo");

  return (
    <div className="wrapper flex-1 space-y-4 my-5">
      <div className="h3-bold">{t("title")}</div>
      <div>
        <div className="uppercase font-bold">{t("subTitle-1")}</div>
        <div>
          {t("info-1")}{" "}
          <Link
            target="_blank"
            href="https://maps.app.goo.gl/4zhdJgbUnnxn6mcy5"
            className="text-blue-500"
          >
            {t("info-1-1")}
          </Link>
        </div>
      </div>
      <div>
        <div className="uppercase font-bold">{t("subTitle-2")}</div>
        <div>{t("info-2")}</div>
      </div>
      <div>
        <div className="uppercase font-bold">{t("subTitle-3")}</div>
        <div>{t("info-3")}</div>
      </div>
      <div>
        <div className="uppercase font-bold">{t("subTitle-4")}</div>
        <div>{t("email")}</div>
        <div>{t("site")}</div>
      </div>
    </div>
  );
};

export default ContactInfo;
