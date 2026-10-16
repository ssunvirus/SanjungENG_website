import type { Metadata } from "next";
import "./globals.css";
import Header from "../src/components/layout/Header";
import Footer from "../src/components/layout/Footer";
import { siteUrl } from "../src/lib/site-url";

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: "산정엔지니어링",
  description:
    "산정엔지니어링은 냉동기·항온항습기·저온저장고 등 냉동공조 설비와 섬유덕트의 설계, 설치 및 유지보수를 제공합니다.",
  openGraph: {
    title: "산정엔지니어링",
    description:
      "산정엔지니어링은 냉동기·항온항습기·저온저장고 등 냉동공조 설비와 섬유덕트의 설계, 설치 및 유지보수를 제공합니다.",
    siteName: "산정엔지니어링",
    locale: "ko_KR",
    type: "website",
    images: [
      {
        url: "/images/share/home-logo.png",
        width: 1200,
        height: 630,
        alt: "산정엔지니어링 로고",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "산정엔지니어링",
    description:
      "산정엔지니어링은 냉동기·항온항습기·저온저장고 등 냉동공조 설비와 섬유덕트의 설계, 설치 및 유지보수를 제공합니다.",
    images: ["/images/share/home-logo.png"],
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
    </html>
  );
}
