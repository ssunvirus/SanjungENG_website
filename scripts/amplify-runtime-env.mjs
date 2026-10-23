import fs from "node:fs";

// Only public configuration is included in deployment artifacts.
// SMTP passwords must be retrieved from a secret store at runtime.
const defaults = {
  NAVER_SMTP_PASSWORD_PARAMETER: "/amplify/shared/dl6h0cf9vpgpu/NAVER_SMTP_PASSWORD",
  SMTP_SECRET_REGION: "ap-southeast-2",
  COGNITO_REGION: "ap-southeast-2",
  COGNITO_USER_POOL_ID: "ap-southeast-2_oiRW9cvWe",
  COGNITO_CLIENT_ID: "1lit6l9itbtso074l9d9apl704",
  COGNITO_DOMAIN: "https://ap-southeast-2oirw9cvwe.auth.ap-southeast-2.amazoncognito.com",
  COGNITO_CLIENT_SECRET_PARAMETER: "/sanjung/admin/cognito-client-secret",
  ADMIN_AUTH_URL: "https://www.sanjungeng.co.kr",
};
const keys = [
  "SITE_URL",
  "NAVER_SMTP_USER",
  "ESTIMATE_TO_EMAIL",
  "PROJECTS_TABLE_NAME",
  "PROJECTS_AWS_REGION",
  ...Object.keys(defaults),
];
const lines = keys.flatMap((key) => {
  const value = process.env[key] || defaults[key];
  if (!value) return [];
  if (/[\r\n]/.test(value)) throw new Error(`Invalid configuration: ${key}`);
  return [`${key}=${JSON.stringify(value)}`];
});

fs.writeFileSync(".env.production", `${lines.join("\n")}\n`);
