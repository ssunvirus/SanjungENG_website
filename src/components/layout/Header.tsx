import Image from "next/image";
import Link from "next/link";

const menus = [
    { label: "회사소개", href: "/about" },
    {
        label: "냉동공조",
        href: "/solutions",
        submenu: [
            { label: "냉동기", href: "/solutions" },
            { label: "항온항습기", href: "/solutions?category=precision-ac" },
            { label: "냉각탑", href: "/solutions?category=cooling-tower" },
            { label: "저온저장고", href: "/solutions?category=cold-storage" },
        ],
    },
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
                                <li key={menu.href} className="group relative shrink-0 text-center">
                                    <Link
                                        href={menu.href}
                                        className="relative inline-block min-w-[87px] whitespace-nowrap pb-[6px] text-[25px] font-bold text-[#243447] transition-colors after:absolute after:bottom-0 after:left-1/2 after:h-[2px] after:w-0 after:-translate-x-1/2 after:bg-[#00ADDB] after:transition-[width] after:duration-200 group-hover:text-[#006EB8] group-hover:after:w-full focus-visible:text-[#006EB8] focus-visible:outline-none focus-visible:after:w-full"
                                    >
                                        {menu.label}
                                    </Link>
                                    {menu.submenu && (
                                        <ul
                                            className="invisible absolute left-1/2 top-[calc(100%+8px)] z-50 w-[202px] -translate-x-1/2 translate-y-[-4px] rounded-[6px] border border-[#D1DFE8] bg-white p-[8px] text-left opacity-0 shadow-[0_3px_6px_rgba(0,0,0,0.25)] transition-[opacity,transform,visibility] duration-200 before:absolute before:-top-[9px] before:left-0 before:h-[9px] before:w-full before:content-[''] group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100"
                                            aria-label="냉동공조 하위 메뉴"
                                        >
                                            {menu.submenu.map((submenu) => (
                                                <li key={submenu.label}>
                                                    <Link
                                                        href={submenu.href}
                                                        className="flex h-[61px] items-center px-[8px] text-[21px] font-bold tracking-[-0.5px] text-[#243447] transition-colors hover:rounded-[9px] hover:bg-[#EFF7FB] hover:text-[#006EB8] focus-visible:rounded-[9px] focus-visible:bg-[#EFF7FB] focus-visible:text-[#006EB8] focus-visible:outline-none"
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
                        className="flex h-[40px] w-[120px] items-center justify-center rounded-[8px] bg-[#164A84] text-[25px] font-bold text-white"
                    >
                        견적문의
                    </Link>
                </div>
            </div>
        </header>
    );
}
