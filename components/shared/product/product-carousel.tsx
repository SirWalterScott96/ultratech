"use client";
import { useRef } from "react";
import ProductCard from "./product-card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import Autoplay from "embla-carousel-autoplay";
import type { Product } from "@/types";

const ProductCarousel = ({
  products,
  small = false,
}: {
  products: Product[];
  small?: boolean;
}) => {
  const plugin = useRef(Autoplay({ delay: 4000, stopOnInteraction: true }));

  return (
    <Carousel
      className={`w-full flex items-stretch ${
        small ? "max-w-3xl mx-auto" : ""
      }`}
      plugins={[plugin.current]}
      onMouseEnter={() => plugin.current.stop()}
      onMouseLeave={() => plugin.current.play()}
    >
      <CarouselContent className="-ml-1">
        {products.map((device: Product) => (
          <CarouselItem
            key={device.slug}
            // Show more items per view on small version
            className={`pl-1 ${
              small ? "md:basis-1/3 lg:basis-1/3" : "md:basis-1/2 lg:basis-1/5"
            }`}
          >
            <div className="p-1 h-full">
              <ProductCard key={device.slug} product={device} small={small} />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious
        className={` ${small ? "absolute z-10 -left-8" : ""}`}
      />
      <CarouselNext className={` ${small ? "absolute z-10 -right-8" : ""}`} />
    </Carousel>
  );
};

export default ProductCarousel;
