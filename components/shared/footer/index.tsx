import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import parse from "html-react-parser";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const t = useTranslations("LinksAndGeneral");
  return (
    <div className="bg-black">
      <div className="wrapper flex-1 space-y-4 my-5">
        <div className="flex flex-col items-center md:items-start space-y-4 md:grid md:grid-cols-5 text-white text-sm text-center md:text-start">
          <div>
            <div className="w-full flex justify-center md:block">
              <Image
                src="/images/logo.png"
                alt="logo"
                width={100}
                height={100}
                priority={true}
              />
            </div>
            <div>&copy; TechСonnect {currentYear}</div>
          </div>
          {/* Catalog */}
          <div className="space-y-2">
            <div className="text-blue-500 font-bold">{parse(t("catalog"))}</div>
            <ul className="space-y-1">
              <li>
                <Link href="/product/search?searchByCategory=phone">
                  {parse(t("smartphones"))}
                </Link>
              </li>
              <li>
                <Link href="/product/search?searchByCategory=tablet">
                  {parse(t("tablets"))}
                </Link>
              </li>
              <li>
                <Link href="/product/search?searchByCategory=tv">
                  {parse(t("tv"))}
                </Link>
              </li>
            </ul>
          </div>
          {/* For Clients */}
          <div className="space-y-2">
            <div className="text-blue-500 font-bold">
              {parse(t("forClients"))}
            </div>
            <ul className="space-y-1">
              <li>
                <Link href="/">{parse(t("home"))}</Link>
              </li>
              <li>
                <Link href="/product/search">{parse(t("catalog"))}</Link>
              </li>
              <li>
                <Link href="/payment-and-delivery-info">
                  {parse(t("delivery"))}
                </Link>
              </li>
              <li>
                <Link href="/warranty-and-return">{parse(t("return"))}</Link>
              </li>
              <li>
                <Link href="/about">{parse(t("about"))}</Link>
              </li>
              <li>
                <Link href="/contact-info">{parse(t("contactInfo"))}</Link>
              </li>
            </ul>
          </div>
          {/* Contact info */}
          <div className="space-y-2">
            <div className="text-blue-500 font-bold">
              {parse(t("contactInfo"))}
            </div>
            <ul className="space-y-1">
              <li>
                <div>+38(063)-783-30-43</div>
              </li>
            </ul>
          </div>
          {/* location info */}
          <div className="space-y-2 max-w-sm">
            <div className="">{parse(t("address"))}</div>
            <div>
              <Link
                href={"https://maps.app.goo.gl/4zhdJgbUnnxn6mcy5"}
                target="_blank"
                className="text-blue-500"
              >
                {parse(t("maps"))}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
