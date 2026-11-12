"use client";

import Script from "next/script";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import {
  subscribeBrowserLocation,
  getBrowserPage,
  getServerPage,
} from "@/src/lib/browser-location-store";
import { naverAccountId, type NaverWindow } from "@/src/lib/naver-analytics";

export default function NaverAnalytics() {
  const page = useSyncExternalStore(subscribeBrowserLocation, getBrowserPage, getServerPage);
  const [ready, setReady] = useState(false);
  const lastPage = useRef<string | null>(null);

  useEffect(() => {
    if (!ready || !page) return;
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
  }, [page, ready]);

  return (
    <Script
      id="naver-wcs"
      src="https://wcs.naver.net/wcslog.js"
      strategy="afterInteractive"
      onReady={() => setReady(true)}
    />
  );
}
