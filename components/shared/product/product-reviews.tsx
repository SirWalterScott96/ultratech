import { Review } from "@/types";
import ReviewComponent from "../review-component";

const ProductReviews = ({ reviews }: { reviews: Review[] }) => {
  return (
    <div className="mt-8 space-y-4">
      <h3 className="text-xl font-bold border-b pb-2">Відгуки</h3>
      {reviews ? (
        reviews.map((review) => (
          <ReviewComponent key={review.id} review={review} />
        ))
      ) : (
        <p className="text-gray-500">Немає відгуків. Будьте першим!</p>
      )}
    </div>
  );
};

export default ProductReviews;
