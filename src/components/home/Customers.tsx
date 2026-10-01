import Image from "next/image";

export default function Customers() {
    return (
        <section
            aria-label="함께한 주요 현장"
            className="relative mx-auto h-[1032px] w-[1440px] overflow-hidden bg-[#EFF7FB]"
        >
            <Image
                src="/images/customers/customer-section-current.png"
                alt="산정이 작업한 주요 현장: AkzoNobel, PLAKOR, 농협, LOGIPORT, 오리온, 백광산업, 성민글로벌, 화성, DB Schenker, 아주약품, BBQ"
                fill
                sizes="1440px"
                className="object-cover"
            />
        </section>
    );
}
