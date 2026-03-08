import { Montserrat, Raleway } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { getSiteUrlObject } from "@/shared/config/seo";

const montserrat = Montserrat({
  subsets: ["latin", "cyrillic"],
  variable: "--font-montserrat",
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: true
});

const raleway = Raleway({
  subsets: ["latin", "cyrillic"],
  variable: "--font-raleway",
  weight: ["700"],
  display: "swap",
  preload: true
});

export const metadata = {
  metadataBase: getSiteUrlObject(),
  title: {
    default: "4A - Тестовое задание",
    template: "%s | 4A"
  },
  description: "4A Тестовое задание - Тарифы фитнеса.",
  keywords: ["4A", "тарифы", "подписка", "фитнес", "планы"],
  alternates: {
    canonical: "/"
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "4A",
    title: "4A - Тестовое задание",
    description: "4A Тестовое задание - Тарифы фитнеса.",
    locale: "ru_RU"
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body className={`${montserrat.variable} ${raleway.variable}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
