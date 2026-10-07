"use client";

import Image from "next/image";
import Link from "next/link";
import { Search } from "lucide-react";
import { usePathname } from "next/navigation";

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
        label: "섬유덕트",
        href: "/fabric-duct",
        submenu: [
            { label: "섬유덕트 솔루션", href: "/fabric-duct" },
            { label: "인증서 & 카탈로그", href: "/fabric-duct/resources" },
        ],
    },
    { label: "시공사례", href: "/#projects" },
];

export default function Header() {
    const pathname = usePathname();

    const isMenuActive = (href: string) => {
        if (href === "/solutions") return pathname.startsWith("/solutions");
        if (href === "/fabric-duct") return pathname.startsWith("/fabric-duct");
        if (href.includes("#")) return false;
        return pathname === href;
    };

    return (
        <header className="sticky top-0 z-50 h-[90px] bg-white/90 shadow-[0_4px_5px_rgba(0,0,0,0.25)] backdrop-blur-[5px]">
            <div className="mx-auto flex h-full w-[1920px] items-center pl-[240px]">
                <Link href="/" aria-label="산정엔지니어링 메인으로 이동">
                    <Image
                        src="/logo-default.svg"
                        alt="산정엔지니어링"
                        width={158}
                        height={48}
                        priority
                    />
                </Link>

                <div className="ml-[450px] flex h-full items-center gap-[138px]">
                    <nav aria-label="주요 메뉴">
                        <ul className="flex w-[528px] items-center justify-center gap-[60px]">
                            {menus.map((menu) => (
                                <li key={menu.href} className="group relative shrink-0 text-center">
                                    <Link
                                        href={menu.href}
                                        onClick={(event) => event.currentTarget.blur()}
                                        className={`relative inline-block min-w-[87px] whitespace-nowrap pb-[6px] text-[25px] font-bold transition-colors after:absolute after:bottom-0 after:left-1/2 after:h-[2px] after:-translate-x-1/2 after:bg-[#00ADDB] after:transition-[width] after:duration-200 group-hover:text-[#006EB8] group-hover:after:w-full focus-visible:text-[#006EB8] focus-visible:outline-none focus-visible:after:w-full ${isMenuActive(menu.href)
                                            ? "text-[#006EB8] after:w-full"
                                            : "text-[#243447] after:w-0"
                                            }`}
                                    >
                                        {menu.label}
                                    </Link>
                                    {menu.submenu && (
                                        <ul
                                            className="invisible absolute left-1/2 top-[calc(100%+8px)] z-50 w-[202px] -translate-x-1/2 translate-y-[-4px] rounded-[6px] border border-[#D1DFE8] bg-white p-[8px] text-left opacity-0 shadow-[0_3px_6px_rgba(0,0,0,0.25)] transition-[opacity,transform,visibility] duration-200 before:absolute before:-top-[9px] before:left-0 before:h-[9px] before:w-full before:content-[''] group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100"
                                            aria-label={`${menu.label} 하위 메뉴`}
                                        >
                                            {menu.submenu.map((submenu) => (
                                                <li key={submenu.label}>
                                                    <Link
                                                        href={submenu.href}
                                                        onClick={(event) => event.currentTarget.blur()}
                                                        className="flex h-[61px] items-center px-[8px] text-[20px] font-bold tracking-[-0.5px] text-[#243447]/80 transition-colors hover:rounded-[9px] hover:bg-[#EFF7FB] hover:text-[#006EB8] focus-visible:rounded-[9px] focus-visible:bg-[#EFF7FB] focus-visible:text-[#006EB8] focus-visible:outline-none"
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
                    </nav>

                    <Link
                        href="/#contact"
                        className="flex h-[90px] w-[407px] items-center gap-[12px] bg-[#102D4A] pl-[150px] text-[30px] font-bold text-white [clip-path:polygon(32px_0,100%_0,100%_100%,0_100%)]"
                    >
                        <Search size={30} strokeWidth={2.5} aria-hidden="true" />
                        <span className="whitespace-nowrap">견적문의</span>
                    </Link>
                </div>
            </div>
        </header>
    );
}
