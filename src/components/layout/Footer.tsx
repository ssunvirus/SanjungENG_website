import Image from "next/image";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="mt-auto w-full pt-[78px] pb-[47px] bg-[#102D4A] text-white">
            <div className="mx-auto h-[378px] w-full max-w-[1440px] overflow-hidden">
                <div className="grid h-[215px] grid-cols-[396px_1px_436px_1px_606px]">
                    <section>
                        <Image
                            src="/logo-white.svg"
                            alt="산정엔지니어링"
                            width={204}
                            height={68}
                        />
                        <h2 className="mt-[18px] text-[25px] font-semibold leading-[30px]">
                            30년 경험으로
                            <br />
                            더 나은 냉동공조 환경을 만듭니다.
                        </h2>
                        <p className="mt-[18px] text-[15px] font-light leading-[18px] text-white/75">
                            HVAC&nbsp; 전문 기업 산정엔지니어링
                        </p>
                    </section>

                    <div className="mt-[15px] h-[176px] bg-white/10" aria-hidden="true" />

                    <address className="pl-[88px] pt-[6px] not-italic">
                        <p className="text-[15px] font-light leading-[18px] text-white/75">
                            상담 및 문의
                        </p>
                        <a
                            href="tel:01053401728"
                            className="mt-[9px] block w-fit text-[25px] font-semibold leading-[30px]"
                        >
                            010-5340-1728
                        </a>
                        <dl className="mt-[13px] grid grid-cols-[64px_1fr] gap-y-[8px] text-[15px] leading-[18px]">
                            <dt className="pl-1 font-light text-white/75">Tel</dt>
                            <dd className="font-semibold">
                                <a href="tel:028911728">02-891-1728</a>
                            </dd>
                            <dt className="pl-1 font-light text-white/75">E-mail</dt>
                            <dd className="font-semibold">
                                <a href="mailto:sanjungeng@naver.com">sanjungeng@naver.com</a>
                            </dd>
                        </dl>
                        <p className="mt-[13px] pl-1 text-[15px] font-semibold leading-[18px]">
                            서울특별시 금천구 시흥대로 97, 6동 213호
                            <br />
                            (시흥동, 시흥산업용재유통센타)
                        </p>
                    </address>

                    <div className="mt-[15px] h-[176px] bg-white/10" aria-hidden="true" />

                    <section className="pl-[124px] pt-[2px]">
                        <h2 className="text-[25px] font-semibold leading-[30px]">공식 블로그</h2>
                        <Link
                            href="https://blog.naver.com/sanjungeng"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-[26px] block w-fit"
                            aria-label="산정엔지니어링 공식 블로그 접속"
                        >
                            <Image src="/naver-blog.svg" alt="" width={124} height={106} />
                        </Link>
                    </section>
                </div>

                <section className="grid h-[124px] grid-cols-[397px_396px_1fr] border-t border-white/10">
                    <h2 className="pt-[42px] text-[25px] font-semibold leading-[30px] text-white/75">
                        파트너사
                    </h2>
                    <div aria-hidden="true" />
                    <div className="flex h-[108px] items-start pt-[6px]">
                        <Image
                            src="/partner-multixair.svg"
                            alt="Multixair"
                            width={158}
                            height={84}
                            className="mt-[11px]"
                        />
                        <Image
                            src="/partner-klimagiel.svg"
                            alt="Klimagiel"
                            width={159}
                            height={106}
                            className="ml-[35px] object-contain"
                        />
                        <Image
                            src="/partner-carrier.svg"
                            alt="Carrier"
                            width={203}
                            height={101}
                            className="mt-[7px] ml-[12px]"
                        />
                    </div>
                </section>

                <div className="flex h-[39px] items-start border-t border-white/10 pt-[19px] text-[15px] font-light leading-[18px] text-white/75">
                    <span>사업자 등록번호 : 119-81-58805</span>
                    <span
                        aria-hidden="true"
                        className="mt-[3px] ml-[13px] h-[12px] w-px shrink-0 bg-white/10"
                    />
                    <span className="ml-[13px]">대표자 : 김윤환</span>
                    <span className="ml-auto text-white/50">
                        © 2026 (주) 산정엔지니어링. All Rights Reserved
                    </span>
                </div>
            </div>
        </footer>
    );
}
