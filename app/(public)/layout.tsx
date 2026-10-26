import Script from "next/script";
import { Suspense } from "react";
import "@/app/globals.css";
import SiteFrame from "@/src/components/layout/SiteFrame";
import NaverAnalytics from "@/src/components/layout/NaverAnalytics";
import PhoneConversionTracking from "@/src/components/layout/PhoneConversionTracking";
import { GoogleAnalytics } from "@next/third-parties/google";
export { metadata } from "@/src/lib/site-layout-metadata";

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="flex min-h-full min-w-0 flex-col overflow-x-clip bg-[#EFF7FB]">
        <SiteFrame>{children}</SiteFrame>
        <PhoneConversionTracking />
        <Suspense fallback={null}>
          <NaverAnalytics />
        </Suspense>
        <GoogleAnalytics gaId="G-H64WF985Q8" />
        <Script id="google-ads-config" strategy="afterInteractive">
          {`
          window.dataLayer = window.dataLayer || [];
          (function () {
            function gtag() { window.dataLayer.push(arguments); }
            gtag('config', 'AW-18414772395');
          })();
        `}
        </Script>
      </body>
    </html>
  );
}
