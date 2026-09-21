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
        <header className="sticky top-0 z-50 h-[90px] bg-white shadow-[0_4px_5px_rgba(0,0,0,0.25)] backdrop-blur-[5px]">
            <div className="mx-auto flex h-full w-[1440px] items-center">
                <Link href="/" aria-label="산정엔지니어링 메인으로 이동">
                    <Image
                        src="/logo-default.svg"
                        alt="산정엔지니어링"
                        width={158}
                        height={48}
                        priority
                    />
                </Link>

                <div className="ml-[500px] flex items-center gap-[100px]">
                    <nav aria-label="주요 메뉴">
                        <ul className="flex w-[515px] items-center justify-center gap-[45px]">
                            {menus.map((menu) => (
                                <li key={menu.href} className="shrink-0 text-center">
                                    <Link
                                        href={menu.href}
                                        className="inline-block min-w-[87px] whitespace-nowrap text-[25px] font-bold text-[#243447]"
                                    >
                                        {menu.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <Link
                        href="/#contact"
                        className="flex h-[40px] w-[120px] items-center justify-center rounded-[8px] bg-[#164A84] text-[25px] font-bold text-white"
                    >
                        견적문의
                    </Link>
                </div>
            </div>
        </header>
    );
}
