import Image from "next/image";
import SectionEyebrow from "./SectionEyebrow";

const applications = [
  ["01", "전산실 / 서버실", "장비 운전 환경에 맞춘 온/습도 관리", "space-server-current.png"],
  ["02", "연구실 / 검사실", "시험/측정 조건에 맞춘 실내 환경 관리", "space-lab-current.png"],
  ["03", "생산 / 품질관리 공간", "공정에서 요구하는 온/습도 조건 검토", "space-production-current.png"],
] as const;

export default function Applications() {
  return (
    <section className="mx-auto h-[538px] w-[1440px] px-[120px] py-[60px]">
      <SectionEyebrow>APPLICATIONS</SectionEyebrow>
      <h2 className="mt-[9px] text-[51px] font-bold tracking-[2.5px] text-[#102D4A]">항온항습기가 필요한 공간</h2>
      <p className="mt-[22px] text-[17px] font-semibold">전산실부터 연구실 생산시설까지, 요구 조건에 맞는 온/습도 관리를 지원합니다.</p>
      <div className="mt-[37px] flex gap-[21px]">
        {applications.map(([number, title, description, image]) => (
          <article key={number} className="h-[240px] w-[386px] rounded-[11px] bg-white px-[26px] py-[21px]">
            <div className="flex items-start justify-between"><div className="relative size-[100px]"><Image src={`/images/precision-ac/${image}`} alt="" fill sizes="100px" className="object-cover" /></div><span className="text-[19px] font-bold text-[#00ADDB]">{number}</span></div>
            <h3 className="mt-[11px] text-[26px] font-bold text-[#102D4A]">{title}</h3><p className="mt-[10px] text-[18px] text-[#526075]">{description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
