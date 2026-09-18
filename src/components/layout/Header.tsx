import Image from "next/image";
import Link from "next/link";

const menus = [
    { label: "회사소개", href: "/about" },
    { label: "냉동공조", href: "/solutions" },
    { label: "섬유덕트", href: "/fabric-duct" },
    { label: "시공사례", href: "/#projects" },
];

export default function Header() {
    return (
        <header className="sticky top-0 z-50 h-[120px] border-b border-[#DCE6ED]/50 bg-white/90 shadow-[0_4px_10px_rgba(0,0,0,0.25)] backdrop-blur-[2.5px]">
            <div className="relative mx-auto flex h-full max-w-[1440px] items-center">
                <Link href="/" aria-label="산정엔지니어링 메인으로 이동">
                    <Image
                        src="/logo-default.svg"
                        alt="산정엔지니어링"
                        width={209}
                        height={64}
                        priority
                    />
                </Link>

                <div className="absolute left-[599px] flex items-center gap-[46px]">
                    <nav aria-label="주요 메뉴">
                        <ul className="flex w-[586px] items-center justify-center gap-[60px]">
                            {menus.map((menu) => (
                                <li key={menu.href} className="shrink-0 text-center">
                                    <Link
                                        href={menu.href}
                                        className="inline-block min-w-[87px] whitespace-nowrap text-[25px] font-medium text-[#243447]"
                                    >
                                        {menu.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <Link
                        href="/contact"
                        className="flex h-[42px] w-[140px] items-center justify-center rounded-[11px] bg-[#164A84] text-[25px] font-medium text-white"
                    >
                        견적문의
                    </Link>
                </div>
            </div>
        </header>
    );
}
