import { useTranslations } from "next-intl";
import parse from "html-react-parser";

const AboutPage = () => {
  const t = useTranslations("AboutPage");
  return (
    <div className="wrapper flex-1 space-y-4 my-5">
      <div className="text-xl">
        {parse(t("about1"))}
        <span className="font-bold">{parse(t("about2"))}</span>
        {parse(t("about3"))}
      </div>
      <div>
        <div className="h3-bold">{parse(t("about4"))}</div>
        <div className="space-y-1">
          <div>{parse(t("about5"))}</div>
          <div>{parse(t("about6"))}</div>
          <div>{parse(t("about7"))}</div>
          <div>{parse(t("about8"))}</div>
          <div>{parse(t("about9"))}</div>
        </div>
      </div>
      <div>
        {parse(t("about10"))}
        <span className="font-bold">{parse(t("about11"))}</span>
        {parse(t("about12"))}
      </div>
    </div>
  );
};

export default AboutPage;
