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

인증 실패 시 SMTP 활성화, 2단계 인증, 애플리케이션 비밀번호를 확인합니다. 인증정보와 내부 오류는 고객에게 노출하지 않습니다.
문의 본문 자체를 DB에 저장하지 않습니다. 숨김 입력란으로 단순 봇을 걸러내며, 반복 문의 제한은 DynamoDB 공유 기록으로 처리합니다.

## 공유 요청 제한

- 같은 전화번호는 첫 요청부터 1시간에 3회, 같은 접속 주소는 첫 요청부터 10분에 5회까지입니다.
- 기존 `PROJECTS_TABLE_NAME`, `PROJECTS_AWS_REGION`을 사용합니다. 메모리 제한으로 우회하거나 DB 장애 시 무제한으로 발송하지 않습니다.
- 원문 전화번호·IP 대신 SHA-256 키, 횟수·만료 시각·버전·환불용 임시 표식을 저장합니다. 해시를 익명정보로 간주하지 않으며 불필요한 장기 보관을 피합니다.
- 시공사례와 다른 `entityType`이므로 관리자·공개 시공사례 목록에는 표시하지 않습니다.
- 두 제한과 환불 표식을 트랜잭션으로 함께 기록합니다. 동시에 여러 서버가 처리해도 부분 차감이나 초과 접수를 방지합니다.
- 정상 입력과 메일 설정을 확인한 후 횟수를 확보합니다. SMTP 발송 실패는 환불하며, 환불 표식을 함께 삭제해 중복 환불을 막습니다.
- 서버 강제 종료·환불 DB 장애·SMTP 응답 유실 등 결과가 불명확한 경우 횟수가 만료까지 남을 수 있습니다. 이메일의 정확히 한 번 전송을 보장하는 구조는 아닙니다.
- 429는 `Retry-After` 초 값을 포함합니다. DB 확인 실패·미설정은 메일을 보내지 않고 503을 반환합니다.

### 배포 전 AWS 설정

1. DynamoDB → `sanjung-projects` → TTL(Time to Live)을 활성화하고 속성 이름을 **`expiresAt`**으로 지정합니다. 기존 TTL이 다른 속성으로 설정돼 있다면 덮어쓰지 말고 별도 검토가 필요합니다.
2. `SanjungAmplifyComputeRole`에 해당 테이블의 `dynamodb:GetItem`, `dynamodb:PutItem`, `dynamodb:DeleteItem` 권한이 있는지 확인합니다. 기존 시공사례 권한이 이를 포함하면 추가 정책은 필요 없습니다. 트랜잭션 권한은 내부 Put/Delete 작업 권한으로 평가됩니다.
3. 코드 배포 후 관리자·시공사례 목록에 제한 기록이 섞이지 않는지 확인합니다. 실제 수신자를 대상으로 한 자동 테스트 메일은 보내지 않습니다.

`expiresAt`은 초 단위 숫자입니다. TTL의 물리 삭제가 늦어져도 프로그램이 별도의 `resetAt`을 확인하므로 제한은 제때 해제됩니다.
TTL을 활성화하지 않아도 제한은 동작하지만 임시 표식과 해시 기록이 쌓이므로 배포 전에 설정합니다.
기존 시공사례에는 `expiresAt`을 추가하지 않으므로 시공사례가 TTL로 삭제되지 않습니다.

[AWS TTL 동작](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/TTL.html), [트랜잭션 IAM 권한](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/transaction-apis-iam.html)

## 공식 안내

- [네이버 SMTP 비밀번호 정책](https://help.naver.com/service/30029/contents/24347?lang=ko&osType=COMMONOS)
- [네이버 SMTP 서버 설정](https://help.naver.com/service/30003/contents/21341?lang=ko&osType=PC)
- [Nodemailer SMTP 설정](https://nodemailer.com/smtp)
