import Link from "next/link";
import { useTranslations } from "next-intl";
import parse from "html-react-parser";

const NavbarMainLinks = ({ onLinkClick }: { onLinkClick?: () => void }) => {
  const t = useTranslations("LinksAndGeneral");
  return (
    <div className="flex flex-col gap-3">
      <div className="">
        <Link href="/product/search" onClick={onLinkClick}>
          {parse(t("catalog"))}
        </Link>
      </div>
      <div className="">
        <Link href="/" onClick={onLinkClick}>
          {parse(t("home"))}
        </Link>
      </div>
      <div className="">
        <Link href="/payment-and-delivery-info" onClick={onLinkClick}>
          {parse(t("delivery"))}
        </Link>
      </div>
      <div className="">
        <Link href="/warranty-and-return" onClick={onLinkClick}>
          {parse(t("return"))}
        </Link>
      </div>
      <div className="">
        <Link href="/contact-info" onClick={onLinkClick}>
          {parse(t("contactInfo"))}
        </Link>
      </div>
      <div className="">
        <Link href="/about" onClick={onLinkClick}>
          {parse(t("about"))}
        </Link>
      </div>
    </div>
  );
};

export default NavbarMainLinks;
