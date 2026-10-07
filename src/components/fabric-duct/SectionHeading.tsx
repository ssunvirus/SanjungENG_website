import type { ReactNode } from "react";
import Image from "next/image";

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
      <p className="flex items-center gap-[17.647px] text-[17.65px] font-semibold leading-[1.2] tracking-[5.295px] text-[#00ADDB]/60">
        {eyebrow}
        <Image
          src="/images/fabric-duct/heading-line.svg"
          width={40.8581}
          height={1.76471}
          alt=""
          aria-hidden="true"
        />
      </p>
      <h2 className="mt-[8.824px] text-[51.38px] font-bold leading-[1.2] tracking-[2.569px] text-[#102D4A]">
        {title}
      </h2>
      <div className="mt-[22.059px] text-[16.54px] font-semibold leading-[1.2] text-[#243447]">
        {children}
      </div>
    </header>
  );
}
