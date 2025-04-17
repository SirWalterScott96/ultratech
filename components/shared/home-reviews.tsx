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
    <Carousel
      className={"w-full flex"}
      opts={{
        align: "start",
        loop: true,
      }}
    >
      <CarouselContent className="">
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
      <CarouselPrevious className="absolute left-0 -ml-4 lg:-ml-8 z-10 bg-white/80 shadow-md hover:bg-white border border-gray-200" />
      <CarouselNext className="absolute right-0 -mr-4 lg:-mr-8 z-10 bg-white/80 shadow-md hover:bg-white border border-gray-200" />
    </Carousel>
  );
};

export default HomeReviews;
