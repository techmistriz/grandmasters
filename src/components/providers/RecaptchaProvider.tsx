"use client";

import { RECAPTCHA_SITE_KEYS } from "@/src/config/recaptcha.config";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

export default function RecaptchaProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const siteKey = RECAPTCHA_SITE_KEYS.v3;

  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={siteKey || ""}
      scriptProps={{
        async: true,
        defer: true,
      }}
      container={{
        parameters: {
          badge: "bottomleft",
        },
      }}
    >
      {children}
    </GoogleReCaptchaProvider>
  );
}
