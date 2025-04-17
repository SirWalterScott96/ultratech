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
    <div className="relative w-full">
      <Carousel
        className={`w-full flex ${small ? "max-w-3xl mx-auto" : ""}`}
        plugins={[plugin.current]}
        onMouseEnter={() => plugin.current.stop()}
        onMouseLeave={() => plugin.current.play()}
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent>
          {products.map((device: Product) => (
            <CarouselItem
              key={device.slug}
              // Show only 1 item on small screens, 2 on medium screens
              className={`flex items-center justify-center ${
                small
                  ? "basis-1/2 md:basis-1/2 lg:basis-1/3"
                  : "basis-1/2 md:basis-1/3 lg:basis-1/5"
              }`}
            >
              <div className="p-1 w-full h-full flex justify-center">
                <ProductCard key={device.slug} product={device} small={small} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="absolute left-0 -ml-4 lg:-ml-8 z-10 bg-white/80 shadow-md hover:bg-white border border-gray-200" />
        <CarouselNext className="absolute right-0 -mr-4 lg:-mr-8 z-10 bg-white/80 shadow-md hover:bg-white border border-gray-200" />
      </Carousel>
    </div>
  );
};

export default ProductCarousel;
