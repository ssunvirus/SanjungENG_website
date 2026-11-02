import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, type LucideIcon } from "lucide-react";

export type EquipmentCaseStudyProps = {
  id?: string;
  title: ReactNode;
  image: string;
  imageAlt: string;
  href: string;
  details: readonly { icon: LucideIcon; title: string; description: ReactNode }[];
  transparentBackground?: boolean;
};

export default function EquipmentCaseStudy({
  id,
  title,
  image,
  imageAlt,
  href,
  details,
  transparentBackground = false,
}: EquipmentCaseStudyProps) {
  return (
    <section
      id={id}
      className={`relative isolate mx-auto w-full max-w-[1600px] overflow-hidden ${transparentBackground ? "" : "bg-[#EFF7FB]"} px-5 py-9 lg:px-10 lg:py-16`}
    >
      <header className="mx-auto flex max-w-[1400px] flex-col items-start gap-5 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
        <div>
          <p className="flex items-center gap-[16px] lg:gap-[20px] text-[14px] lg:text-[20px] font-medium tracking-[3px] lg:tracking-[6px] text-brand-blue/60">
            CASE STUDY <span className="h-[2px] w-[46px] bg-current" />
          </p>
          <h2 className="mt-[10px] text-[28px] lg:text-[45px] font-bold tracking-[1px] lg:tracking-[2px] text-brand-navy">
            시공사례
          </h2>
        </div>
        <p className="border-l-2 border-brand-blue/25 pl-5 text-[14px] font-semibold leading-[30px] text-brand-text/80 lg:pl-10 lg:text-[19px]">
          다양한 산업 현장에서 축적한 경험으로
          <br />
          고객의 환경에 최적화된 냉동공조 솔루션을 제안합니다.
        </p>
      </header>

      <article className="relative mx-auto mt-8 grid w-full max-w-[1400px] grid-cols-1 items-end lg:mt-12 lg:grid-cols-[repeat(20,minmax(0,1fr))]">
        <div className="relative h-[280px] w-full overflow-hidden rounded-2xl shadow-[0_8px_24px_rgba(16,46,73,0.12)] sm:h-[420px] lg:col-span-12 lg:col-start-1 lg:row-start-1 lg:h-[550px] lg:rounded-3xl">
          <Image
            src={image}
            alt={imageAlt}
            fill
            sizes="(min-width: 1600px) 840px, (min-width: 1024px) 60vw, (max-width: 639px) calc(100vw - 40px), 100vw"
            quality={100}
            className="object-cover"
          />
        </div>
        <div className="relative z-10 mx-3 -mt-8 rounded-2xl bg-white p-6 shadow-[0_16px_40px_rgba(16,46,73,0.12)] sm:mx-6 sm:p-8 lg:col-span-9 lg:col-start-12 lg:row-start-1 lg:mx-0 lg:mb-[-18px] lg:mt-0 lg:rounded-[30px] lg:p-10">
          <h3 className="text-[25px] font-bold leading-[1.3] tracking-[1px] text-[#164A84] lg:text-[38px] lg:tracking-[1.5px]">
            {title}
          </h3>
          <span aria-hidden="true" className="mt-5 block h-1 w-[116px] bg-brand-blue lg:mt-6" />
          <div className="mt-5 divide-y divide-brand-navy/10 lg:mt-6">
            {details.map(({ icon: Icon, title, description }) => (
              <div key={title} className="flex items-start gap-4 py-4 first:pt-0 lg:gap-5">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-brand-blue/5 lg:size-16">
                  <Icon size={32} className="text-[#1D1B20]" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <h4 className="text-base font-bold text-brand-blue lg:text-[22px]">{title}</h4>
                  <p className="mt-1 break-keep text-[14px] font-semibold leading-6 text-brand-text/80 lg:text-[18px] lg:leading-7">
                    {description}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <Link
            href={href}
            className="mt-6 flex min-h-14 w-full items-center justify-center gap-4 rounded-2xl bg-brand-navy px-4 py-4 text-base font-semibold text-white transition-colors hover:bg-[#164A84] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-blue lg:mt-7 lg:min-h-[64px] lg:text-[22px]"
          >
            시공사례 보러가기 <ArrowRight size={22} aria-hidden="true" />
          </Link>
        </div>
      </article>
    </section>
  );
}
