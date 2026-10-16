import type { ReactNode } from "react";

const styles = {
  service: {
    text: "flex items-center gap-[16px] lg:gap-[20px] text-[14px] lg:text-[20px] font-medium tracking-[3px] lg:tracking-[6px] text-brand-blue/60",
    line: "h-[2px] w-[46px] bg-current",
  },
  compact: {
    text: "flex items-center gap-3 text-xs font-semibold tracking-[3px] text-brand-blue",
    line: "h-px w-10 bg-brand-blue",
  },
  fabric: {
    text: "flex items-center gap-[16px] lg:gap-[17.647px] text-[14px] lg:text-[17.65px] font-semibold leading-[1.2] tracking-[3px] lg:tracking-[5.295px] text-brand-blue/60",
    line: "h-[1.76471px] w-[40.8581px] shrink-0 bg-brand-blue/60",
  },
};

export default function SectionEyebrow({
  children,
  variant = "service",
}: {
  children: ReactNode;
  variant?: keyof typeof styles;
}) {
  const style = styles[variant];
  return (
    <p className={style.text}>
      {children}
      <span aria-hidden="true" className={style.line} />
    </p>
  );
}
