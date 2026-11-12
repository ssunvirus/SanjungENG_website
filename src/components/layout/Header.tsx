"use client";

import Image from "next/image";
import Link from "next/link";
import { Search, Menu, X, ChevronDown, ChevronRight, ArrowRight } from "lucide-react";
import { useState, useSyncExternalStore } from "react";
import {
  subscribeBrowserLocation,
  getBrowserPathname,
  getServerPathname,
} from "@/src/lib/browser-location-store";

const previewPanelClassName =
  "invisible absolute left-1/2 -translate-x-1/2 top-full z-50 grid w-[min(1040px,calc(100vw-48px))] translate-y-[-4px] grid-cols-[300px_minmax(0,1fr)] gap-8 rounded-[26px] border border-[#D1DFE8] bg-white p-8 text-left opacity-0 shadow-[0_16px_40px_rgba(16,46,73,0.16)] transition-[opacity,transform,visibility] duration-200 before:absolute before:-top-[10px] before:left-0 before:h-[10px] before:w-full before:content-[''] group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 motion-reduce:transition-none";

const previewButtonClassName =
  "group/detail mt-5 inline-flex min-h-14 items-center justify-between gap-6 rounded-xl border border-[#B9D2E4] bg-[#F4F9FC] px-5 py-2.5 text-[22px] font-bold leading-8 text-brand-navy transition-colors hover:border-brand-navy hover:bg-brand-navy hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-blue motion-reduce:transition-none";

const menus = [
  { label: "회사소개", href: "/about" },
  {
    label: "냉동공조",
    href: "/solutions",
    submenu: [
      { label: "냉동기", href: "/solutions" },
      { label: "저온저장고", href: "/solutions/cold-storage" },
      { label: "냉각탑", href: "/solutions/cooling-tower" },
      { label: "항온항습기", href: "/solutions/precision-ac" },
    ],
  },
  {
    label: "패브릭덕트",
    href: "/fabric-duct",
    submenu: [
      { label: "패브릭덕트 솔루션", href: "/fabric-duct" },
      { label: "인증서 & 카탈로그", href: "/fabric-duct/resources" },
    ],
  },
  { label: "시공사례", href: "/projects" },
];

const solutionPreviews = [
  {
    label: "냉동기",
    href: "/solutions",
    image: "chiller.png",
    description: "냉동기 설치, 교체, 유지보수 및 철거",
  },
  {
    label: "저온저장고",
    href: "/solutions/cold-storage",
    image: "cold-storage.png",
    description: "보관 환경에 맞춘 CDU, 유니트쿨러 설치 및 냉동설비 시공",
  },
  {
    label: "냉각탑",
    href: "/solutions/cooling-tower",
    image: "cooling-tower.png",
    description: "냉각탑 설치와 교체, 충진물 및 주요 부품 정비",
  },
  {
    label: "항온항습기",
    href: "/solutions/precision-ac",
    image: "precision-ac.png",
    description: "공간의 온도/습도 조건에 맞춘 설치, 수리 및 정기점검",
  },
];

const fabricPreviews = [
  {
    label: "패브릭덕트 솔루션",
    href: "/fabric-duct",
    image: "fabric-duct.png",
    description: "공간과 공기 흐름에 맞춘 패브릭덕트 설계, 설치 및 유지관리",
  },
  {
    label: "인증서 & 카탈로그",
    href: "/fabric-duct/resources",
    image: "fabric-resources.png",
    description: "패브릭덕트 제품 인증서와 카탈로그를 확인해보세요.",
  },
];

export default function Header() {
  const pathname = useSyncExternalStore(
    subscribeBrowserLocation,
    getBrowserPathname,
    getServerPathname,
  );
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);
  const [previewIndex, setPreviewIndex] = useState(0);
  const [fabricPreviewIndex, setFabricPreviewIndex] = useState(0);
  const [contactHovered, setContactHovered] = useState(false);
  const [contactFocused, setContactFocused] = useState(false);
  const contactActive = contactHovered || contactFocused;

  function closeMobileMenu() {
    setMobileOpen(false);
    setExpandedMenu(null);
  }

  const isMenuActive = (href: string) => {
    if (href === "/projects") return pathname === "/projects" || pathname.startsWith("/projects/");
    if (href === "/solutions") return pathname.startsWith("/solutions");
    if (href === "/fabric-duct") return pathname.startsWith("/fabric-duct");
    if (href.includes("#")) return false;
    return pathname === href;
  };

  return (
    <header
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          closeMobileMenu();
          document.getElementById("mobile-menu-toggle")?.focus();
        }
      }}
      className="sticky top-0 z-50 h-[64px] bg-white/90 shadow-[0_4px_5px_rgba(0,0,0,0.25)] backdrop-blur-[5px] lg:h-[90px]"
    >
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 hidden origin-right bg-brand-navy transition-transform duration-700 ease-in-out motion-reduce:transition-none lg:block ${contactActive ? "scale-x-100" : "scale-x-0"}`}
      />
      <div className="relative mx-auto flex h-full w-full max-w-[1920px] items-center justify-between px-5 lg:pl-[clamp(24px,12.5vw,240px)] lg:pr-0">
        <Link
          href="/"
          onClick={closeMobileMenu}
          className="shrink-0"
          aria-label="산정엔지니어링 메인으로 이동"
        >
          <Image
            src={contactActive ? "/logo-white.svg" : "/logo-default.svg"}
            alt="산정엔지니어링"
            width={contactActive ? 204 : 209}
            height={contactActive ? 68 : 64}
            priority
            className="h-auto w-[132px] lg:w-[158px]"
          />
        </Link>

        <button
          id="mobile-menu-toggle"
          type="button"
          aria-label={mobileOpen ? "메뉴 닫기" : "메뉴 열기"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-navigation"
          onClick={() => {
            if (mobileOpen) closeMobileMenu();
            else setMobileOpen(true);
          }}
          className="flex size-11 cursor-pointer items-center justify-center rounded text-brand-navy focus-visible:outline-2 focus-visible:outline-brand-blue lg:hidden"
        >
          {mobileOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>

        <div className="hidden h-full items-center gap-[clamp(24px,7.1875vw,138px)] lg:flex">
          <nav aria-label="주요 메뉴" className="h-full">
            <ul className="flex h-full items-center justify-center gap-[clamp(20px,3.125vw,60px)]">
              {menus.map((menu) => {
                const isFabric = menu.href === "/fabric-duct";
                const previews = isFabric ? fabricPreviews : solutionPreviews;
                const selectedIndex = isFabric ? fabricPreviewIndex : previewIndex;
                const selectPreview = isFabric ? setFabricPreviewIndex : setPreviewIndex;
                const preview = previews[selectedIndex];
                const previewAction =
                  preview.href === "/fabric-duct/resources" ? "자료 확인하기" : "서비스 알아보기";
                return (
                  <li
                    key={menu.href}
                    className="group flex h-full shrink-0 items-center text-center"
                  >
                    <Link
                      href={menu.href}
                      onClick={(event) => event.currentTarget.blur()}
                      className={`relative inline-block min-w-[87px] whitespace-nowrap pb-[6px] text-[25px] font-bold transition-colors after:absolute after:bottom-0 after:left-1/2 after:h-[2px] after:-translate-x-1/2 after:bg-brand-blue after:transition-[width] after:duration-200 group-hover:text-[#006EB8] group-hover:after:w-full focus-visible:text-[#006EB8] focus-visible:outline-none focus-visible:after:w-full ${
                        contactActive
                          ? "text-white after:w-0"
                          : isMenuActive(menu.href)
                            ? "text-[#006EB8] after:w-full"
                            : "text-brand-text after:w-0"
                      }`}
                    >
                      {menu.label}
                    </Link>
                    {menu.submenu ? (
                      <div aria-label={`${menu.label} 하위 메뉴`} className={previewPanelClassName}>
                        <ul className="space-y-2 border-r border-[#D1DFE8] pr-6">
                          {previews.map((item, index) => (
                            <li key={item.href}>
                              <Link
                                href={item.href}
                                onMouseEnter={() => selectPreview(index)}
                                onFocus={() => selectPreview(index)}
                                onClick={(event) => event.currentTarget.blur()}
                                aria-current={pathname === item.href ? "page" : undefined}
                                className={`flex min-h-16 items-center justify-between gap-3 whitespace-nowrap rounded-full px-4 py-3 text-[24px] font-bold leading-8 transition-colors focus-visible:outline-2 focus-visible:outline-brand-blue ${selectedIndex === index ? "bg-[#EFF7FB] text-[#006EB8]" : "text-brand-text/80 hover:bg-[#EFF7FB]"}`}
                              >
                                {item.label}
                                {
                                  <ChevronRight
                                    size={25}
                                    aria-hidden="true"
                                    className={`shrink-0 text-brand-blue ${selectedIndex === index ? "opacity-100" : "opacity-0"}`}
                                  />
                                }
                              </Link>
                            </li>
                          ))}
                        </ul>
                        <div className="flex min-w-0 items-center gap-6">
                          <div className="relative size-[128px] shrink-0 overflow-hidden rounded-3xl bg-[#EFF7FB]">
                            <Image
                              src={`/images/navigation/${preview.image}`}
                              alt=""
                              fill
                              sizes="128px"
                              className={`object-contain ${isFabric ? "[filter:hue-rotate(-25deg)]" : ""}`}
                            />
                          </div>
                          <div className="min-w-0">
                            <p className="break-keep text-[36px] font-bold leading-tight text-brand-navy">
                              {preview.label}
                            </p>
                            <p className="mt-3 break-keep text-[20px] font-medium leading-8 text-brand-text/80">
                              {preview.description}
                            </p>
                            <Link
                              href={preview.href}
                              aria-label={`${preview.label} ${previewAction}`}
                              onClick={(event) => event.currentTarget.blur()}
                              className={previewButtonClassName}
                            >
                              <span>{previewAction}</span>
                              <ArrowRight
                                size={24}
                                aria-hidden="true"
                                className="shrink-0 text-[#006EB8] transition-colors group-hover/detail:text-white motion-reduce:transition-none"
                              />
                            </Link>
                          </div>
                        </div>
                      </div>
                    ) : null}{" "}
                  </li>
                );
              })}
            </ul>
          </nav>

          <Link
            href="/contact"
            onMouseEnter={() => setContactHovered(true)}
            onMouseLeave={() => setContactHovered(false)}
            onFocus={() => setContactFocused(true)}
            onBlur={() => setContactFocused(false)}
            className="group/contact relative isolate flex h-[90px] w-[clamp(200px,21.2vw,407px)] items-center justify-center gap-[12px] overflow-hidden bg-brand-navy text-[30px] font-bold text-white [clip-path:polygon(32px_0,100%_0,100%_100%,0_100%)] focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-white"
          >
            <Search size={30} strokeWidth={2.5} aria-hidden="true" />
            <span className="whitespace-nowrap">견적문의</span>
          </Link>
        </div>
      </div>
      {mobileOpen && (
        <nav
          id="mobile-navigation"
          aria-label="모바일 주요 메뉴"
          className="absolute left-0 top-full max-h-[calc(100dvh-64px)] w-full overflow-y-auto border-t border-[#D1DFE8] bg-white px-5 pb-6 shadow-lg lg:hidden"
        >
          <ul>
            {menus.map((menu) => (
              <li key={menu.href} className="border-b border-[#D1DFE8]">
                <div className="flex items-center justify-between">
                  {menu.submenu ? (
                    <button
                      type="button"
                      aria-expanded={expandedMenu === menu.href}
                      aria-controls={`mobile-submenu-${menu.href.slice(1)}`}
                      onClick={() => setExpandedMenu(expandedMenu === menu.href ? null : menu.href)}
                      className={`flex min-h-14 w-full cursor-pointer items-center justify-between text-left text-lg font-bold focus-visible:outline-2 focus-visible:outline-brand-blue ${isMenuActive(menu.href) ? "text-[#006EB8]" : "text-brand-text"}`}
                    >
                      <span
                        className={
                          isMenuActive(menu.href)
                            ? "underline decoration-brand-blue underline-offset-8"
                            : ""
                        }
                      >
                        {menu.label}
                      </span>
                      <span className="flex size-11 items-center justify-center text-brand-navy">
                        <ChevronDown
                          aria-hidden="true"
                          className={expandedMenu === menu.href ? "rotate-180" : ""}
                        />
                      </span>
                    </button>
                  ) : (
                    <Link
                      href={menu.href}
                      onClick={closeMobileMenu}
                      aria-current={isMenuActive(menu.href) ? "page" : undefined}
                      className={`flex min-h-14 flex-1 items-center text-lg font-bold ${isMenuActive(menu.href) ? "text-[#006EB8] underline decoration-brand-blue underline-offset-8" : "text-brand-text"}`}
                    >
                      {menu.label}
                    </Link>
                  )}
                </div>
                {menu.submenu && (
                  <ul
                    id={`mobile-submenu-${menu.href.slice(1)}`}
                    hidden={expandedMenu !== menu.href}
                    className="mb-3 rounded bg-[#EFF7FB] px-4 py-2"
                  >
                    {menu.submenu.map((submenu) => (
                      <li key={submenu.href}>
                        <Link
                          href={submenu.href}
                          onClick={closeMobileMenu}
                          aria-current={pathname === submenu.href ? "page" : undefined}
                          className={`flex min-h-11 items-center text-base font-medium ${pathname === submenu.href ? "text-[#006EB8]" : "text-brand-text"}`}
                        >
                          {submenu.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
          <Link
            href="/contact"
            onClick={closeMobileMenu}
            className="mt-5 flex min-h-12 items-center justify-center gap-2 rounded bg-brand-navy text-lg font-bold text-white"
          >
            <Search size={22} aria-hidden="true" />
            견적문의
          </Link>
        </nav>
      )}
    </header>
  );
}
