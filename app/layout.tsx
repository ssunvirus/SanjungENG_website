import type { Metadata } from "next";
import "./globals.css";
import Header from "@/src/components/layout/Header";
import Footer from "@/src/components/layout/Footer";
import { GoogleAnalytics } from "@next/third-parties/google";
import { siteUrl } from "@/src/lib/site-url";
import { siteName, siteDescription, siteShareImage } from "@/src/lib/site-metadata";

export const metadata: Metadata = {
  metadataBase: siteUrl,
  other: {
    "naver-site-verification": "5f80201cf9d38969a9b7f584e3f15a4bb4397202",
  },
  title: siteName,
  description: siteDescription,
  openGraph: {
    title: siteName,
    description: siteDescription,
    siteName,
    locale: "ko_KR",
    type: "website",
    images: [
      {
        url: siteShareImage,
        width: 1200,
        height: 630,
        alt: "산정엔지니어링 로고",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description: siteDescription,
    images: [siteShareImage],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="flex min-h-full min-w-0 flex-col overflow-x-clip bg-[#EFF7FB]">
        <Header />
        {children}
        <Footer />
      </body>
      <GoogleAnalytics gaId="G-H64WF985Q8" />
    </html>
  );
}
