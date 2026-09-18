import Image from "next/image";

export default function Customers() {
    return (
        <section
            aria-label="함께한 주요 현장"
            className="relative mx-auto h-[1122px] w-full max-w-[1920px] overflow-hidden bg-white"
        >
            <Image
                src="/images/customers/customer-section.png"
                alt="산정이 작업한 주요 현장: AkzoNobel, PLAKOR, 농협, LOGIPORT, 오리온, 성민글로벌, 아주약품, 백광산업, PKC"
                fill
                sizes="1920px"
                className="object-cover"
            />
        </section>
    );
}
