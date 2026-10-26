import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function ProjectInquiryBanner() {
  return (
    <section
      aria-label="시공 상담 안내"
      className="relative isolate mx-auto mt-12 w-full max-w-[1268px] overflow-hidden rounded-[10px] bg-brand-navy px-7 py-7 text-white sm:px-10 sm:py-8 lg:px-12 lg:py-9"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-40 -z-10 size-[420px] rounded-full bg-brand-blue/[0.08] blur-3xl"
      />
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
        <div className="min-w-0">
          <h2 className="text-[27px] font-bold leading-[1.35] tracking-[-0.035em] sm:text-[36px]">
            이런 시공이 필요하신가요?
          </h2>
          <p className="mt-4 text-[16px] leading-[1.7] tracking-[-0.015em] text-white/65 sm:text-[18px]">
            현장에 맞는 설비와 시공 방법,
            <br className="sm:hidden" /> 산정엔지니어링한테 문의하세요.
          </p>
        </div>
        <Link
          href="/contact"
          className="group inline-flex min-h-[58px] w-full shrink-0 items-center justify-center gap-5 rounded-[16px] bg-brand-blue px-7 py-4 text-[25px] font-semibold tracking-[-0.02em] text-brand-navy transition-[background-color,transform] duration-200 hover:bg-[#54d2f1] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white motion-reduce:transition-none motion-reduce:active:scale-100 sm:w-auto"
        >
          견적문의
          <ArrowRight
            size={22}
            aria-hidden="true"
            className="transition-transform motion-safe:group-hover:translate-x-1 motion-reduce:transition-none"
          />
        </Link>
      </div>
    </section>
  );
}
