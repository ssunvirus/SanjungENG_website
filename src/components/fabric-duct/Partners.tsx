import Image from "next/image";
import SectionHeading from "./SectionHeading";

export default function Partners() {
  return (
    <section
      aria-label="섬유덕트 공급 파트너"
      className="relative mx-auto h-[700px] w-[1440px] bg-white pt-[36.12px]"
    >
      <div className="ml-[46px]">
        <SectionHeading eyebrow="PARTNERS" title="파트너">
          산정엔지니어링과 함께하는 섬유덕트 공급 파트너입니다.
        </SectionHeading>
      </div>
      <div className="absolute left-1/2 top-[244.12px] flex h-[294px] w-[1012px] -translate-x-1/2 items-center gap-[106px]">
        <Image
          src="/images/fabric-duct/partner-klimagiel.png"
          alt="Klimagiel"
          width={400}
          height={267}
          sizes="400px"
          className="h-[267px] w-[400px] shrink-0 object-cover"
        />
        <div aria-hidden="true" className="relative h-[294px] w-0 shrink-0">
          <Image
            src="/images/fabric-duct/partners-divider.svg"
            alt=""
            width={294}
            height={2}
            className="absolute left-1/2 top-1/2 max-w-none -translate-x-1/2 -translate-y-1/2 rotate-90"
          />
        </div>
        <Image
          src="/images/fabric-duct/partner-multixair.png"
          alt="MultiXair"
          width={400}
          height={213}
          sizes="400px"
          className="h-[213px] w-[400px] shrink-0 object-cover opacity-80"
        />
      </div>
    </section>
  );
}
