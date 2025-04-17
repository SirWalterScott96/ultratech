import Link from "next/link";
import Image from "next/image";
import MyCart from "./my-cart";
import LanguageSwitcher from "./language-switcher";
import { useTranslations } from "next-intl";
import parse from "html-react-parser";
import Navbar from "./navbar";

const Header = () => {
  const t = useTranslations("LinksAndGeneral");
  return (
    <header className="text-white">
      <div className="w-full blue-gradient text-xs hidden md:block">
        <div className="wrapper-header flex-between">
          <div className="flex gap-3 pl-10">
            <div className="">
              <Link href="/product/search">{parse(t("catalog"))}</Link>
            </div>
            <div className="">
              <Link href="/">{parse(t("home"))}</Link>
            </div>
            <div className="">
              <Link href="/payment-and-delivery-info">
                {parse(t("delivery"))}
              </Link>
            </div>
            <div className="">
              <Link href="/warranty-and-return">{parse(t("return"))}</Link>
            </div>
            <div className="">
              <Link href="/contact-info">{parse(t("contactInfo"))}</Link>
            </div>
            <div className="">
              <Link href="/about">{parse(t("about"))}</Link>
            </div>
          </div>
          <div className="flex items-center justify-center gap-2">
            {/* <div>
              <Heart width="22px" height="22px" />
            </div> */}
            <div className="flex gap-1">
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      </div>
      <div className="hidden md:block w-full bg-black">
        <div className="wrapper-sm flex-between pt-10">
          <div className="flex gap-5 items-center">
            <div className="py-2">
              <Link href="/">
                <Image
                  src="/images/logo.png"
                  width={297}
                  height={117}
                  alt="logo"
                  className="w-[130px]"
                />
              </Link>
            </div>
            <div className="flex space-x-3">
              <Link href="/product/search?searchByCategory=phone">
                {parse(t("smartphones"))}
              </Link>
              <Link href="/product/search?searchByCategory=tablet">
                {parse(t("tablets"))}
              </Link>
              <Link href="/product/search?searchByCategory=tv">
                {parse(t("tv"))}
              </Link>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="self-center">+38(063)-783-30-43</div>
            <div className="">
              <MyCart />
            </div>
          </div>
        </div>
      </div>
      <Navbar />
    </header>
  );
};

export default Header;
