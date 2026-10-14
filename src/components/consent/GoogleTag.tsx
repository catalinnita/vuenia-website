"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { CONSENT_EVENT, readConsent, type StoredConsent } from "@/lib/consent";

const GOOGLE_TAG_ID = "AW-17915911268";

// Google tag (gtag.js) for Google Ads conversion tracking — Consent Mode "basic": the
// tag isn't loaded at all until the visitor accepts, so nothing (not even cookieless
// pings) reaches Google before consent. Loaded after the page is interactive, so it
// never delays first render.
export default function GoogleTag() {
  const [accepted, setAccepted] = useState(false);

  useEffect(() => {
    // Reading the browser-only consent store on mount (unavailable during SSR).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setAccepted(readConsent()?.choice === "accepted");
    const onChange = (e: Event) => setAccepted((e as CustomEvent<StoredConsent>).detail.choice === "accepted");
    window.addEventListener(CONSENT_EVENT, onChange);
    return () => window.removeEventListener(CONSENT_EVENT, onChange);
  }, []);

  if (!accepted) return null;
  return (
    <>
      <Script id="google-tag-consent" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('consent', 'default', { ad_storage: 'granted', ad_user_data: 'granted', ad_personalization: 'granted', analytics_storage: 'granted' });
gtag('js', new Date());
gtag('config', '${GOOGLE_TAG_ID}');`}
      </Script>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_TAG_ID}`} strategy="afterInteractive" />
    </>
  );
}
