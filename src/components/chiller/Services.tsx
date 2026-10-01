import Image from "next/image";
import type { ReactNode } from "react";
import { Check, Clipboard, Droplet, Settings, Wrench } from "lucide-react";

export default function Services() {
  return (
    <section className="mx-auto w-full max-w-[1920px] ">
      <div
        aria-hidden="true"
        className="relative z-10 h-[64px] bg-white shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
      />
      <div className="mx-auto w-[1440px] bg-white px-[120px] py-[47px]">

        <header className="text-center">
          <p className="text-[20px] font-bold tracking-[6px] text-[#00ADDB]">CHILLER SERVICE</p>
          <h2 className="mt-[10px] text-[50px] font-bold tracking-[2.5px] text-[#102D4A]">냉동기 주요 서비스</h2>
          <p className="mt-[25px] text-[25px] font-semibold text-[#243447]/60">설치 &amp; 교체부터 수리 &amp; 오버홀, 정기점검까지 책임 있게 진행합니다.</p>
        </header>

        <div className="mx-auto mt-[50px] flex w-[960px] gap-[60px]">
          <div className="relative h-[318px] w-[500px] shrink-0 overflow-hidden rounded-[10px] shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
            <Image src="/images/chiller/service-installation.png" alt="냉동기 배관 설치 현장" fill sizes="500px" className="object-cover object-bottom" />
            <span className="absolute left-[30px] top-[20px] flex h-[44px] w-[144px] items-center justify-center rounded-[20px] bg-[#00ADDB]/60 text-[20px] font-semibold tracking-[1px] text-white"># 냉동기 설치</span>
          </div>
          <div className="relative w-[400px]">
            <Wrench aria-hidden="true" className="absolute right-0 top-0 text-[#1D1B20]" size={48} />
            <p className="text-[25px] font-bold tracking-[5px] text-[#00ADDB]">01</p>
            <h3 className="mt-[10px] text-[30px] font-bold tracking-[1.5px] text-[#102D4A]">냉동기 설치 &amp; 교체</h3>
            <p className="mt-[10px] text-[20px] font-semibold leading-[30px] tracking-[1px] text-[#243447]/80">현장 조건과 운전 목적에 맞춰<br />장비 선정부터 시운전까지 진행합니다.</p>
            <ul className="mt-[20px] space-y-[15px] text-[20px] font-semibold">
              {["설치 공간, 용량, 기존 설비 검토", "기존 장비 철거 및 신규 장비 반입", "배관, 전기 연결 및 시운전"].map((text) => (
                <li key={text} className="flex h-[25px] items-center gap-[10px]"><span className="flex size-[25px] items-center justify-center rounded-full bg-[#00ADDB] text-white"><Check size={17} strokeWidth={3} /></span>{text}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mx-auto mt-[50px] grid h-[210px] w-[960px] grid-cols-2 gap-[80px]">
          <ServiceDetail
            icon={<Settings size={48} />}
            number="02"
            title="냉동기 수리 & 오버홀"
            description={<>고장 원인을 확인하고<br />필요한 부품과 계통을 정비합니다.</>}
          />
          <ServiceDetail
            icon={<Clipboard size={48} />}
            number="03"
            title="냉동기 정기점검"
            description={<>운전 상태와 주요 부품을 점검하고<br />설비에 필요한 정비 항목을 안내합니다.</>}
            bordered
          />
        </div>
        <div className="mx-auto mt-[50px] flex h-[68px] w-[1059px] items-center bg-[#F1FAFD] px-[33px] text-[25px] font-semibold">
          <Droplet size={29} fill="#00ADDB" className="mr-[38px] text-[#00ADDB]" /><strong className="text-[24px] tracking-[1.2px] text-[#102D4A]">세관&amp; 소모품 정비</strong>
          <span aria-hidden="true" className="mx-[38px] h-[27px] w-px bg-[#00ADDB]" /><span className="text-[#243447]/80">설비상태에 따라 열교환기 세관, 냉동유, 필터 교체를 진행합니다.</span>
        </div>
      </div>
    </section>
  );
}

function ServiceDetail({ icon, number, title, description, bordered = false }: { icon: ReactNode; number: string; title: string; description: ReactNode; bordered?: boolean }) {
  return (
    <article className={`relative h-[210px] ${bordered ? "border-l border-[#B7C6CF] pl-[20px]" : ""}`}>
      <div className="absolute right-[20px] top-0 text-[#1D1B20]">{icon}</div>
      <div className="w-[397px]">
        <p className="text-[25px] font-bold tracking-[5px] text-[#00ADDB]">{number}</p>
        <h3 className="mt-[15px] whitespace-nowrap text-[30px] font-bold tracking-[1.5px] text-[#102D4A]">{title}</h3>
        <p className="mt-[10px] text-[20px] font-semibold leading-[30px] tracking-[1px] text-[#243447]/80">{description}</p>
        <div className="mt-[15px] border-t-2 border-[#D1DFE8] pt-[10px] whitespace-nowrap text-[20px] font-semibold leading-[40px] tracking-[1px] text-[#243447]/80">누설점검, 밸브 및 부품교체, 분해점검</div>
      </div>
    </article>
  );
}
