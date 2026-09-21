"use client";

import { ChevronDown, Mail, PhoneCall } from "lucide-react";
import { FormEvent, useState } from "react";

const fieldClass = "h-[50px] rounded-[8px] border border-[#D1DFE8] bg-[#F7FBFD] px-[14px] text-[12px] text-[#102D4A] outline-none transition-colors placeholder:text-[#6E7D8C] focus:border-[#00ADDB]";

export default function EstimateCta() {
    const [submitted, setSubmitted] = useState(false);

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setSubmitted(true);
    }

    return (
        <section id="contact" aria-labelledby="estimate-heading" className="mx-auto h-[696px] w-[1440px] bg-[#EFF7FB] px-[105px] py-[75px]">
            <div className="flex h-full w-[1230px] items-center justify-center gap-[60px]">
                <div className="flex w-[525px] shrink-0 flex-col items-start gap-[21px] text-[#102D4A]">
                    <div className="flex h-6 items-center gap-[20px] text-[20px] font-medium tracking-[6px] text-[#00ADDB]/60">
                        <span>SOLUTION</span>
                        <span aria-hidden="true" className="h-[2px] w-[46px] bg-current" />
                    </div>
                    <h2 id="estimate-heading" className="text-[44px] font-bold leading-[57px]">
                        현장에 필요한 답을,<br />빠르고 정확하게 제안합니다.
                    </h2>
                    <p className="text-[16px] leading-[26px] text-[#4F6173]">
                        냉동·공조 설비부터 섬유덕트, 유지보수까지<br />
                        현장 조건과 필요한 작업을 남겨주시면 담당자가 확인 후 연락드립니다.
                    </p>
                    <span aria-hidden="true" className="h-[3px] w-[60px] rounded-sm bg-[#00ADDB]" />
                    <p className="text-[14px] font-medium leading-[21px]">30년 현장 경험　·　설계부터 시공까지　·　설치 이후 유지관리</p>
                    <div className="flex flex-col gap-[15px] rounded-[15px] bg-[#102D4A] px-[23px] py-[15px] text-white shadow-[0_4px_10px_rgba(0,0,0,0.25)]">
                        <p className="text-[12px] font-medium leading-[17px] text-[#ADC9DB]">바로 상담이 필요하신가요?</p>
                        <div className="flex flex-col gap-[6px]">
                            <PhoneCall size={36} strokeWidth={1.8} aria-hidden="true" />
                            <p className="text-[23px] font-bold leading-[35px]">대표번호 : 010 - 5340 - 1728</p>
                            <p className="text-[23px] font-bold leading-[35px]">회사번호 : 02 - 891 - 1728</p>
                        </div>
                        <div className="flex items-center gap-3 text-[#D1E3ED]">
                            <Mail size={30} strokeWidth={1.8} aria-hidden="true" />
                            <p className="text-[19px] font-medium">sanjungeng@naver.com</p>
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="flex size-[570px] shrink-0 flex-col gap-[15px] rounded-[15px] bg-white px-[39px] py-[34px] shadow-[0_14px_34px_rgba(16,45,74,0.12)]">
                    <div>
                        <h3 className="text-[23px] font-bold leading-[32px] text-[#102D4A]">간편 견적 문의</h3>
                        <p className="mt-1 text-[12px] leading-[19px] text-[#637382]">필수 정보만 남겨주시면 담당자가 확인 후 연락드립니다.</p>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <input required name="company" aria-label="업체명" placeholder="업체명 *  회사명을 입력해주세요" className={fieldClass} />
                        <input required name="manager" aria-label="담당자명" placeholder="담당자명 *  성함을 입력해주세요" className={fieldClass} />
                    </div>
                    <div className="relative w-full">
                        <select required name="category" aria-label="문의 분야" defaultValue="" className={`${fieldClass} w-full appearance-none pr-[38px]`}>
                            <option value="" disabled>문의 분야 *　냉동설비 · 공조설비 · 섬유덕트 · 유지보수</option>
                            <option>냉동설비</option><option>공조설비</option><option>섬유덕트</option><option>유지보수</option>
                        </select>
                        <ChevronDown
                            aria-hidden="true"
                            size={16}
                            strokeWidth={2.5}
                            className="pointer-events-none absolute top-1/2 right-[14px] -translate-y-1/2 text-[#102D4A]"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <input required name="phone" type="tel" aria-label="연락처" placeholder="연락처 *  010-0000-0000" className={fieldClass} />
                        <input name="email" type="email" aria-label="이메일" placeholder="이메일  example@company.com" className={fieldClass} />
                    </div>
                    <textarea name="message" aria-label="현장 및 문의 내용" placeholder="현장 및 문의 내용&#10;현장 위치, 설비 종류, 요청 작업을 간단히 입력해주세요." className={`${fieldClass} h-[87px] resize-none py-[8px]`} />
                    <label className="flex cursor-pointer items-center gap-2 text-[11px] leading-[17px] text-[#637382]">
                        <input required name="privacy" type="checkbox" className="size-[13px] accent-[#00ADDB]" />
                        개인정보 수집 및 이용에 동의합니다.
                    </label>
                    <button type="submit" className="h-[51px] shrink-0 rounded-[8px] bg-[#00ADDB] text-[15px] font-bold text-white transition-colors hover:bg-[#0098c2] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#102D4A]">
                        무료 견적 요청하기　→
                    </button>
                    <p aria-live="polite" className="h-[17px] text-center text-[11px] text-[#007FA5]">
                        {submitted ? "문의 내용이 입력되었습니다. 전송 기능은 연결 준비 중입니다." : ""}
                    </p>
                </form>
            </div>
        </section>
    );
}
