import { Heart, SearchIcon, ShoppingCart } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import MyCart from "./my-cart";
import LanguageSwitcher from "./language-switcher";

const Header = () => {
  return (
    <header className="text-white">
      <div className="w-full blue-gradient text-xs hidden md:block">
        <div className="wrapper-sm flex-between">
          <div className="flex gap-3">
            <div className="">
              <Link href="/product/search">Каталог</Link>
            </div>
            <div className="">
              <Link href="/">Головна</Link>
            </div>
            <div className="">
              <Link href="/payment-and-delivery-info">Доставка і оплата</Link>
            </div>
            <div className="">
              <Link href="/warranty-and-return">Гарантія і повернення</Link>
            </div>
            <div className="">
              <Link href="/contact-info">Контактна інформація</Link>
            </div>
            <div className="">
              <Link href="/about">Про підприємство</Link>
            </div>
          </div>
          <div className="flex items-center justify-center gap-2">
            <div>
              <Heart width="22px" height="22px" />
            </div>
            <div className="flex gap-1">
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full bg-black">
        <div className="wrapper-sm flex-between">
          <div className="flex gap-5 items-center">
            <div>
              <Link href="/">
                <Image
                  src="/images/logo.png"
                  width={727}
                  height={444}
                  alt="logo"
                  className="w-[120px]"
                />
              </Link>
            </div>
            <div className="flex space-x-3">
              <Link href="/product/search?searchByCategory=phone">
                Смартфони
              </Link>
              <Link href="/product/search?searchByCategory=tablet">
                Планшети
              </Link>
              <Link href="/product/search?searchByCategory=tv">Телевізори</Link>
              <SearchIcon />
            </div>
          </div>
          <div className="flex gap-4">
            <div>098 881-06-32</div>
            <div className="">
              <MyCart />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
