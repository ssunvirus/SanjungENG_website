import Image from "next/image";

export default function Customers() {
    return (
        <section
            aria-label="함께한 주요 현장"
            className="relative mx-auto h-[874px] w-[1440px] overflow-hidden bg-[#EFF7FB]"
        >
            <Image
                src="/images/customers/customer-section-compact.png"
                alt="산정이 작업한 주요 현장: AkzoNobel, PLAKOR, 농협, LOGIPORT, 오리온, 성민글로벌, 아주약품, 백광산업, PKC"
                fill
                sizes="1440px"
                className="object-cover"
            />
        </section>
    );
}
