import Image from "next/image";
import type { ReactNode } from "react";

export type WorkProcessStep = {
  number: string;
  title: string;
  description: ReactNode;
  image: string;
  alt?: string;
  unoptimized?: boolean;
  imageClassName?: string;
};

export default function WorkProcessCards({ steps }: { steps: readonly WorkProcessStep[] }) {
  return (
    <div className="relative mt-8 lg:mt-10">
      <ol className="relative z-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
        {steps.map((step) => (
          <li
            key={step.number}
            className="group min-w-0 overflow-hidden rounded-xl border border-brand-navy/10 bg-white shadow-[0_4px_16px_rgba(16,46,73,0.08)] transition-[border-color,box-shadow,transform] duration-200 hover:border-brand-blue hover:shadow-[0_8px_24px_rgba(0,173,219,0.15)] motion-safe:hover:-translate-y-1 motion-reduce:transition-none"
          >
            <div className="relative h-[300px] overflow-hidden bg-[#F1FAFD] sm:h-[340px] lg:h-[410px]">
              <Image
                src={step.image}
                alt={step.alt || `${step.title} 작업 현장`}
                fill
                sizes="(min-width: 1440px) 365px, (min-width: 640px) 45vw, 90vw"
                quality={100}
                unoptimized={step.unoptimized}
                className={`object-cover ${step.imageClassName || ""}`}
              />
            </div>
            <div className="relative px-5 pb-6 pt-8">
              <span className="absolute -top-5 left-5 inline-flex h-10 items-center gap-2 rounded-full border-[3px] border-white bg-brand-blue px-4 text-sm font-bold tracking-wide text-white shadow-sm">
                STEP <span className="text-lg tabular-nums">{Number(step.number)}</span>
              </span>
              <h3 className="text-xl font-bold text-brand-navy lg:text-[23px]">{step.title}</h3>
              <p className="mt-2 text-base font-semibold leading-7 text-brand-text/70">
                {step.description}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
