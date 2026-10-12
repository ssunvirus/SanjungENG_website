import type { ReactNode } from "react";

export default function SectionEyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="flex items-center gap-[16px] lg:gap-[20px] text-[14px] lg:text-[20px] font-medium tracking-[3px] lg:tracking-[6px] text-[#00ADDB]/60">
      {children}
      <span aria-hidden="true" className="h-[2px] w-[46px] bg-current" />
    </p>
  );
}
