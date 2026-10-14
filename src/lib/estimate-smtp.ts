import { GetParameterCommand, SSMClient } from "@aws-sdk/client-ssm";

export async function getSmtpPassword(): Promise<string | undefined> {
  // Local development and Vercel can provide the secret directly.
  if (process.env.NAVER_SMTP_PASSWORD) return process.env.NAVER_SMTP_PASSWORD;

  const name = process.env.NAVER_SMTP_PASSWORD_PARAMETER;
  if (!name) return undefined;

  // Amplify supplies temporary credentials through its SSR Compute role.
  const client = new SSMClient({
    region: process.env.SMTP_SECRET_REGION || "ap-southeast-2",
    maxAttempts: 2,
  });
  try {
    const result = await client.send(
      new GetParameterCommand({ Name: name, WithDecryption: true }),
      { abortSignal: AbortSignal.timeout(10000) },
    );
    return result.Parameter?.Value;
  } finally {
    client.destroy();
  }
}
