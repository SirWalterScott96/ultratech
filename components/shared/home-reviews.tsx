import { Review } from "@/types";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import ReviewComponent from "./review-component";
import { getHomeReviews } from "@/lib/actions/reviews.action";

const HomeReviews = async () => {
  const reviews = await getHomeReviews();
  if (!reviews) return <div>Ще нема відгуків</div>;

  return (
    <Carousel className={"w-full flex items-stretch"}>
      <CarouselContent className="-ml-1">
        {reviews.map((review: Review) => (
          <CarouselItem
            key={review.id}
            // Show more items per view on small version
            className={"md:basis-1/2 lg:basis-1/3"}
          >
            <ReviewComponent review={review} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default HomeReviews;
