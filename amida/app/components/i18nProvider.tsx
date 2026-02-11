"use client";

import { ReactNode, useEffect, useState } from "react";
import i18n from "@/i18n/config";

export default function I18nProvider({ children }: { children: ReactNode }) {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const initializeI18n = async () => {
      try {
        const browserLanguage = navigator.language.split("-")[0];
        console.log(`Detected browser language: ${browserLanguage}`);

        // config.ts から、サポートされている言語か確認する。
        const supportedLanguages = Object.values(i18n.options.supportedLngs || []);
        console.log(`Supported languages:`, supportedLanguages);
        const detectedLanguage = supportedLanguages.includes(browserLanguage) ? browserLanguage : "en";
        
        await i18n.changeLanguage(detectedLanguage);

        // HTML の lang 属性を更新
        document.documentElement.lang = detectedLanguage;

        console.log(`i18n initialized with language: ${detectedLanguage}`);
      } catch (error) {
        console.error("Failed to initialize i18n:", error);
      }
      setIsInitialized(true);
    };

    initializeI18n();
  }, [])

  if (!isInitialized) {
    return null; // またはローディングインジケーターなど
  }

  return <>{children}</>;
}
