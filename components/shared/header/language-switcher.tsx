"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface LanguageSwitcherProps {
  isMobile?: boolean;
}

export default function LanguageSwitcher({
  isMobile = false,
}: LanguageSwitcherProps) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLanguage = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
  };

  const textColor = isMobile ? "text-black" : "text-white";

  return (
    <>
      <Button
        className={cn(
          textColor,
          "p-0",
          locale === "uk" ? "font-bold" : "font-normal"
        )}
        variant={"link"}
        onClick={() => switchLanguage("uk")}
      >
        Укр
      </Button>
      <Button
        className={cn(
          textColor,
          "p-0",
          locale === "ru" ? "font-bold" : "font-normal"
        )}
        variant={"link"}
        onClick={() => switchLanguage("ru")}
      >
        Ру
      </Button>
    </>
  );
}
