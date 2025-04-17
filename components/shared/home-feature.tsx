import Link from "next/link";
import Image from "next/image";
import { useLocale } from "next-intl";

const HomeFeature = () => {
  const locale = useLocale();
  return (
    <div className="space-y-4 pb-10">
      <div className="flex flex-col md:flex-row gap-4 justify-center px-2">
        <div className="w-full rounded-xl overflow-hidden shadow-slate-500 shadow-md hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
          <Link href="/product/search?searchByCategory=phone">
            <Image
              src={`/images/features/${locale}/feature-1.png`}
              alt="hero"
              width={600}
              height={300}
              className="w-full"
            />
          </Link>
        </div>

        <div className="w-full rounded-xl overflow-hidden shadow-slate-500 shadow-md hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
          <Link href="/product/search?searchByCategory=tablet">
            <Image
              src={`/images/features/${locale}/feature-2.png`}
              alt="hero"
              width={600}
              height={300}
              className="w-full"
            />
          </Link>
        </div>
        <div className="w-full rounded-xl overflow-hidden shadow-slate-500 shadow-md hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
          <Link href="/product/search?searchByCategory=tv">
            <Image
              src={`/images/features/${locale}/feature-3.png`}
              alt="hero"
              width={600}
              height={300}
              className="w-full"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomeFeature;
