import Image from "next/image";
import SectionEyebrow from "@/src/components/shared/SectionEyebrow";

const process = [
  ["01", "운전 상태 확인", "설정 온/습도 실제 측정값, 알람 확인", "process-inspection-card.jpg"],
  ["02", "주요 부품 점검", "필터, 압축기 등 장비 상태 확인", "process-parts-current.jpg"],
  ["03", "세척 및 부품 정비", "고장 및 오염 부품 교체", "process-repair-card.jpg"],
  ["04", "시운전 및 최종 확인", "설치 및 수리 완료 후 인계", "process-test-card.jpg"],
] as const;

export default function WorkProcess() {
  return (
    <section className="mx-auto w-full bg-[#E3F6FC] px-5 py-9 lg:max-w-[1600px] lg:px-10 lg:py-[64px]">
      <SectionEyebrow>WORK PROCESS</SectionEyebrow>
      <h2 className="mt-[10px] text-[28px] lg:text-[50px] font-bold tracking-[1px] lg:tracking-[2.5px] text-brand-navy">
        항온항습기, 이렇게 점검하고 정비합니다.
      </h2>
      <p className="mt-[10px] lg:mt-[25px] text-[14px] lg:text-[19px] font-semibold">
        온/습도 제어 상태부터 주요 부품까지 점검하고, 필요시 정비 후 정상 작동을 확인합니다.
      </p>
      <div className="relative mt-8 lg:mt-10">
        <ol className="relative z-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
        {process.map(([number, title, description, image]) => (
          <li key={number} className="group min-w-0 overflow-hidden rounded-xl border border-brand-navy/10 bg-white shadow-[0_4px_16px_rgba(16,46,73,0.08)] transition-[border-color,box-shadow,transform] duration-200 hover:border-brand-blue hover:shadow-[0_8px_24px_rgba(0,173,219,0.15)] motion-safe:hover:-translate-y-1 motion-reduce:transition-none">
            <div className="relative h-[300px] overflow-hidden bg-[#F1FAFD] sm:h-[340px] lg:h-[410px]">
              <Image
                src={`/images/precision-ac/${image}`}
                alt={title}
                fill
                sizes="(min-width: 1440px) 365px, (min-width: 640px) 45vw, 90vw"
                quality={100}
                className="object-cover"
              />
            </div>
            <div className="relative px-5 pb-6 pt-8">
              <span className="absolute -top-5 left-5 inline-flex h-10 items-center gap-2 rounded-full border-[3px] border-white bg-brand-blue px-4 text-sm font-bold tracking-wide text-white shadow-sm">
                STEP <span className="text-lg tabular-nums">{Number(number)}</span>
              </span>
              <h3 className="text-xl font-bold text-brand-navy lg:text-[23px]">
                {title}
              </h3>
              <p className="mt-2 text-base font-semibold leading-7 text-brand-text/70">
                {description}
              </p>
            </div>
          </li>
        ))}
        </ol>
      </div>
    </section>
  );
}
