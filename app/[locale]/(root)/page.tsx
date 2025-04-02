import HeroSection from "@/components/shared/hero/hero";
import Link from "next/link";
import Image from "next/image";
import { getProductBy } from "@/lib/actions/products.action";
import ProductCarousel from "@/components/shared/product/product-carousel";
import HomeReviews from "@/components/shared/home-reviews";

const Homepage = async () => {
  const [newestDevices, bestsellerDevices] = await Promise.all([
    getProductBy({ types: "isNew" }),
    getProductBy({ types: "isBestseller" }),
  ]);

  return (
    <div className="grow">
      <HeroSection />

      {/* Bestsellers section*/}
      <div className="wrapper flex-1 space-y-4 my-5">
        <div className="h2-bold text-center mb-4">Хіти продажу</div>
        <div className="">
          <ProductCarousel products={bestsellerDevices} />
        </div>
      </div>

      {/* Featured section */}
      <div className="space-y-4 pb-10">
        <div className="flex gap-4 justify-center px-2">
          <div className="">
            <div className="rounded-xl overflow-hidden shadow-slate-500 shadow-md hover:-translate-y-1 hover:shadow-lg  transition-all duration-300">
              <Link href="/product/search?searchByCategory=phone">
                <Image
                  src="/images/features/feature-1-1.png"
                  alt="hero"
                  width={600}
                  height={300}
                  className=""
                />
              </Link>
            </div>
          </div>
          <div className="rounded-xl overflow-hidden shadow-slate-500 shadow-md hover:-translate-y-1 hover:shadow-lg  transition-all duration-300">
            <Link href="/product/search?searchByCategory=tablet">
              <Image
                src="/images/features/feature-2.png"
                alt="hero"
                width={600}
                height={300}
                className=""
              />
            </Link>
          </div>
          <div className="rounded-xl overflow-hidden shadow-slate-500 shadow-md hover:-translate-y-1 hover:shadow-lg  transition-all duration-300">
            <Link href="/product/search?searchByCategory=tv">
              {/* TODO: Захардив висоту і ширину  */}
              <Image
                src="/images/features/feature-3.png"
                alt="hero"
                width={600}
                height={300}
                className=""
              />
            </Link>
          </div>
        </div>
      </div>

      {/* Comments section */}
      <div className="wrapper flex-1 space-y-4 my-5">
        <div className="h2-bold text-center mb-4">Відгуки про магазин</div>
        <div className="">
          <HomeReviews />
        </div>
      </div>
    </div>
  );
};

export default Homepage;
