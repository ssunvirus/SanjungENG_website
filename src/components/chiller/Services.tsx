import Image from "next/image";
import type { ReactNode } from "react";
import { Check, Clipboard, Droplet, Settings, Wrench } from "lucide-react";

export default function Services() {
  return (
    <section className="mx-auto w-full max-w-[1920px]">
      <div
        aria-hidden="true"
        className="relative z-10 h-4 lg:h-[64px] bg-white shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
      />
      <div className="mx-auto w-full lg:max-w-[1440px] bg-white px-[20px] lg:px-[120px] py-[36px] lg:py-[47px]">
        <header className="text-center">
          <p className="text-[12px] lg:text-[20px] font-bold tracking-[3px] lg:tracking-[6px] text-[#00ADDB]">
            CHILLER SERVICE
          </p>
          <h2 className="mt-[12px] lg:mt-[10px] text-[28px] lg:text-[50px] font-bold tracking-[1px] lg:tracking-[2.5px] text-[#102D4A]">
            냉동기 주요 서비스
          </h2>
          <p className="mt-[12px] lg:mt-[25px] text-[15px] lg:text-[25px] font-semibold text-[#243447]/60">
            설치 &amp; 교체부터 수리 &amp; 오버홀, 정기점검까지 책임 있게 진행합니다.
          </p>
        </header>

        <div className="mx-auto mt-[24px] lg:mt-[50px] flex flex-col lg:flex-row w-full lg:w-[960px] gap-6 lg:gap-[60px]">
          <div className="relative h-[240px] lg:h-[318px] w-full lg:w-[500px] shrink-0 overflow-hidden rounded-[10px] shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
            <Image
              src="/images/chiller/service-installation.jpg"
              alt="냉동기 배관 설치 현장"
              fill
              sizes="500px"
              className="object-cover object-bottom"
            />
          </div>
          <div className="relative w-full lg:w-[400px]">
            <Wrench
              aria-hidden="true"
              className="absolute right-0 top-0 hidden lg:block size-8 text-[#1D1B20] lg:size-12"
              size={48}
            />
            <p className="text-[15px] lg:text-[25px] font-bold tracking-[3px] lg:tracking-[5px] text-[#00ADDB]">
              01
            </p>
            <h3 className="mt-2 lg:mt-[10px] text-[20px] lg:text-[30px] font-bold tracking-[1px] lg:tracking-[1.5px] text-[#102D4A]">
              냉동기 설치 &amp; 교체
            </h3>
            <p className="mt-2 lg:mt-[10px] text-[15px] lg:text-[20px] font-semibold leading-6 lg:leading-[30px] tracking-[1px] lg:tracking-[1px] text-[#243447]/80">
              현장 조건과 운전 목적에 맞춰
              <br />
              장비 선정부터 시운전까지 진행합니다.
            </p>
            <ul className="hidden lg:block mt-[12px] lg:mt-[20px] space-y-2 lg:space-y-[15px] text-[15px] lg:text-[20px] font-semibold">
              {[
                "설치 공간, 용량, 기존 설비 검토",
                "기존 장비 철거 및 신규 장비 반입",
                "배관, 전기 연결 및 시운전",
              ].map((text) => (
                <li
                  key={text}
                  className="flex min-h-[25px] lg:h-[25px] items-center gap-[12px] lg:gap-[10px]"
                >
                  <span className="hidden lg:flex shrink-0 size-[25px] items-center justify-center rounded-full bg-[#00ADDB] text-white">
                    <Check size={17} strokeWidth={3} />
                  </span>
                  {text}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mx-auto mt-8 lg:mt-[50px] grid h-auto lg:h-[210px] w-full lg:w-[960px] grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-[80px]">
          <ServiceDetail
            icon={<Settings size={48} className="size-8 lg:size-12" />}
            number="02"
            title="냉동기 수리 & 오버홀"
            details="고장 진단, 주요 부품교체, 분해/정비"
            description={
              <>
                고장 원인을 확인하고
                <br />
                필요한 부품과 계통을 정비합니다.
              </>
            }
          />
          <ServiceDetail
            icon={<Clipboard size={48} className="size-8 lg:size-12" />}
            number="03"
            title="냉동기 정기점검"
            details="운전압력 확인, 온도점검, 진동/소음 점검"
            description={
              <>
                운전 상태와 주요 부품을 점검하고
                <br />
                설비에 필요한 정비 항목을 안내합니다.
              </>
            }
            bordered
          />
        </div>
        <div className="mx-auto mt-[24px] lg:mt-[50px] flex h-auto lg:h-[68px] flex-wrap gap-3 py-4 lg:flex-nowrap lg:gap-0 lg:py-0 w-full lg:w-[1059px] items-center bg-[#F1FAFD] px-[20px] lg:px-[33px] text-[15px] lg:text-[25px] font-semibold">
          <Droplet
            size={29}
            fill="#00ADDB"
            className="hidden lg:block shrink-0 lg:mr-[38px] text-[#00ADDB]"
          />
          <strong className="text-[15px] lg:text-[24px] tracking-[1px] lg:tracking-[1.2px] text-[#102D4A]">
            세관 &amp; 소모품 정비
          </strong>
          <span
            aria-hidden="true"
            className="hidden lg:block mx-[38px] h-[27px] w-px bg-[#00ADDB]"
          />
          <span className="text-[#243447]/80">
            설비 상태에 따라 열교환기 세관, 냉동유, 필터 교체를 진행합니다.
          </span>
        </div>
      </div>
    </section>
  );
}

function ServiceDetail({
  icon,
  number,
  title,
  description,
  details,
  bordered = false,
}: {
  icon: ReactNode;
  number: string;
  title: string;
  description: ReactNode;
  details: string;
  bordered?: boolean;
}) {
  return (
    <article
      className={`relative h-auto lg:h-[210px] ${bordered ? "lg:border-l border-[#B7C6CF] lg:pl-[20px]" : ""}`}
    >
      <div
        aria-hidden="true"
        className="absolute right-[20px] top-0 hidden lg:block text-[#1D1B20]"
      >
        {icon}
      </div>
      <div className="w-full lg:w-[397px]">
        <p className="text-[15px] lg:text-[25px] font-bold tracking-[3px] lg:tracking-[5px] text-[#00ADDB]">
          {number}
        </p>
        <h3 className="mt-2 lg:mt-[15px] lg:whitespace-nowrap text-[20px] lg:text-[30px] font-bold tracking-[1px] lg:tracking-[1.5px] text-[#102D4A]">
          {title}
        </h3>
        <p className="mt-2 lg:mt-[10px] text-[15px] lg:text-[20px] font-semibold leading-6 lg:leading-[30px] tracking-[1px] lg:tracking-[1px] text-[#243447]/80">
          {description}
        </p>
        <div className="mt-[12px] lg:mt-[15px] lg:border-t-2 border-[#D1DFE8] lg:pt-[10px] lg:whitespace-nowrap text-[15px] lg:text-[20px] font-semibold leading-6 lg:leading-[40px] tracking-[1px] lg:tracking-[1px] text-[#243447]/80">
          {details}
        </div>
      </div>
    </article>
  );
}
