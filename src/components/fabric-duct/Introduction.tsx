import Image from "next/image";
import SectionHeading from "./SectionHeading";

const rows = [
  ["구분", "금속덕트", "섬유덕트"],
  ["소재", "아연도금 강판", "섬유 소재"],
  ["공기분배", "별도 취출구", "원단/타공부/노즐"],
  ["설치방식", "조립 지지대 고정", "케이블/레일설치"],
  ["유지관리", "내부 점검/청소", "탈착/세척"],
];

export default function Introduction() {
  return (
    <section className="mx-auto h-auto w-full max-w-[1920px] bg-white px-5 pb-7 pt-6 lg:px-[clamp(40px,8vw,160px)] lg:pt-[69px] min-[1920px]:h-[866px] min-[1920px]:pl-[280px] min-[1920px]:pr-[178px]">
      <div className="grid grid-cols-1 gap-5 min-[1920px]:grid-cols-[739px_683px] min-[1920px]:gap-[40px]">
        <div>
          <div className="h-auto  lg:h-[218px]">
            <SectionHeading eyebrow="FABRIC DUCT" title="섬유덕트란?">
              <p>섬유덕트는 섬유 소재로 제작된 공기 분배 시스템입니다.</p>
              <p>
                공조설비에서 공급된 공기를 통기성 원단이나 타공부/노즐을 통해 공간에 빈틈없이
                분배합니다.
              </p>
            </SectionHeading>
          </div>
          <div className="relative h-[260px] lg:h-[510px]">
            <Image
              src="/images/fabric-duct/introduction.png"
              alt="MultiXair 공기분배 덕트 설치 현장"
              fill
              sizes="739px"
              quality={100}
              className="object-cover"
            />
          </div>
        </div>
        <div className="pt-[24px] lg:pt-[40px]">
          <h3 className="ml-[15px] text-[21px] lg:text-[40px] font-bold leading-[24px] lg:leading-[48px] tracking-[1px] lg:tracking-[2px] text-[#006EB8]">
            금속덕트와 차이점
          </h3>
          <table className="mt-[24px] lg:mt-[33px] h-auto lg:h-[337px] w-full max-w-[681px] table-fixed border-separate border-spacing-0 text-center text-[14px] lg:text-[20px] tracking-[1px] lg:tracking-[1px] [&_th:not(:last-child)]:border-r-[5px] [&_td:not(:last-child)]:border-r-[5px] [&_th]:border-transparent [&_td]:border-transparent [&_th]:bg-clip-padding [&_td]:bg-clip-padding [&_tbody_th]:border-t-[10px] [&_tbody_td]:border-t-[10px]">
            <colgroup>
              <col className="w-1/5" />
              <col className="w-2/5" />
              <col className="w-2/5" />
            </colgroup>
            <thead>
              <tr>
                {rows[0].map((cell, index) => (
                  <th
                    key={cell}
                    className={`h-[48px] lg:h-[59.4px] text-sm lg:text-[25px] font-bold ${index === 2 ? "bg-[#00ADDB]/60 text-white" : "bg-[#F0F1F3] text-[#102D4A]"}`}
                  >
                    {cell}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.slice(1).map((row) => (
                <tr key={row[0]}>
                  <th scope="row" className="h-[69.4px] bg-[#6E7D8C]/5 font-bold text-[#102D4A]">
                    {row[0]}
                  </th>
                  <td className="bg-[#6E7D8C]/5 font-medium text-[#102D4A]/60">{row[1]}</td>
                  <td className="bg-[#00ADDB]/15 font-semibold text-[#102D4A]/80">{row[2]}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="relative hidden lg:block lg:mt-[15px] lg:h-[255px] overflow-hidden">
            <div className="absolute hidden lg:block top-[-27.63%] h-[178.58%] w-full">
              <Image
                src="/images/fabric-duct/comparison.jpg"
                alt="천장에 설치된 덕트와 공조설비"
                fill
                sizes="683px"
                quality={100}
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
