"use client";

import Image from "next/image";
import { useState } from "react";

type Step = { title: string; description: string; image: string };
const labels = ["설비 연결", "패브릭덕트 설치", "세척 관리"];

export default function MobileServiceSteps({ steps }: { steps: Step[] }) {
  const [selected, setSelected] = useState(0);
  const step = steps[selected];

  return (
    <div className="min-w-0 lg:hidden">
      <div role="tablist" aria-label="설치와 관리 단계" className="mb-4 grid grid-cols-3 gap-2">
        {steps.map((item, index) => (
          <button
            key={item.title}
            id={`service-step-tab-${index}`}
            type="button"
            role="tab"
            aria-selected={selected === index}
            aria-controls="service-step-panel"
            tabIndex={selected === index ? 0 : -1}
            onClick={() => setSelected(index)}
            onKeyDown={(event) => {
              if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
              event.preventDefault();
              const next =
                event.key === "Home"
                  ? 0
                  : event.key === "End"
                    ? steps.length - 1
                    : (index + (event.key === "ArrowRight" ? 1 : -1) + steps.length) % steps.length;
              setSelected(next);
              document.getElementById(`service-step-tab-${next}`)?.focus();
            }}
            className={`min-h-12 cursor-pointer rounded-xl border px-1 py-3 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue ${selected === index ? "border-brand-navy bg-brand-navy text-white" : "border-brand-navy/15 bg-white text-brand-navy"}`}
          >
            {labels[index]}
          </button>
        ))}
      </div>
      <div
        id="service-step-panel"
        role="tabpanel"
        aria-labelledby={`service-step-tab-${selected}`}
        tabIndex={0}
        className="overflow-hidden rounded-2xl bg-white focus-visible:outline-2 focus-visible:outline-brand-blue"
      >
        <div className="relative aspect-[4/3] overflow-hidden">
          <div
            className={
              selected === 0 ? "absolute top-[-48.36%] h-[257.04%] w-full" : "absolute inset-0"
            }
          >
            <Image
              src={step.image}
              alt={step.title}
              fill
              sizes="(max-width: 1023px) calc(100vw - 40px), 374px"
              className={selected === 0 ? "object-fill" : "object-cover"}
            />
          </div>
        </div>
        <div className="min-h-[112px] p-5">
          <h3 className="text-xl font-bold text-brand-navy">{step.title}</h3>
          <p className="mt-2 break-keep text-sm leading-6 text-brand-navy/70">
            {step.description.replaceAll("\n", " ")}
          </p>
        </div>
      </div>
    </div>
  );
}
