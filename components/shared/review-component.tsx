import { Review } from "@/types";
import { Star } from "lucide-react";

const ReviewComponent = ({ review }: { review: Review }) => {
  return (
    <div className="border h-full p-4 rounded-lg shadow">
      <div className="flex items-center mb-2">
        <span className="font-bold text-sm">{review.author}</span>
        <span className="text-sm text-gray-500 ml-2">
          {new Date(review.createdAt).toLocaleDateString("uk-UA")}
        </span>
      </div>
      {/* TODO: Separate to separate component  */}
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            color="#108dda"
            fill={i < review.rating ? "#108dda" : "none"}
            size={16}
          />
        ))}
      </div>
      <p className="mt-2 text-sm">{review.reviewBody}</p>
    </div>
  );
};

export default ReviewComponent;
