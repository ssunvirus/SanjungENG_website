"use client";

import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { naverAccountId, type NaverWindow } from "@/src/lib/naver-analytics";

export default function NaverAnalytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const query = searchParams.toString();
  const [ready, setReady] = useState(false);
  const lastPage = useRef<string | null>(null);

  useEffect(() => {
    if (!ready) return;
    const page = `${pathname}${query ? `?${query}` : ""}`;
    if (lastPage.current === page) return;

    const naver = window as NaverWindow;
    if (!naver.wcs || !naver.wcs_do) return;

    try {
      naver.wcs_add = naver.wcs_add || {};
      naver.wcs_add.wa = naverAccountId;
      naver._nasa = naver._nasa || {};
      naver.wcs.inflow();
      naver.wcs_do();
      lastPage.current = page;
    } catch {
      // Ad tracking must not interrupt navigation or inquiry forms.
    }
  }, [pathname, query, ready]);

  return (
    <Script
      id="naver-wcs"
      src="https://wcs.naver.net/wcslog.js"
      strategy="afterInteractive"
      onReady={() => setReady(true)}
    />
  );
}
