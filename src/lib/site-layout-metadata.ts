import type { Metadata } from "next";
import { siteUrl } from "./site-url";
import { siteName, siteDescription, siteShareImage } from "./site-metadata";

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
