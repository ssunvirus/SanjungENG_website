import fs from "node:fs";

// Only public configuration is included in deployment artifacts.
// SMTP passwords must be retrieved from a secret store at runtime.
const defaults = {
  NAVER_SMTP_PASSWORD_PARAMETER: "/amplify/shared/dl6h0cf9vpgpu/NAVER_SMTP_PASSWORD",
  SMTP_SECRET_REGION: "ap-southeast-2",
};
const keys = ["SITE_URL", "NAVER_SMTP_USER", "ESTIMATE_TO_EMAIL", ...Object.keys(defaults)];
const lines = keys.flatMap((key) => {
  const value = process.env[key] || defaults[key];
  if (!value) return [];
  if (/[\r\n]/.test(value)) throw new Error(`Invalid configuration: ${key}`);
  return [`${key}=${JSON.stringify(value)}`];
});

fs.writeFileSync(".env.production", `${lines.join("\n")}\n`);
