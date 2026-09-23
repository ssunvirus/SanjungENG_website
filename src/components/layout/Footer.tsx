import Image from "next/image";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="mx-auto h-[340px] w-[1440px] bg-[#102D4A] px-[180px] py-[22px] text-white">
            <div className="w-[1080px] overflow-hidden">
                <div className="flex h-[181px] items-start gap-[80px]">
                    <section className="w-[250px] shrink-0">
                        <Image src="/logo-white.svg" alt="산정엔지니어링" width={158} height={48} />
                        <h2 className="mt-[16px] text-[19px] font-semibold leading-[24px]">
                            30년 경험으로<br />더 나은 냉동공조 환경을 만듭니다.
                        </h2>
                        <p className="mt-[16px] text-[11px] font-light text-white/75">HVAC&nbsp; 전문 기업 산정엔지니어링</p>
                    </section>
                    <span aria-hidden="true" className="mt-2 h-[132px] w-px shrink-0 bg-white/15" />
                    <address className="w-[194px] shrink-0 not-italic">
                        <p className="text-[11px] font-light text-white/75">상담 및 문의</p>
                        <a href="tel:01053401728" className="mt-[9px] block text-[19px] font-semibold">010-5340-1728</a>
                        <dl className="mt-[9px] grid grid-cols-[48px_1fr] gap-y-[9px] text-[11px]">
                            <dt className="font-light text-white/75">Tel</dt>
                            <dd className="font-semibold"><a href="tel:028911728">02-891-1728</a></dd>
                            <dt className="font-light text-white/75">E-mail</dt>
                            <dd className="font-semibold"><a href="mailto:sanjungeng@naver.com">sanjungeng@naver.com</a></dd>
                        </dl>
                        <p className="mt-[9px] whitespace-nowrap text-[11px] font-semibold leading-[16px]">
                            서울특별시 금천구 시흥대로 97, 6동 213호<br />(시흥동, 시흥산업용재유통센타)
                        </p>
                    </address>
                    <span aria-hidden="true" className="mt-2 h-[132px] w-px shrink-0 bg-white/15" />
                    <section className="w-[93px] shrink-0">
                        <h2 className="whitespace-nowrap text-[19px] font-semibold">공식 블로그</h2>
                        <Link href="https://blog.naver.com/sanjungeng" target="_blank" rel="noopener noreferrer" aria-label="산정엔지니어링 공식 블로그 접속" className="mt-5 block">
                            <Image src="/naver-blog.svg" alt="" width={93} height={79} />
                        </Link>
                    </section>
                </div>
                <section className="flex h-[91px] items-center justify-between border-t border-white/15">
                    <h2 className="text-[19px] font-semibold text-white/75">파트너사</h2>
                    <div className="flex w-[425px] items-center gap-[8px]">
                        <Image src="/partner-multixair.svg" alt="Multixair" width={119} height={63} />
                        <Image src="/partner-klimagiel.svg" alt="Klimagiel" width={119} height={79} />
                        <Image src="/partner-carrier.svg" alt="Carrier" width={152} height={76} />
                    </div>
                </section>
                <div className="flex items-center gap-[10px] border-t border-white/15 pt-[10px] text-[11px] font-light text-white/75">
                    <span>사업자 등록번호 : 119-81-58805</span>
                    <span aria-hidden="true" className="h-[9px] w-px bg-white/15" />
                    <span>대표자 : 김윤환</span>
                </div>
                <p className="mt-[10px] text-[11px] font-light text-white/50">© 2026 (주) 산정엔지니어링. All Rights Reserved</p>
            </div>
        </footer>
    );
}
