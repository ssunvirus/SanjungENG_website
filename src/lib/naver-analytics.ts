export const naverAccountId = "s_3311cae277b0";

export type NaverWindow = Window & {
  wcs_add?: { wa?: string };
  _nasa?: Record<string, unknown>;
  wcs?: {
    inflow: () => void;
    trans?: (conversion: { type: "lead" | "custom001" }) => void;
  };
  wcs_do?: () => void;
};

export function sendNaverLead() {
  sendNaverConversion("lead");
}

export function sendNaverPhoneClick() {
  sendNaverConversion("custom001");
}

function sendNaverConversion(type: "lead" | "custom001") {
  const naver = window as NaverWindow;
  if (!naver.wcs?.trans) return;
  naver.wcs_add = naver.wcs_add || {};
  naver.wcs_add.wa = naverAccountId;
  naver.wcs.trans({ type });
}
