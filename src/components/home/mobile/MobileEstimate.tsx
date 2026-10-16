import { Mail, PhoneCall } from "lucide-react";
import Eyebrow from "@/src/components/shared/SectionEyebrow";
import MobileInquiry from "./MobileInquiry";

export default function MobileEstimate() {
  return (
    <section id="mobile-contact" className="mx-auto max-w-[600px] px-5 pb-12 pt-10">
      <Eyebrow variant="compact">SOLUTION</Eyebrow>
      <h2 className="mt-6 text-[28px] font-bold leading-[1.5]">
        현장에 필요한 답을,
        <br />
        <span className="text-brand-blue">빠르고 정확하게</span> 제안합니다.
      </h2>
      <p className="mt-4 text-base leading-7 text-[#526579]">
        현장 조건과 필요한 작업을 알려주시면 최적의 솔루션을 제안합니다.
      </p>
      <div className="mt-6 rounded-2xl bg-brand-navy p-5 text-white">
        <div className="flex items-start gap-4">
          <PhoneCall size={32} aria-hidden="true" className="mt-1 shrink-0" />
          <div className="min-w-0 text-sm leading-7">
            <h3 className="mb-1 font-bold">전화로 간편 문의</h3>
            <a href="tel:01053401728" className="block">
              대표번호 : 010 - 5340 - 1728
            </a>
            <a href="tel:028911728" className="block">
              회사번호 : 02 - 891 - 1728
            </a>
          </div>
        </div>
        <a
          href="mailto:sanjungeng@naver.com"
          className="mt-4 flex min-h-11 items-center gap-4 border-t border-white/20 pt-4 text-sm"
        >
          <Mail size={30} aria-hidden="true" className="shrink-0" />
          sanjungeng@naver.com
        </a>
      </div>
      <MobileInquiry />
    </section>
  );
}
