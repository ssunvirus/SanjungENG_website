"use client";

import { useRef, useState } from "react";
import { sendGAEvent } from "@next/third-parties/google";
import { submitEstimate } from "@/src/lib/submit-estimate";

export function useEstimateForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [notice, setNotice] = useState("");
  const sending = useRef(false);

  function showError(message: string) {
    setStatus("error");
    setNotice(message);
  }

  function clearNotice() {
    setStatus("idle");
    setNotice("");
  }

  async function send(fields: FormData, multipart = false): Promise<boolean> {
    if (sending.current) return false;
    sending.current = true;
    setStatus("sending");
    setNotice("문의를 전송하고 있습니다.");
    try {
      const received = await submitEstimate(fields, multipart);
      if (received) {
        // Isolate each destination so one tracking failure cannot block the other.
        for (const report of [
          () => sendGAEvent("event", "generate_lead"),
          () =>
            sendGAEvent("event", "conversion", {
              send_to: "AW-18414772395/jv5YCNvb76EdEKvB7MxE",
            }),
        ]) {
          try {
            report();
          } catch {
            // Tracking is best-effort and must not affect the accepted inquiry.
          }
        }
      }
      setStatus("success");
      setNotice("문의가 접수되었습니다. 담당자가 확인 후 연락드립니다.");
      return true;
    } catch (error) {
      showError(error instanceof Error ? error.message : "연결을 확인하고 다시 시도해주세요.");
      return false;
    } finally {
      sending.current = false;
    }
  }

  return { status, notice, send, showError, clearNotice };
}
