"use client";

import { useEffect, useState } from "react";
import styles from "./LaptopLayout.module.css";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import MobileServiceSteps from "./MobileServiceSteps";

const steps = [
  {
    number: "01",
    title: "냉동공조설비 설치",
    mobileTitle: "설비 연결",
    description: "CDU/유니트쿨러 설치, 냉매 배관 연결",
    image: "/images/fabric-duct/one-stop-equipment-installation.webp",
  },
  {
    number: "02",
    title: "패브릭덕트 설계/설치",
    mobileTitle: "패브릭덕트 설치",
    description: "패브릭덕트 배치 설계, 제작 및 현장 설치",
    image: "/images/fabric-duct/one-stop-design-huiji.webp",
  },
  {
    number: "03",
    title: "세척 및 유지보수",
    mobileTitle: "세척 관리",
    description: "덕트 탈착/세척, 설비 정기점검",
    image: "/images/fabric-duct/one-stop-maintenance-lottemart.webp",
  },
];

export default function OneStopSolution() {
  const [activeStep, setActiveStep] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => {
      setActiveStep((current) => (current + 1) % steps.length);
    }, 1800);
    return () => window.clearInterval(timer);
  }, []);
  return (
    <section
      aria-labelledby="one-stop-heading"
      className={`${styles.oneStop} mx-auto grid pb-6 px-5 lg:px-0 lg:pl-[65px] h-auto lg:h-[817px] w-full lg:max-w-[1440px] grid-cols-1 lg:grid-cols-[485px_734px] gap-[28px] lg:gap-[52px] pt-[24px] lg:pt-[47.12px]`}
    >
      <div>
        <p
          data-section-eyebrow
          className="text-[14px] lg:text-[20px] font-bold leading-[24px] tracking-[3px] lg:tracking-[6px] text-brand-blue"
        >
          ONE-STOP SOLUTION
        </p>
        <h2
          id="one-stop-heading"
          className="mt-[24px] lg:mt-[41px] lg:whitespace-nowrap text-[28px] lg:text-[45px] font-bold leading-10 lg:leading-[60px] tracking-[1px] lg:tracking-[2.25px] text-brand-navy"
        >
          <span className="lg:hidden">
            설치 이후 관리까지
            <br />
            함께합니다.
          </span>
          <span className="hidden lg:inline">
            냉동설비부터
            <br />
            패브릭덕트까지,
            <br />
            설치부터 관리까지
            <br />
            <span className="whitespace-nowrap text-brand-blue">한 번에</span>
          </span>
        </h2>
        <p className="mt-[24px] lg:mt-[27px] text-[16px] lg:text-[25px] font-semibold leading-[24px] lg:leading-[40px] text-brand-text/60">
          산정엔지니어링은
          <br />
          냉동/공조설비부터 패브릭덕트 설치,
          <br />
          유지보수까지 모두 가능합니다.
        </p>
        <Image
          src="/images/fabric-duct/one-stop-logo.png"
          alt="산정엔지니어링"
          width={412}
          height={126}
          sizes="412px"
          className="hidden lg:block mt-[24px] lg:mt-[61px] h-auto w-[220px] lg:w-[412px] object-cover"
        />
      </div>
      <MobileServiceSteps steps={steps} />
      <ol className="mt-[24px] lg:mt-[51px] hidden lg:flex flex-col gap-[28px] lg:gap-[39px]">
        {steps.map((step, index) => (
          <li
            key={step.number}
            data-active={activeStep === index}
            className={`${styles.serviceStep} grid h-auto lg:h-[194px] grid-cols-1 lg:grid-cols-[56px_374px_263px] items-center gap-y-4 lg:gap-y-0 gap-x-[20px]`}
          >
            <div aria-hidden="true" className="hidden lg:block relative h-full">
              <div className="absolute inset-y-0 left-1/2 w-[2px] -translate-x-1/2 bg-brand-blue" />
              <span
                className={`${styles.stepNumber} absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex size-[56px] items-center justify-center rounded-full border border-brand-blue bg-white text-[21px] lg:text-[30px] font-medium leading-[24px] lg:leading-[36px] text-brand-blue`}
              >
                {step.number}
              </span>
              {index < steps.length - 1 && (
                <div className="absolute left-1/2 top-[calc(100%+19.5px)] -translate-x-1/2 -translate-y-1/2 flex flex-col text-brand-blue">
                  {[0, 1, 2].map((arrow) => (
                    <ChevronDown
                      key={arrow}
                      size={32}
                      strokeWidth={2}
                      className={`${styles.stepArrow} ${arrow > 0 ? "-mt-6" : ""}`}
                      style={{ animationDelay: `${arrow * 0.2}s` }}
                    />
                  ))}
                </div>
              )}
            </div>
            <div className="relative ml-[1px] h-[240px] lg:h-[194px] w-full lg:w-[374px] overflow-hidden">
              <div
                className={
                  index === 0 ? "absolute top-[-48.36%] h-[257.04%] w-full" : "absolute inset-0"
                }
              >
                <Image
                  src={step.image}
                  alt={step.title}
                  fill
                  sizes="374px"
                  quality={85}
                  className={index === 0 ? "object-fill" : "object-cover"}
                />
              </div>
            </div>
            <div className="flex flex-col gap-[16px] lg:gap-[10px] font-semibold">
              <span className="text-brand-blue lg:hidden">{step.number}</span>
              <h3 className="lg:whitespace-nowrap text-[21px] lg:text-[35px] leading-[24px] lg:leading-[40px] text-brand-text">
                {step.title}
              </h3>
              <p className="whitespace-pre-line lg:whitespace-pre text-[14px] lg:text-[20px] leading-[24px] lg:leading-[40px] text-brand-text/60">
                {step.description}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
