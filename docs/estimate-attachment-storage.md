# 견적문의 조건별 첨부

## 동작

- 최대 5개, 전체 20MiB. JPG·PNG·WEBP·PDF·ZIP 지원.
- 합계 3MiB 이하: 기존 `/api/estimate` multipart 요청으로 직접 메일 첨부.
- 합계 3MiB 초과: 파일별 SHA-256 계산 → 동일 출처의 `/api/estimate/attachments/upload`에서 서명된 POST 발급 → 브라우저에서 비공개 S3로 직접 전송 → 파일 대신 암호화된 업로드 토큰으로 문의 접수.
- 업로드 정책은 키·크기·MIME·SHA-256을 고정하고 10분 만료. 같은 정책으로 다른 내용 덮어쓰기 불가. 업로드 토큰은 전화번호 해시에 연결되며 30분 만료.
- 서버는 저장된 실제 크기, 체크섬, 파일 시그니처를 확인한 뒤 메일에 링크를 추가. 첨부 검증/메일 발송 실패는 문의 성공이나 광고 전환으로 처리하지 않음. 시그니처 검사는 악성코드 검사를 대신하지 않음.
- 메일 링크는 다운로드 전용 암호화 토큰, 7일 만료. 홈페이지에서 확인한 후 60초짜리 S3 다운로드 URL로 리다이렉트하므로 컴퓨팅 역할의 임시 인증정보 수명에 이메일 링크 수명이 종속되지 않음.
- 링크는 소지자가 사용하는 비공개 접근 권한이므로 외부 공유 금지. 토큰은 SMTP 비밀번호에서 별도 목적 키를 유도해 암호화한다. 비밀번호를 변경하면 기존 링크도 무효화된다. 고객에게 비밀번호/계정 키는 전달하지 않음.
- 업로드 발급은 문의 접수와 별도의 공유 요청 제한 사용: 전화번호당 1시간 3회, IP당 10분 5회. 발급 후 업로드를 중단한 경우에도 횟수는 유지. 실패·중단 파일도 아래 수명주기로 정리.

## 배포 전 AWS 설정 (필수)

1. `ap-southeast-2`의 **비공개** S3 버킷을 선택한다. 기존 시공사례 버킷도 가능하나 `projects/`와 겹치지 않는 `estimate-attachments/` 접두사를 사용한다. 퍼블릭 액세스 차단을 유지한다.
2. Amplify 환경변수 `ESTIMATE_ATTACHMENTS_BUCKET`에 버킷 이름을 추가한다. `PROJECTS_AWS_REGION=ap-southeast-2`, `SITE_URL=https://www.sanjungeng.co.kr`도 필요하다. 스크립트가 공개 설정만 런타임 파일로 전달한다. SMTP 비밀번호는 기존 Parameter Store/서버 비밀변수를 그대로 사용한다.
3. 컴퓨팅 역할에 아래 **추가** 권한을 부여한다. 기존 `projects/*` 정책은 그대로 유지한다. 버킷 이름을 실제 값으로 바꾼다.

```json
{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Allow",
    "Action": ["s3:PutObject", "s3:GetObject"],
    "Resource": "arn:aws:s3:::YOUR_BUCKET/estimate-attachments/*"
  }]
}
```

4. S3 → 권한 → CORS에서 다음 규칙을 기존 규칙에 **추가**한다. 실제 서비스 도메인이 다르면 변경한다. 로컬 테스트 때만 해당 개발 origin도 목록에 추가한다 (`http://localhost:3000`, LAN 테스트 주소 등). 와일드카드 origin이나 버킷 공개 설정은 필요 없다.

```json
[
  {
    "AllowedOrigins": ["https://www.sanjungeng.co.kr", "https://sanjungeng.co.kr"],
    "AllowedMethods": ["POST"],
    "AllowedHeaders": ["*"],
    "MaxAgeSeconds": 600
  }
]
```

5. S3 → 관리 → 수명주기 규칙에서 `estimate-attachments/` 접두사에만 다음 규칙을 추가한다. **업로드 후 8일 만료**는 고객에게 안내한 보관 정책이므로 활성화 전에 반드시 설정한다. 버전 관리 비활성 버킷을 권장한다. 기존 수명주기 규칙은 덮어쓰지 않는다. 버전 관리가 활성화됐다면 비현재 버전 영구 삭제와 만료된 삭제 마커 정리도 함께 설정해야 실제 바이트가 남지 않는다.

```json
{
  "ID": "expire-estimate-attachments",
  "Status": "Enabled",
  "Filter": { "Prefix": "estimate-attachments/" },
  "Expiration": { "Days": 8 },
  "AbortIncompleteMultipartUpload": { "DaysAfterInitiation": 1 }
}
```

S3 수명주기 삭제는 만료 시점에 즉시 실행되는 타이머가 아니다. 7일 뒤에는 웹 다운로드 토큰이 만료되어 접근이 차단되고 저장소에서는 8일 후 자동 삭제 대상이 된다. 메일/업무용으로 다운로드한 파일의 보관 정책은 기존 개인정보 처리방침을 따른다.

6. 재배포 후 아래 확인을 마친다.

## 운영 확인

- 작은 사진 5개, 합계 3MiB 이하 → 메일 첨부, 다운로드 링크 없음.
- 합계 3MiB 초과 PDF·사진/ZIP → 파일이 메일에 직접 붙지 않고 7일 링크 표시, 다운로드 내용/파일명 일치.
- 6개, 합계 20MiB 초과, 형식 위장 파일 → 접수 거부.
- 저장소 미설정, 권한/CORS 오류, 업로드 실패 → 문의 성공/전환 이벤트가 발생하지 않고 재시도 안내. 입력과 선택 파일 유지.
- 다른 문의의 토큰, 변조/만료된 토큰 → 거부. 기존 시공사례 사진 API에서 문의 파일 조회 불가.

자동 테스트는 브라우저 분기·토큰 검증·서버 분기를 모의 환경에서 검사한다. 실제 AWS 업로드/다운로드 및 네이버 메일 수신은 위 설정 후 별도 확인이 필요하다.

공식 참고: [S3 서명 URL과 임시 인증정보](https://docs.aws.amazon.com/AmazonS3/latest/userguide/using-presigned-url.html), [POST 정책](https://docs.aws.amazon.com/AmazonS3/latest/API/sigv4-HTTPPOSTConstructPolicy.html).
