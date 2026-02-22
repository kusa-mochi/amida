"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { supportedLanguages } from "@/i18n/config";

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState("en");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    setCurrentLanguage(i18n.language);
  }, [i18n.language]);

  const handleLanguageChange = async (lang: string) => {
    await i18n.changeLanguage(lang);
    document.documentElement.lang = lang;
    setCurrentLanguage(lang);
    setIsDropdownOpen(false);
  };

  return (
    <div className="fixed top-2 right-2 z-50">
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-slate-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-md hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
      >
        <span className="text-sm font-medium">
          {currentLanguage === "ja" ? "🇯🇵" : "🇺🇸"}
        </span>
        <span className="text-sm hidden sm:inline">
          {supportedLanguages[currentLanguage as keyof typeof supportedLanguages]}
        </span>
      </button>

      {isDropdownOpen && (
        <div className="absolute top-full right-0 mt-1 bg-white dark:bg-slate-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-lg overflow-hidden">
          {Object.entries(supportedLanguages).map(([lang, label]) => (
            <button
              key={lang}
              onClick={() => handleLanguageChange(lang)}
              className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors ${
                currentLanguage === lang
                  ? "bg-gray-200 dark:bg-slate-600 font-semibold"
                  : ""
              }`}
            >
              {lang === "ja" ? "🇯🇵" : "🇺🇸"} {label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
