import Image from "next/image";
import SectionHeading from "./SectionHeading";

export default function Partners() {
  return (
    <section
      aria-label="섬유덕트 공급 파트너"
      className="relative mx-auto h-auto lg:h-[700px] w-full lg:max-w-[1440px] bg-white px-5 pb-9 pt-[24px] lg:px-0 lg:pb-0 lg:pt-[36.12px]"
    >
      <div className="ml-0 lg:ml-[46px]">
        <SectionHeading eyebrow="PARTNERS" title="파트너">
          산정엔지니어링과 함께하는 섬유덕트 공급 파트너입니다.
        </SectionHeading>
      </div>
      <div className="relative mt-7 lg:mt-0 lg:absolute lg:left-1/2 lg:top-[244.12px] flex flex-col lg:flex-row h-auto lg:h-[294px] w-full lg:w-[1012px] lg:-translate-x-1/2 items-center gap-[28px] lg:gap-[106px]">
        <Image
          src="/images/fabric-duct/partner-klimagiel.png"
          alt="Klimagiel"
          width={400}
          height={267}
          sizes="400px"
          className="h-auto lg:h-[267px] max-w-[280px] lg:max-w-none w-full lg:w-[400px] shrink-0 object-cover"
        />
        <div
          aria-hidden="true"
          className="hidden lg:block relative h-[240px] lg:h-[294px] w-0 shrink-0"
        >
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
          className="h-auto lg:h-[213px] max-w-[280px] lg:max-w-none w-full lg:w-[400px] shrink-0 object-cover opacity-80"
        />
      </div>
    </section>
  );
}
