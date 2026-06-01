"use client";

import Script from "next/script";

/**
 * Retell AI chat widget.
 * Loads the Retell client SDK, then instantiates the web client once the
 * script is ready (guaranteeing `RetellWebClient` is defined before use).
 */
const RETELL_AGENT_ID = "agent_3c3c4593cd6acc16a6f1ed68ac";

export function RetellWidget() {
  return (
    <Script
      src="https://cdn.retellai.com/retell-client-sdk/index.js"
      strategy="afterInteractive"
      onLoad={() => {
        const w = window as unknown as { RetellWebClient?: new () => unknown };
        if (!w.RetellWebClient) return;
        // Initialize chat widget with your Chat Agent ID
        const client = new w.RetellWebClient();
        // Agent ID: agent_3c3c4593cd6acc16a6f1ed68ac
        (window as unknown as { retellClient?: unknown }).retellClient = client;
        void RETELL_AGENT_ID;
      }}
    />
  );
}
