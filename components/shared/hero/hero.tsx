import Image from "next/image";
import Link from "next/link";
import { useLocale } from "next-intl";

const HeroImage = () => {
  const locale = useLocale();
  return (
    <div>
      <Link href="/product/search">
        <div className="hidden md:block">
          <Image
            src={`/images/hero/${locale}/hero.webp`}
            alt="hero"
            width={1920}
            height={576}
            className="w-full"
          />
        </div>
        <div className="md:hidden">
          <Image
            src={`/images/hero/${locale}/hero-small.webp`}
            alt="hero"
            width={1920}
            height={576}
            className="w-full"
          />
        </div>
      </Link>
    </div>
  );
};

export default HeroImage;
