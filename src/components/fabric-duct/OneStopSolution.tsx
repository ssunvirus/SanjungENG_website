import Image from "next/image";
import { ChevronDown } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "냉동/공조설비 설치",
    description: "현장에 맞는 설비 설치",
    image: "/images/fabric-duct/one-stop-installation.png",
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
    image: "/images/fabric-duct/one-stop-design.png",
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
      className="mx-auto grid h-[817px] w-[1440px] grid-cols-[485px_734px] gap-[52px] pt-[47.12px]"
    >
      <div>
        <p className="text-[20px] font-bold leading-[24px] tracking-[6px] text-[#00ADDB]">
          ONE-STOP SOLUTION
        </p>
        <h2
          id="one-stop-heading"
          className="mt-[41px] whitespace-nowrap text-[45px] font-bold leading-[60px] tracking-[2.25px] text-[#102D4A]"
        >
          냉동설비부터
          <br />
          섬유덕트까지,
          <br />
          설치부터 관리까지
          <span className="ml-[11px] text-[#00ADDB]">한 번에</span>
        </h2>
        <p className="mt-[27px] text-[25px] font-semibold leading-[40px] text-[#243447]/60">
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
          className="mt-[61px] object-cover"
        />
      </div>
      <ol className="mt-[51px] flex flex-col gap-[39px]">
        {steps.map((step, index) => (
          <li
            key={step.number}
            className="grid h-[194px] grid-cols-[56px_374px_263px] items-center gap-x-[20px]"
          >
            <div aria-hidden="true" className="relative h-full">
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
                className="absolute flex size-[56px] items-center justify-center rounded-full border border-[#00ADDB] bg-white text-[30px] font-medium leading-[36px] text-[#00ADDB]"
                style={{ top: step.circleTop, left: index === 0 ? 1 : 0 }}
              >
                {step.number}
              </span>
              {step.arrowTop !== null && (
                <ChevronDown
                  size={48}
                  strokeWidth={2}
                  className="absolute left-[5px] text-[#00ADDB]"
                  style={{ top: step.arrowTop }}
                />
              )}
            </div>
            <div className="relative ml-[1px] h-[194px] w-[374px] overflow-hidden">
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
            <div className="flex flex-col gap-[10px] font-semibold">
              <h3 className="whitespace-nowrap text-[35px] leading-[40px] text-[#243447]">
                {step.title}
              </h3>
              <p className="whitespace-pre text-[20px] leading-[40px] text-[#243447]/60">
                {step.description}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
