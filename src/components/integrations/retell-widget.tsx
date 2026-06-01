"use client";

import Script from "next/script";

/**
 * Retell AI chat widget.
 *
 * Both scripts use `strategy="beforeInteractive"`, so Next.js renders them
 * into the document <head> (before </head>) in the server HTML.
 *
 * NOTE: the init below only *instantiates* the Retell web client — it does not
 * itself render a visible chat bubble. Add Retell's actual widget-mount call
 * (or their <retell-widget> embed) to display a UI.
 */
export function RetellWidget() {
  return (
    <>
      <Script
        src="https://cdn.retellai.com/retell-client-sdk/index.js"
        strategy="beforeInteractive"
      />
      <Script id="retell-init" strategy="beforeInteractive">
        {`
          (function () {
            function init() {
              if (typeof window === "undefined") return;
              if (window.RetellWebClient) {
                // Initialize chat widget with your Chat Agent ID
                window.retellClient = new window.RetellWebClient();
                // Agent ID: agent_3c3c4593cd6acc16a6f1ed68ac
              } else {
                setTimeout(init, 200);
              }
            }
            init();
          })();
        `}
      </Script>
    </>
  );
}
