import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/privacy" },
  title: "개인정보 처리방침 | 산정엔지니어링",
  description: "산정엔지니어링의 견적문의 개인정보 처리방침입니다.",
};

const heading = "mt-10 text-xl font-bold text-brand-navy";
const body = "mt-3 leading-7 text-[#405468]";

export default function PrivacyPage() {
  return (
    <main className="min-w-0 flex-1 bg-[#EFF7FB] px-5 py-16 text-brand-navy lg:py-24">
      <article className="mx-auto max-w-4xl rounded-2xl bg-white px-6 py-10 shadow-sm sm:px-10 lg:px-16 lg:py-14">
        <h1 className="text-3xl font-bold">개인정보 처리방침</h1>
        <p className={body}>
          주식회사 산정엔지니어링은 견적문의에 필요한 개인정보를 아래와 같이 처리합니다.
        </p>

        <h2 className={heading}>1. 처리 목적과 항목</h2>
        <p className={body}>
          견적문의 접수, 내용 확인 및 상담 연락을 위해 담당자명, 연락처, 문의 분야와 문의 내용을
          처리합니다. 회사명, 이메일, 현장 위치 및 첨부파일은 이용자가 입력하거나 첨부한 경우에만
          처리합니다. 문의 내용과 첨부파일에 이용자가 직접 포함한 개인정보도 함께 처리될 수
          있습니다.
        </p>

        <h2 className={heading}>2. 보유 및 이용 기간</h2>
        <p className={body}>
          견적문의 개인정보는 접수일로부터 1년간 보관한 뒤 파기합니다. 다만 관계 법령에 따라
          보존해야 하는 경우에는 해당 법령에서 정한 기간 동안 보관합니다.
        </p>

        <h2 className={heading}>3. 제3자 제공 및 서비스 이용</h2>
        <p className={body}>
          회사는 이용자의 개인정보를 견적문의 처리 목적 밖의 제3자에게 제공하지 않습니다. 웹사이트
          운영과 문의 메일 송수신에는 AWS Amplify와 네이버 메일 서비스를 이용합니다. 웹사이트의
          서버는 AWS 호주 시드니 리전에서 운영되며, 견적문의 정보는 접수 과정에서 이 서버를
          경유합니다.
        </p>

        <h2 className={heading}>4. 파기 방법</h2>
        <p className={body}>
          보유기간이 끝나거나 처리 목적이 달성되어 더 이상 필요하지 않은 개인정보는 지체 없이
          파기합니다. 전자 파일과 문의 이메일은 복구할 수 없도록 삭제하고, 출력물이 있다면
          분쇄합니다.
        </p>

        <h2 className={heading}>5. 이용자의 권리</h2>
        <p className={body}>
          이용자는 회사에 본인의 개인정보 열람, 정정, 삭제, 처리정지 또는 동의 철회를 요청할 수
          있습니다. 아래 연락처로 요청하면 관련 법령에 따라 처리하겠습니다.
        </p>

        <h2 className={heading}>6. 안전성 확보 조치</h2>
        <p className={body}>
          회사는 문의 정보에 대한 접근을 업무상 필요한 인원으로 제한하고, 웹사이트와 메일 전송에
          암호화된 통신을 사용합니다.
        </p>

        <h2 className={heading}>7. 개인정보 관련 문의</h2>
        <p className={body}>
          주식회사 산정엔지니어링 · 전화{" "}
          <a className="underline" href="tel:028911728">
            02-891-1728
          </a>{" "}
          · 이메일{" "}
          <a className="underline" href="mailto:sanjungeng@naver.com">
            sanjungeng@naver.com
          </a>
        </p>
        <p className="mt-10 border-t border-[#D1DFE8] pt-5 text-sm text-[#637382]">
          이 방침은 2026년 10월 14일부터 적용됩니다.
        </p>
      </article>
    </main>
  );
}
