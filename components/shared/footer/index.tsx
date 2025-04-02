import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <div className="bg-black">
      <div className="wrapper flex-1 space-y-4 my-5">
        <div className="grid grid-cols-5 text-white text-sm">
          <div>
            <Image
              src="/images/logo.png"
              alt="logo"
              width={100}
              height={100}
              priority={true}
            />
            <div>&copy; TechСonnect {currentYear}</div>
          </div>
          {/* Catalog */}
          <div className="space-y-3">
            <div className="text-blue-500 font-bold">Каталог</div>
            <ul className="space-y-1">
              <li>
                <Link href="/">Телефони</Link>
              </li>
              <li>
                <Link href="/">Планшети</Link>
              </li>
              <li>
                <Link href="/">Телевізори</Link>
              </li>
            </ul>
          </div>
          {/* For Clients */}
          <div className="space-y-3">
            <div className="text-blue-500 font-bold">Клієнтам</div>
            <ul className="space-y-1">
              <li>
                <Link href="/">Головна</Link>
              </li>
              <li>
                <Link href="/product/search">Каталог</Link>
              </li>
              <li>
                <Link href="/payment-and-delivery-info">Доставка і оплата</Link>
              </li>
              <li>
                <Link href="/warranty-and-return">Гарантія і повернення</Link>
              </li>
              <li>
                <Link href="/about">Про підприємство</Link>
              </li>
              <li>
                <Link href="/contact-info">Контактна інформація</Link>
              </li>
            </ul>
          </div>
          {/* Contact info */}
          <div className="space-y-3">
            <div className="text-blue-500 font-bold">Контактна інформація</div>
            <ul className="space-y-1">
              <li>
                <div>095 881-06-32</div>
              </li>
            </ul>
          </div>
          {/* location info */}
          <div className="space-y-3">
            <div className="">
              Україна, місто Одеса, вулиця Дерибасівська 21, 65026 Режим роботи:
              ПН-СБ: 9.00 - 18.00 НД: вихідний
            </div>
            <div>Мапа проїзду</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
