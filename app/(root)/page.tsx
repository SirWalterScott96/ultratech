import HeroSection from "@/components/shared/hero";
import Link from "next/link";
import Image from "next/image";

const Homepage = () => {
  return (
    <div>
      <HeroSection />
      <div className="wrapper flex-1 space-y-4 my-5">
        {/* New products for sale section*/}
        <div>
          <div>
            <div className="h2-bold text-center">Новинки</div>
          </div>
        </div>
      </div>

      <div className="wrapper flex-1 space-y-4 my-5">
        {/* Bestsellers section*/}
        <div>
          <div>
            <div className="h2-bold text-center">Хіти продаж</div>
          </div>
        </div>
      </div>

      {/* Featured section */}
      <div className="space-y-4 pb-10">
        <div className="flex gap-4 justify-center px-2">
          <div className="rounded-xl overflow-hidden">
            <Link href="/">
              <Image
                src="/images/features/feature-1-1.png"
                alt="hero"
                width={600}
                height={300}
                className=""
              />
            </Link>
          </div>
          <div className="rounded-xl overflow-hidden">
            <Link href="/">
              <Image
                src="/images/features/feature-2.png"
                alt="hero"
                width={600}
                height={300}
                className=""
              />
            </Link>
          </div>
          <div className="rounded-xl overflow-hidden">
            <Link href="/">
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
    </div>
  );
};

export default Homepage;
