import type { ReactNode } from "react";
import SectionEyebrow from "@/src/components/shared/SectionEyebrow";

export default function SectionHeading({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  children: ReactNode;
}) {
  return (
    <header>
      <SectionEyebrow variant="fabric">{eyebrow}</SectionEyebrow>
      <h2 className="mt-[10px] lg:mt-[8.824px] text-[28px] lg:text-[51.38px] font-bold leading-[1.2] tracking-[1px] lg:tracking-[2.569px] text-brand-navy">
        {title}
      </h2>
      <div className="mt-[10px] lg:mt-[22.059px] text-[14px] lg:text-[16.54px] font-semibold leading-[1.2] text-brand-text">
        {children}
      </div>
    </header>
  );
}
