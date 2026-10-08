import type { Metadata } from "next";
import Hero from "../../src/components/contact/Hero";
import ContactInfo from "../../src/components/contact/ContactInfo";
import InquiryForm from "../../src/components/contact/InquiryForm";

export const metadata: Metadata = {
  title: "견적문의 | 산정엔지니어링",
  description: "냉동공조 설비와 섬유덕트 설치, 교체, 수리 및 유지보수 견적을 문의하세요.",
};

export default function ContactPage() {
  return (
    <main className="flex-1 bg-[#EFF7FB] text-[#102D4A]">
      <Hero />
      <div
        aria-hidden="true"
        className="relative z-10 h-[64px] bg-white shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
      />
      <section
        aria-label="견적 상담 및 문의 작성"
        className="mx-auto grid min-h-[1302px] w-[1440px] grid-cols-[473px_856px] gap-[111px] pb-[25px]"
      >
        <ContactInfo />
        <InquiryForm />
      </section>
    </main>
  );
}
