import Image from "next/image";
import { ChevronDown } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "냉동/공조설비 설치",
    description: "현장에 맞는 설비 설치",
    image: "/images/cold-storage/process-unit-installation.jpg",
    line: "/images/fabric-duct/one-stop-line-1.svg",
    lineWidth: 188,
    lineHeight: 3,
    lineTop: -9,
    circleTop: 57,
    arrowTop: 187,
  },
  {
    number: "02",
    title: "섬유덕트 설계/설치",
    description: "공간에 맞춘 기류 설계와 공기분배",
    image: "/images/projects/orion-production/cc_P5243359.jpg",
    line: "/images/fabric-duct/one-stop-line-2.svg",
    lineWidth: 193,
    lineHeight: 3.00041,
    lineTop: 0,
    circleTop: 66,
    arrowTop: 186,
  },
  {
    number: "03",
    title: "세척 / 유지보수",
    description: "설치 후 세척과 정기점검으로\n이어지는 관리",
    image: "/images/fabric-duct/one-stop-maintenance.png",
    line: "/images/fabric-duct/one-stop-line-3.svg",
    lineWidth: 194,
    lineHeight: 3,
    lineTop: 0,
    circleTop: 64,
    arrowTop: null,
  },
];

export default function OneStopSolution() {
  return (
    <section
      aria-labelledby="one-stop-heading"
      className="mx-auto grid pb-6 px-5 lg:px-0 lg:pl-[65px] h-auto lg:h-[817px] w-full lg:max-w-[1440px] grid-cols-1 lg:grid-cols-[485px_734px] gap-[28px] lg:gap-[52px] pt-[24px] lg:pt-[47.12px]"
    >
      <div>
        <p className="text-[14px] lg:text-[20px] font-bold leading-[24px] tracking-[3px] lg:tracking-[6px] text-brand-blue">
          ONE-STOP SOLUTION
        </p>
        <h2
          id="one-stop-heading"
          className="mt-[24px] lg:mt-[41px] lg:whitespace-nowrap text-[28px] lg:text-[45px] font-bold leading-10 lg:leading-[60px] tracking-[1px] lg:tracking-[2.25px] text-brand-navy"
        >
          냉동설비부터
          <br />
          섬유덕트까지,
          <br />
          설치부터 관리까지
          <span className="ml-[11px] text-brand-blue">한 번에</span>
        </h2>
        <p className="mt-[24px] lg:mt-[27px] text-[16px] lg:text-[25px] font-semibold leading-[24px] lg:leading-[40px] text-brand-text/60">
          산정엔지니어링은
          <br />
          냉동/공조설비부터 섬유덕트 설치,
          <br />
          유지보수까지 모두 가능합니다.
        </p>
        <Image
          src="/images/fabric-duct/one-stop-logo.png"
          alt="산정엔지니어링"
          width={412}
          height={126}
          sizes="412px"
          className="mt-[24px] lg:mt-[61px] h-auto w-[220px] lg:w-[412px] object-cover"
        />
      </div>
      <ol className="mt-[24px] lg:mt-[51px] flex flex-col gap-[28px] lg:gap-[39px]">
        {steps.map((step, index) => (
          <li
            key={step.number}
            className="grid h-auto lg:h-[194px] grid-cols-1 lg:grid-cols-[56px_374px_263px] items-center gap-y-4 lg:gap-y-0 gap-x-[20px]"
          >
            <div aria-hidden="true" className="hidden lg:block relative h-full">
              <Image
                src={step.line}
                width={step.lineWidth}
                height={step.lineHeight}
                alt=""
                className="absolute left-[28px] max-w-none"
                style={{
                  top: step.lineTop + step.lineWidth / 2,
                  transform: "translate(-50%, -50%) rotate(90deg)",
                }}
              />
              <span
                className="absolute flex size-[56px] items-center justify-center rounded-full border border-brand-blue bg-white text-[21px] lg:text-[30px] font-medium leading-[24px] lg:leading-[36px] text-brand-blue"
                style={{ top: step.circleTop, left: index === 0 ? 1 : 0 }}
              >
                {step.number}
              </span>
              {step.arrowTop !== null && (
                <ChevronDown
                  size={48}
                  strokeWidth={2}
                  className="absolute left-[5px] text-brand-blue"
                  style={{ top: step.arrowTop }}
                />
              )}
            </div>
            <div className="relative ml-[1px] h-[240px] lg:h-[194px] w-full lg:w-[374px] overflow-hidden">
              <div
                className={
                  index === 0 ? "absolute top-[-48.36%] h-[257.04%] w-full" : "absolute inset-0"
                }
              >
                <Image
                  src={step.image}
                  alt={step.title}
                  fill
                  sizes="374px"
                  quality={100}
                  className={index === 0 ? "object-fill" : "object-cover"}
                />
              </div>
            </div>
            <div className="flex flex-col gap-[16px] lg:gap-[10px] font-semibold">
              <span className="text-brand-blue lg:hidden">{step.number}</span>
              <h3 className="lg:whitespace-nowrap text-[21px] lg:text-[35px] leading-[24px] lg:leading-[40px] text-brand-text">
                {step.title}
              </h3>
              <p className="whitespace-pre-line lg:whitespace-pre text-[14px] lg:text-[20px] leading-[24px] lg:leading-[40px] text-brand-text/60">
                {step.description}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
