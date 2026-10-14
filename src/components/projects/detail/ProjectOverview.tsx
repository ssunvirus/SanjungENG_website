import Image from "next/image";
import { MapPin, Settings } from "lucide-react";

function Divider() {
  return (
    <div aria-hidden="true" className="hidden lg:block relative h-[117px] w-[2px] shrink-0">
      <Image
        src="/images/projects/wonsam-nonghyup/info-divider.svg"
        width={117}
        height={2}
        alt=""
        className="absolute left-1/2 top-1/2 max-w-none -translate-x-1/2 -translate-y-1/2 rotate-90"
      />
    </div>
  );
}

type ProjectOverviewProps = {
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
        <p className="text-xs lg:text-sm lg:text-[20px] font-bold leading-[24px] tracking-[3px] lg:tracking-[6px] text-[#00ADDB]/60">
          PROJECTS DETAILS
        </p>
        <h2 className="mt-[16px] text-[26px] lg:text-[45px] font-extrabold leading-[1.35] lg:leading-[54px]">
          {title}
        </h2>
        <p className="mt-3 lg:mt-[21px] text-[15px] lg:text-[20px] leading-[24px] text-[#102D4A]/80">
          {description}
        </p>
      </header>
      <dl className="mt-6 lg:mt-[37px] flex flex-col lg:flex-row h-auto lg:h-[139px] items-stretch lg:items-center justify-center gap-5 lg:gap-[64px] p-5 lg:p-0 rounded-[10px] bg-white">
        <div className="flex items-center gap-4 lg:gap-[30px]">
          <Image
            src="/images/projects/wonsam-nonghyup/snowflake.svg"
            width={70}
            height={70}
            alt=""
            aria-hidden="true"
            className="size-10 shrink-0 lg:size-[70px]"
          />
          <div className="min-w-0 flex-1 lg:flex-none lg:w-[152px]">
            <dt className="text-sm lg:text-[20px] font-bold leading-[24px]">공사구분</dt>
            <dd className="mt-1 lg:mt-[9px] text-lg lg:text-[30px] font-medium leading-7 lg:leading-[36px] text-[#00ADDB]">
              {category}
            </dd>
          </div>
        </div>
        <Divider />
        <div className="flex items-center gap-4 lg:gap-[30px]">
          <Settings size={70} className="size-10 shrink-0 lg:size-[70px]" aria-hidden="true" />
          <div className="min-w-0 flex-1 lg:flex-none lg:w-[332px]">
            <dt className="text-sm lg:text-[20px] font-bold leading-[24px]">주요 작업</dt>
            <dd className="mt-1 lg:mt-[9px] text-lg lg:text-[30px] font-medium leading-7 lg:leading-[36px] text-[#00ADDB]">
              {work}
            </dd>
          </div>
        </div>
        <Divider />
        <div className="flex items-center gap-4 lg:gap-[30px]">
          <MapPin size={70} className="size-10 shrink-0 lg:size-[70px]" aria-hidden="true" />
          <div className="min-w-0 flex-1 lg:flex-none lg:min-w-[160px] lg:whitespace-nowrap">
            <dt className="text-sm lg:text-[20px] font-bold leading-[24px]">현장 위치</dt>
            <dd className="mt-1 lg:mt-[9px] text-lg lg:text-[30px] font-medium leading-7 lg:leading-[36px] text-[#00ADDB]">
              {location}
            </dd>
          </div>
        </div>
      </dl>
    </>
  );
}
