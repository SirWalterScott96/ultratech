import Image from "next/image";
import Link from "next/link";

const HeroSection = () => {
  return (
    <div>
      <Link href="/">
        <Image
          src="/images/hero.png"
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
