import Image from "next/image";
import SectionHeading from "./SectionHeading";

const rows = [
  ["구분", "금속덕트", "섬유덕트"],
  ["소재", "아연도금 강판", "섬유 소재"],
  ["공기분배", "별도 취출구", "원단/타공부/노츨"],
  ["설치방식", "조립 지지대 고정", "케이블/레일설치"],
  ["유지관리", "내부 점검/청소", "탈착/세척"],
];

export default function Introduction() {
  return (
    <section className="mx-auto h-[866px] w-[1920px] bg-white pl-[280px] pr-[178px] pt-[69px]">
      <div className="grid grid-cols-[739px_683px] gap-[40px]">
        <div>
          <div className="h-[218px]">
            <SectionHeading eyebrow="FABRIC DUCT" title="섬유덕트란?">
              <p>섬유덕트는 섬유 소재로 제작된 공기 분배 시스템입니다.</p>
              <p>
                공조설비에서 공급된 공기를 통기성 원단이나 타공부/노즐을 통해 공간에 분배합니다.
              </p>
            </SectionHeading>
          </div>
          <div className="relative h-[510px]">
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
        <div className="pt-[40px]">
          <h3 className="ml-[15px] text-[40px] font-bold leading-[48px] tracking-[2px] text-[#006EB8]">
            금속덕트와 차이점
          </h3>
          <table className="mt-[33px] h-[337px] w-[681px] table-fixed border-separate border-spacing-0 text-center text-[20px] tracking-[1px] [&_th:not(:last-child)]:border-r-[5px] [&_td:not(:last-child)]:border-r-[5px] [&_th]:border-transparent [&_td]:border-transparent [&_th]:bg-clip-padding [&_td]:bg-clip-padding [&_tbody_th]:border-t-[10px] [&_tbody_td]:border-t-[10px]">
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
                    className={`h-[59.4px] text-[25px] font-bold ${index === 2 ? "bg-[#00ADDB]/60 text-white" : "bg-[#F0F1F3] text-[#102D4A]"}`}
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
          <div className="relative mt-[15px] h-[255px] overflow-hidden">
            <div className="absolute top-[-27.63%] h-[178.58%] w-full">
              <Image
                src="/images/fabric-duct/comparison.png"
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
