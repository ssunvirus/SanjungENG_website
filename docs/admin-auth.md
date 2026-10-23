# 관리자 Cognito 로그인

## 배포 설정

확인된 Cognito 정보는 `scripts/amplify-runtime-env.mjs`의 기본값으로 전달됩니다.
보안키 값은 배포 파일이나 브라우저에 포함하지 않습니다.

- 리전: `ap-southeast-2`
- 사용자 풀: `ap-southeast-2_oiRW9cvWe`
- 앱 클라이언트: `1lit6l9itbtso074l9d9apl704`
- 로그인 도메인: `https://ap-southeast-2oirw9cvwe.auth.ap-southeast-2.amazoncognito.com`
- 보안키 파라미터: `/sanjung/admin/cognito-client-secret` (SecureString)
- 콜백: `https://www.sanjungeng.co.kr/api/auth/callback/cognito`
- 로그아웃 복귀: `https://www.sanjungeng.co.kr/`
- OAuth: authorization code, scopes `openid email`
- 셀프 가입 비활성화, 승인된 사용자를 `Admins` 그룹에 추가

Amplify 컴퓨팅 역할은 이 파라미터에 대한 `ssm:GetParameter` 권한이 필요합니다.
사용자 지정 KMS 키를 사용하면 해당 키 복호화 권한도 별도로 필요합니다.
추가 인증 앱 MFA 설정은 Cognito 콘솔에서 진행합니다. 코드는 이를 우회하지 않습니다.

## 동작

`/admin` 서버가 먼저 암호화 세션을 확인한 뒤 DB 연결을 확인합니다.
비로그인 사용자는 `/admin/login`으로 이동합니다. Cognito의 관리형 로그인으로 인증합니다.
OIDC 라이브러리가 서명·issuer·audience·state·nonce·PKCE를 검증하며,
검증된 ID 토큰의 `cognito:groups`에 정확히 `Admins`가 있어야 세션을 발급합니다.

세션/로그인 진행 쿠키는 HttpOnly, SameSite=Lax이며 운영 HTTPS에서는 Secure와
`__Host-` 접두사를 사용합니다. 쿠키는 `jose`로 암호화하며 클라이언트 보안키에서
HKDF로 목적별 키를 분리하여 파생합니다. 브라우저에 Cognito 토큰이나 보안키를 저장하지 않습니다.
세션은 ID 토큰 만료 또는 최대 1시간 중 짧은 쪽으로 종료하고 자동 갱신하지 않습니다.
권한 회수/계정 비활성화가 이미 발급한 로컬 세션에 반영되기까지 최대 1시간이 걸릴 수 있습니다.
보안키 교체 시 기존 로컬 세션은 무효화되며 서버의 보안키 캐시는 최대 5분 유지됩니다.

로그아웃은 동일 출처 POST만 허용하며 로컬 쿠키를 지우고 Cognito 로그아웃으로 이동합니다.
인증 오류/토큰/보안키를 로그에 출력하지 않습니다.

앞으로 추가하는 관리자 API/페이지에서도 `requireAdmin()`을 호출해야 합니다.
로그인 연결은 DB 쓰기 및 S3 사진 업로드 기능을 추가하지 않습니다.

## 로컬 확인

`.env.local`에서 `ADMIN_AUTH_URL=http://localhost:3000`을 설정하고,
Cognito 허용 콜백에 `http://localhost:3000/api/auth/callback/cognito`, 로그아웃 URL에
`http://localhost:3000/`을 추가해야 합니다. 로컬은 `localhost`를 사용합니다.
SSM을 읽을 로컬 AWS 프로파일이 필요하며 AWS 접근 키를 Git에 저장하지 않습니다.
운영 보안키를 채팅/스크린샷으로 공유하지 않습니다.

## 배포 후 검증

1. 비로그인 `/admin` 접근 → 로그인 화면으로 이동.
2. 승인 관리자 로그인 → 임시 비밀번호 변경 및 설정된 MFA 완료 → 관리자 화면 표시.
3. `Admins` 없는 계정 → 접근 거부.
4. 로그아웃 후 `/admin` 재접근 → 로그인 화면.
5. 만료 세션 → 재로그인 안내. 문의 페이지 및 공개 페이지 정상 접근.

실제 Cognito 로그인과 사용자 이메일 발송 테스트는 계정 소유자가 수행합니다.
