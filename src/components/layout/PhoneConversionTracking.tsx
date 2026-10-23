"use client";

import { useEffect } from "react";
import { sendGAEvent } from "@next/third-parties/google";

export default function PhoneConversionTracking() {
  useEffect(() => {
    function trackPhoneClick(event: MouseEvent) {
      if (event.defaultPrevented || event.button !== 0) return;
      if (!(event.target instanceof Element)) return;
      const link = event.target.closest("a[href]");
      if (!link?.getAttribute("href")?.toLowerCase().startsWith("tel:")) return;

      try {
        sendGAEvent("event", "conversion", {
          send_to: "AW-18414772395/xGhQCKXJvqYdEKvB7MxE",
        });
      } catch {
        // Preserve the native telephone link even if tracking is blocked.
      }
    }

    document.addEventListener("click", trackPhoneClick);
    return () => document.removeEventListener("click", trackPhoneClick);
  }, []);

  return null;
}
