import Image from "next/image";
import SectionEyebrow from "./SectionEyebrow";

const process = [
  ["01", "운전 상태 확인", "설정 온/습도 실제 측정값, 알람 확인", "process-inspection-current.png"],
  ["02", "주요 부품 점검", "필터, 압축기 등 장비 상태 확인", "process-parts-current.png"],
  ["03", "세척 및 부품 정비", "고장 및 오염 부품 교체", "process-repair-current.png"],
  ["04", "시운전 및 최종 확인", "설치 및 수리 완료 후 인계", "process-test-current.png"],
] as const;

export default function WorkProcess() {
  return (
    <section className="mx-auto h-[941px] w-[1440px] bg-[#00ADDB]/5 px-[120px] py-[60px]">
      <SectionEyebrow>WORK PROCESS</SectionEyebrow><h2 className="mt-[10px] text-[50px] font-bold tracking-[2.5px] text-[#102D4A]">항온항습기, 이렇게 점검하고 정비합니다.</h2><p className="mt-[25px] text-[19px] font-semibold">온/습도 제어 상태부터 주요 부품까지 점검하고, 필요한 정비 후 정상 작동을 확인합니다.</p>
      <div className="relative mt-[60px] flex gap-[19px]">
        <span aria-hidden="true" className="absolute left-[209px] top-[484px] h-[2px] w-[200px] bg-[#00ADDB]" />
        <span aria-hidden="true" className="absolute left-[528px] top-[484px] h-[2px] w-[200px] bg-[#00ADDB]" />
        <span aria-hidden="true" className="absolute left-[847px] top-[484px] h-[2px] w-[200px] bg-[#00ADDB]" />
        {process.map(([number, title, description, image]) => <article key={number} className="relative z-10 flex w-[300px] flex-col items-center gap-[40px]"><div className="relative h-[400px] w-[300px] overflow-hidden rounded-[10px] shadow-[0_4px_4px_rgba(0,0,0,0.25)]"><Image src={`/images/precision-ac/${image}`} alt={title} fill sizes="300px" quality={100} className="object-cover" /></div><div className="flex flex-col items-center text-center"><span className="flex size-[76px] items-center justify-center rounded-full bg-[#00ADDB] text-[30px] font-bold text-white">{number}</span><h3 className="mt-[25px] text-[30px] font-semibold">{title}</h3><p className="mt-[15px] whitespace-nowrap text-[22px] font-semibold leading-[28px] text-[#243447]/80">{description}</p></div></article>)}
      </div>
    </section>
  );
}
