"use client";

import { useEffect } from "react";
import { sendGAEvent } from "@next/third-parties/google";
import { sendNaverPhoneClick } from "@/src/lib/naver-analytics";

export default function PhoneConversionTracking() {
  useEffect(() => {
    function trackPhoneClick(event: MouseEvent) {
      if (event.defaultPrevented || event.button !== 0) return;
      if (!(event.target instanceof Element)) return;
      const link = event.target.closest("a[href]");
      if (!link?.getAttribute("href")?.toLowerCase().startsWith("tel:")) return;

      try {
        sendGAEvent("event", "phone_click", { send_to: "G-H64WF985Q8" });
      } catch {
        // Analytics must not prevent advertising measurement or telephone navigation.
      }
      try {
        sendGAEvent("event", "conversion", {
          send_to: "AW-18414772395/xGhQCKXJvqYdEKvB7MxE",
        });
      } catch {
        // Preserve the native telephone link even if tracking is blocked.
      }
      try {
        sendNaverPhoneClick();
      } catch {
        // Each provider is independent; a tracking failure must not block a call.
      }
    }

    document.addEventListener("click", trackPhoneClick);
    return () => document.removeEventListener("click", trackPhoneClick);
  }, []);

  return null;
}
