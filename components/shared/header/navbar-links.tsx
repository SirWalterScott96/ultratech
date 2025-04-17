import { useTranslations } from "next-intl";
import parse from "html-react-parser";
import Link from "next/link";

const NavbarLinks = ({ onLinkClick }: { onLinkClick?: () => void }) => {
  const t = useTranslations("LinksAndGeneral");
  return (
    <div className="flex flex-col gap-3 md:space-x-3">
      <Link href="/product/search?searchByCategory=phone" onClick={onLinkClick}>
        {parse(t("smartphones"))}
      </Link>
      <Link
        href="/product/search?searchByCategory=tablet"
        onClick={onLinkClick}
      >
        {parse(t("tablets"))}
      </Link>
      <Link href="/product/search?searchByCategory=tv" onClick={onLinkClick}>
        {parse(t("tv"))}
      </Link>
    </div>
  );
};

export default NavbarLinks;
