import Image from "next/image";
import Link from "next/link";

const HeroSection = () => {
  return (
    <div>
      <Link href="/product/search">
        <Image
          src="/images/hero.webp"
          alt="hero"
          width={1920}
          height={576}
          className="w-full"
        />
      </Link>
    </div>
  );
};

export default HeroSection;
