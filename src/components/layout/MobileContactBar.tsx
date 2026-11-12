"use client";

import { Phone } from "lucide-react";
import { useEffect, useState, useSyncExternalStore } from "react";
import {
  subscribeBrowserLocation,
  getBrowserPathname,
  getServerPathname,
} from "@/src/lib/browser-location-store";

export default function MobileContactBar() {
  const pathname = useSyncExternalStore(
    subscribeBrowserLocation,
    getBrowserPathname,
    getServerPathname,
  );
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const forms = new Map<Element, boolean>();
    const viewport = window.visualViewport;
    let frame = 0;
    function updateVisibility() {
      const focused = document.activeElement;
      const editing =
        focused instanceof HTMLElement &&
        focused.matches("input, textarea, select, [contenteditable='true']");
      const keyboardOpen =
        viewport && viewport.scale === 1 && viewport.height < window.innerHeight * 0.75;
      const menuOpen = Boolean(document.getElementById("mobile-navigation"));
      setVisible(!editing && !keyboardOpen && !menuOpen && ![...forms.values()].some(Boolean));
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) forms.set(entry.target, entry.isIntersecting);
        updateVisibility();
      },
      { rootMargin: "0px 0px -80px 0px" },
    );
    function refreshForms() {
      for (const form of forms.keys()) {
        if (!form.isConnected) {
          observer.unobserve(form);
          forms.delete(form);
        }
      }
      for (const form of document.querySelectorAll("[data-estimate-form]")) {
        if (!forms.has(form)) {
          const bounds = form.getBoundingClientRect();
          forms.set(
            form,
            form.getClientRects().length > 0 &&
              bounds.bottom > 0 &&
              bounds.top < window.innerHeight - 80,
          );
          observer.observe(form);
        }
      }
      updateVisibility();
    }
    function onFocusChange() {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(updateVisibility);
    }
    const mutations = new MutationObserver(refreshForms);
    mutations.observe(document.body, { childList: true, subtree: true });
    frame = requestAnimationFrame(refreshForms);
    document.addEventListener("focusin", onFocusChange);
    document.addEventListener("focusout", onFocusChange);
    viewport?.addEventListener("resize", updateVisibility);
    return () => {
      cancelAnimationFrame(frame);
      mutations.disconnect();
      observer.disconnect();
      document.removeEventListener("focusin", onFocusChange);
      document.removeEventListener("focusout", onFocusChange);
      viewport?.removeEventListener("resize", updateVisibility);
    };
  }, [pathname]);

  return (
    <>
      <aside
        aria-label="빠른 상담"
        hidden={!visible}
        className="fixed left-4 bottom-[calc(16px+env(safe-area-inset-bottom,0px))] z-40 lg:hidden"
      >
        <a
          href="tel:01053401728"
          className="flex min-h-12 items-center justify-center gap-2 rounded-full border border-brand-navy/15 bg-white px-5 py-3 text-sm font-bold text-brand-navy shadow-[0_4px_16px_rgba(16,45,74,0.16)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
        >
          <Phone size={20} aria-hidden="true" />
          전화 상담
        </a>
      </aside>
    </>
  );
}
