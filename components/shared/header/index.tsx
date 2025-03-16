import { Heart, SearchIcon, ShoppingCart } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const Header = () => {
  return (
    <header className="text-white">
      <div className="w-full blue-gradient text-xs hidden md:block">
        <div className="wrapper-sm flex-between">
          <div className="flex gap-3">
            <div className="">Головна</div>
            <div className="">Каталог</div>
            <div className="">Доставка і оплата</div>
            <div className="">Гарантія і повернення</div>
            <div className="">Контактна інформація</div>
            <div className="">Про підприємство</div>
          </div>
          <div className="flex items-center justify-center gap-2">
            <div>
              <Heart width="22px" height="22px" />
            </div>
            <div className="flex gap-1">
              <div className="font-bold">Укр</div>
              <div>Рус</div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full bg-black">
        <div className="wrapper flex-between">
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
              <Link href="/">Смартфони</Link>
              <Link href="/">Планшети</Link>
              <Link href="/">Телевізори</Link>
              <SearchIcon />
            </div>
          </div>
          <div className="flex gap-4">
            <div>098 881-06-32</div>
            <div className="">
              <Link href="/" className="flex items-center gap-2">
                <ShoppingCart />
                Мій кошик
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
