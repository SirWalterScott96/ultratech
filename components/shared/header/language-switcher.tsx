"use client";
import { useTranslation } from "react-i18next";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = (locale: string) => {
    i18n.changeLanguage(locale);
  };

  return (
    <div className="language-switcher">
      <button
        onClick={() => changeLanguage("uk")}
        className={i18n.language === "uk" ? "active" : ""}
      >
        UA
      </button>
      <div> </div>
      <button
        onClick={() => changeLanguage("ru")}
        className={i18n.language === "ru" ? "active" : ""}
      >
        RU
      </button>
    </div>
  );
}
