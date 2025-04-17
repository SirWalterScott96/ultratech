import HomeReviews from "./home-reviews";
import { useTranslations } from "next-intl";
import parse from "html-react-parser";

const GeneralComments = () => {
  const t = useTranslations("LinksAndGeneral");
  return (
    <>
      <div className="wrapper flex-1 space-y-4 my-5">
        <div className="h2-bold text-center mb-4">
          {parse(t("shopReviews"))}
        </div>
        <div className="">
          <HomeReviews />
        </div>
      </div>
    </>
  );
};

export default GeneralComments;
