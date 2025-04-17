import { Review } from "@/types";
import ReviewComponent from "../review-component";
import { useTranslations } from "next-intl";
import parse from "html-react-parser";

const ProductReviews = ({ reviews }: { reviews: Review[] }) => {
  const t = useTranslations("LinksAndGeneral");
  return (
    <div className="mt-8 space-y-4">
      <h3 className="text-xl font-bold border-b pb-2">{parse(t("review"))}</h3>
      {reviews ? (
        reviews.map((review) => (
          <ReviewComponent key={review.id} review={review} />
        ))
      ) : (
        <p className="text-gray-500">{parse(t("emptyReview"))}</p>
      )}
    </div>
  );
};

export default ProductReviews;
