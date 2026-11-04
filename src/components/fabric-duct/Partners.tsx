import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import SectionHeading from "./SectionHeading";

const resources = [
  { title: "제품 카탈로그 보기", tab: "catalogs" },
  { title: "인증서 / 시험성적서 보기", tab: "certificates" },
];

export default function Partners() {
  return (
    <section
      aria-label="섬유덕트 공급 파트너 및 제품 자료"
      className="mx-auto w-full max-w-[1440px] bg-white px-5 py-10 min-[768px]:px-10 min-[768px]:py-14"
    >
      <SectionHeading eyebrow="PARTNERS" title="파트너">
        산정엔지니어링과 함께하는 섬유덕트 공급 파트너입니다.
      </SectionHeading>
      <div className="mx-auto my-8 grid max-w-[920px] grid-cols-2 items-center min-[768px]:my-10">
        <div className="flex h-[130px] items-center justify-center px-2 min-[768px]:h-[210px] min-[768px]:px-8">
          <Image
            src="/images/fabric-duct/partner-klimagiel.png"
            alt="Klimagiel"
            width={400}
            height={267}
            sizes="(max-width: 767px) 170px, 320px"
            className="h-full w-full max-w-[320px] object-contain"
          />
        </div>
        <div className="flex h-[130px] items-center justify-center border-l border-brand-navy/10 px-2 min-[768px]:h-[210px] min-[768px]:px-8">
          <Image
            src="/images/fabric-duct/partner-multixair.png"
            alt="MultiXair"
            width={400}
            height={213}
            sizes="(max-width: 767px) 170px, 320px"
            className="h-full w-full max-w-[320px] object-contain"
          />
        </div>
      </div>
      <div className="border-t border-brand-navy/10 pt-6 min-[768px]:flex min-[768px]:items-center min-[768px]:justify-between min-[768px]:gap-6 min-[768px]:pt-7">
        <p className="text-[17px] font-medium leading-7 text-brand-navy min-[768px]:text-[19px]">
          제품 사양과 시험 자료를 확인해보세요.
        </p>
        <div className="mt-4 flex flex-col gap-3 min-[768px]:mt-0 min-[768px]:flex-row">
          {resources.map((resource) => (
            <Link
              key={resource.tab}
              href={`/fabric-duct/resources?tab=${resource.tab}#download-title`}
              className="group inline-flex min-h-[52px] items-center justify-between gap-5 rounded-xl border border-brand-navy/50 bg-white px-5 py-3 text-[16px] font-semibold text-brand-navy transition-[border-color,background-color,color,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:border-brand-blue hover:bg-[#EFF9FC] hover:text-[#006EB8] hover:shadow-[0_5px_14px_rgba(16,47,73,0.10)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-blue motion-reduce:transform-none motion-reduce:transition-none"
            >
              {resource.title}
              <ArrowUpRight aria-hidden="true" size={18} className="shrink-0 text-brand-navy/70 transition-[color,transform] duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#006EB8] motion-reduce:transform-none motion-reduce:transition-none" />
            </Link>
          ))}
        </div>
      </div>
      <p className="mt-4 text-[13px] leading-6 text-brand-navy/60">
        인증 및 시험 결과의 적용 범위는 제조사와 제품별로 다릅니다.
      </p>
    </section>
  );
}
