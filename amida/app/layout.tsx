"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import I18nProvider from "./components/i18nProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// export const metadata: Metadata = {
//   title: "Amida",
//   description: "amida-kuji app",
// };
// export const metadata: Metadata = {
//   title: 'Amida',
//   description: 'amida-kuji app',
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <I18nProvider>{children}</I18nProvider>
      </body>
    </html>
  );
}
