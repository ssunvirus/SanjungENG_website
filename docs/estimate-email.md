# 견적문의 이메일 연결 — 네이버 SMTP

## 계정 설정

1. 발송할 네이버 계정에서 2단계 인증을 설정합니다.
2. 네이버 계정 보안 설정에서 홈페이지용 애플리케이션 비밀번호를 생성합니다.
3. 네이버 메일 환경설정 → POP3/IMAP 설정에서 SMTP 사용을 활성화합니다.
4. 기존 `.env.local`을 덮어쓰지 말고 다음 값을 추가합니다.

```env
NAVER_SMTP_USER=sanjungeng@naver.com
NAVER_SMTP_PASSWORD=발급받은_애플리케이션_비밀번호
ESTIMATE_TO_EMAIL=sanjungeng@naver.com
```

사용자명은 실제 발송 계정의 전체 이메일 주소입니다. 발신 주소도 이 계정으로 고정합니다. 일반 로그인 비밀번호가 아닌 애플리케이션 비밀번호를 사용하며, 채팅이나 Git에 공개하지 않습니다. `.env.local`은 Git에서 제외됩니다.

## 테스트와 배포

개발 서버를 재시작한 후 간편 문의와 견적문의 페이지에서 테스트 내용을 전송합니다. 수신함과 스팸함을 확인하고 본문, 고객 이메일로 답장하기, 첨부파일을 확인합니다. Vercel 환경변수에 위 세 값을 등록하고 다시 배포한 뒤 배포된 홈페이지에서도 확인합니다.

## 동작

`app/api/estimate/route.ts`에서 입력값과 개인정보 동의를 검사하고 Nodemailer로 `smtp.naver.com:465`에 TLS 연결해 발송합니다. 고객 이메일은 Reply-To에만 설정합니다. 첨부파일은 JPG·PNG·WEBP·PDF, 최대 3개, 합계 3MB입니다.

SMTP 서버가 수신자를 수락한 경우에만 성공 응답을 보냅니다. 이는 실제 수신함 도착을 보장하지 않으므로 수신 확인이 필요합니다. 실패 시 입력값은 유지됩니다.

- 400: 입력값 또는 첨부파일 오류
- 503: 서버 환경변수 미설정
- 502: SMTP 인증·연결·수신자 거절 등 발송 실패

인증 실패 시 SMTP 활성화, 2단계 인증, 애플리케이션 비밀번호를 확인합니다. 인증정보와 내부 오류는 고객에게 노출하지 않습니다. DB 저장, 봇 차단과 공유 저장소 기반 요청 횟수 제한은 현재 구현하지 않았습니다.

## 공식 안내

- [네이버 SMTP 비밀번호 정책](https://help.naver.com/service/30029/contents/24347?lang=ko&osType=COMMONOS)
- [네이버 SMTP 서버 설정](https://help.naver.com/service/30003/contents/21341?lang=ko&osType=PC)
- [Nodemailer SMTP 설정](https://nodemailer.com/smtp)