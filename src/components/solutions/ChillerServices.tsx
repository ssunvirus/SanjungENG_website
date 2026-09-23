import Image from "next/image";
import type { ReactNode } from "react";
import { Check, Clipboard, Droplet, Settings } from "lucide-react";

export default function ChillerServices() {
  return (
    <section className="mx-auto w-full max-w-[1920px] ">
      <div aria-hidden="true" className="h-[77px] bg-white shadow-[0_4px_4px_rgba(0,0,0,0.25)]" />
      <div className="mx-auto w-[1440px] bg-white px-[120px] py-[50px]">
        <header className="text-center">
          <p className="text-[20px] font-bold tracking-[6px] text-[#00ADDB]">CHILLER SERVICE</p>
          <h2 className="mt-[10px] text-[50px] font-bold tracking-[2.5px] text-[#102D4A]">냉동기 주요 서비스</h2>
          <p className="mt-[25px] text-[25px] font-semibold text-[#243447]/60">설치 &amp; 교체부터 수리 &amp; 오버홀, 정기점검까지 책임 있게 진행합니다.</p>
        </header>
        <div className="mt-[50px] flex w-[1129px] gap-[50px]">
          <div className="relative h-[385px] w-[605px] shrink-0 overflow-hidden rounded-[10px] shadow-md">
            <Image src="/images/solutions/service-install.png" alt="냉동기 배관 설치 현장" fill sizes="605px" className="object-cover object-[center_70%]" />
            <span className="absolute left-[39px] top-[21px] rounded-[20px] bg-[#006E8F]/80 px-[16px] py-[10px] text-[24px] font-semibold text-white"># 냉동기 설치</span>
          </div>
          <div className="w-[474px]">
            <p className="text-[25px] font-bold tracking-[5px] text-[#00ADDB]">01</p>
            <h3 className="mt-[10px] text-[45px] font-bold tracking-[2.25px] text-[#102D4A]">냉동기 설치 &amp; 교체</h3>
            <p className="mt-[10px] text-[25px] font-semibold leading-[40px] text-[#243447]/80">현장 조건과 운전 목적에 맞춰<br />장비 선정부터 시운전까지 진행합니다.</p>
            <ul className="mt-[20px] space-y-[15px] text-[25px] font-semibold">
              {["설치 공간, 용량, 기존 설비 검토", "기존 장비 철거 및 신규 장비 반입", "배관, 전기 연결 및 시운전"].map((text) => (
                <li key={text} className="flex items-center gap-[10px]"><span className="flex size-[30px] items-center justify-center rounded-full bg-[#00ADDB] text-white"><Check size={20} strokeWidth={3} /></span>{text}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-[50px] grid w-[1129px] grid-cols-2">
          <ServiceDetail icon={<Settings size={60} />} number="02" title="냉동기 수리 & 오버홀" />
          <ServiceDetail icon={<Clipboard size={60} />} number="03" title="냉동기 정기점검" bordered />
        </div>
        <div className="mx-auto mt-[50px] flex h-[68px] w-[1059px] items-center bg-[#F1FAFD] px-[33px] text-[25px] font-semibold">
          <Droplet size={29} fill="#00ADDB" className="mr-[38px] text-[#00ADDB]" /><strong className="text-[#102D4A]">세관&amp; 소모품 정비</strong>
          <span aria-hidden="true" className="mx-[38px] h-[27px] w-px bg-[#00ADDB]" /><span className="text-[#243447]/80">설비상태에 따라 열교환기 세관, 냉동유, 필터 교체를 진행합니다.</span>
        </div>
      </div>
    </section>
  );
}

function ServiceDetail({ icon, number, title, bordered = false }: { icon: ReactNode; number: string; title: string; bordered?: boolean }) {
  return (
    <article className={`flex h-[290px] gap-[13px] ${bordered ? "border-l border-[#B7C6CF] pl-[20px]" : "pr-[20px]"}`}>
      <div className="shrink-0 text-[#1D1B20]">{icon}</div>
      <div className="w-[397px]">
        <p className="text-[25px] font-bold tracking-[5px] text-[#00ADDB]">{number}</p>
        <h3 className="mt-[15px] whitespace-nowrap text-[45px] font-bold tracking-[2px] text-[#102D4A]">{title}</h3>
        <p className="mt-[20px] text-[25px] font-semibold leading-[40px] text-[#243447]/80">고장 원인을 확인하고<br />필요한 부품과 계통을 정비합니다.</p>
        <div className="mt-[30px] border-t-2 border-[#D1DFE8] pt-[10px] text-[25px] font-semibold text-[#243447]/80">누설점검, 밸브 및 부품교체, 분해점검</div>
      </div>
    </article>
  );
}
