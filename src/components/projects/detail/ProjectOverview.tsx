import { MapPin, Settings, Snowflake } from "lucide-react";
import { normalizeFabricDuctText } from "@/src/lib/fabric-duct-label";

export type ProjectOverviewProps = {
  title?: string;
  description?: string;
  category?: string;
  work?: string;
  location?: string;
};

export default function ProjectOverview({
  title = "농협 저온저장고 냉동설비 설치",
  description = "저온저장고의 안정적인 저장환경을 위한 냉동설비 설치 현장입니다.",
  category = "저온저장고",
  work = "CDU / 유니트 쿨러 설치",
  location = "경기도 용인",
}: ProjectOverviewProps) {
  return (
    <>
      <header className="text-center">
        <p className="text-xs lg:text-[20px] font-bold leading-[24px] tracking-[3px] lg:tracking-[6px] text-brand-blue/60">
          PROJECTS DETAILS
        </p>
        <h1 className="mt-[16px] text-[26px] lg:text-[45px] font-extrabold leading-[1.35] lg:leading-[54px]">
          {normalizeFabricDuctText(title)}
        </h1>
        <p className="mx-auto mt-3 max-w-[1100px] whitespace-pre-line break-keep text-[15px] leading-7 text-brand-navy/80 lg:mt-[21px] lg:text-[20px] lg:leading-8">
          {normalizeFabricDuctText(description)}
        </p>
      </header>
      <dl className="mx-auto mt-6 grid max-w-[1200px] grid-cols-1 overflow-hidden rounded-2xl border border-brand-navy/10 bg-white shadow-[0_4px_20px_rgba(16,46,73,0.04)] sm:grid-cols-2 lg:mt-[37px] lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)_minmax(0,1fr)]">
        <div className="flex min-w-0 items-start gap-4 p-4 sm:p-5 lg:gap-4 lg:p-7">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand-blue/10 text-brand-blue lg:size-12">
            <Snowflake size={25} aria-hidden="true" />
          </span>
          <div className="min-w-0">
            <dt className="text-[15px] font-semibold text-brand-navy/60 lg:text-base">공사구분</dt>
            <dd className="mt-1 break-keep text-[20px] sm:mt-2 font-bold leading-8 text-brand-navy [overflow-wrap:anywhere] lg:text-[24px] lg:leading-9">
              {normalizeFabricDuctText(category)}
            </dd>
          </div>
        </div>
        <div className="flex min-w-0 items-start gap-4 border-t border-brand-navy/10 p-4 sm:p-5 sm:col-span-2 sm:row-start-2 lg:col-span-1 lg:col-start-2 lg:row-start-1 lg:gap-4 lg:border-l lg:border-t-0 lg:p-7">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand-blue/10 text-brand-blue lg:size-12">
            <Settings size={25} aria-hidden="true" />
          </span>
          <div className="min-w-0">
            <dt className="text-[15px] font-semibold text-brand-navy/60 lg:text-base">주요 작업</dt>
            <dd className="mt-1 break-keep text-[20px] sm:mt-2 font-bold leading-8 text-brand-navy [overflow-wrap:anywhere] lg:text-[24px] lg:leading-9">
              {normalizeFabricDuctText(work)}
            </dd>
          </div>
        </div>
        <div className="flex min-w-0 items-start gap-4 border-t border-brand-navy/10 p-4 sm:p-5 sm:col-start-2 sm:row-start-1 sm:border-l sm:border-t-0 lg:col-start-3 lg:gap-4 lg:p-7">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand-blue/10 text-brand-blue lg:size-12">
            <MapPin size={25} aria-hidden="true" />
          </span>
          <div className="min-w-0">
            <dt className="text-[15px] font-semibold text-brand-navy/60 lg:text-base">현장 위치</dt>
            <dd className="mt-1 break-keep text-[20px] sm:mt-2 font-bold leading-8 text-brand-navy [overflow-wrap:anywhere] lg:text-[24px] lg:leading-9">
              {location}
            </dd>
          </div>
        </div>
      </dl>
    </>
  );
}
