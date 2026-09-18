import type { Metadata } from "next";
import "./globals.css";
import Header from "../src/components/layout/Header";
import Footer from "../src/components/layout/Footer";

export const metadata: Metadata = {
  title: "산정엔지니어링",
  description: "냉동/공조설비 전문기업 산정엔지니어링",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="min-h-full min-w-[1920px] overflow-x-auto bg-[#EFF7FB] flex flex-col">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
