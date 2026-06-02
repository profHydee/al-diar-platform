"use client";

import { useEffect } from "react";

/**
 * Retell AI chat widget (v2).
 *
 * The v2 widget is self-mounting: it loads as an ES module and reads its
 * configuration from the `data-*` attributes on its own <script id="retell-widget">
 * element (module scripts can't use document.currentScript, so it looks itself up
 * by id). We therefore inject the exact <script> tag — with every attribute
 * preserved — once on mount. The widget then renders its own floating button.
 */
const WIDGET_ID = "retell-widget";

const ATTRS: Record<string, string> = {
  "data-public-key": "public_key_a3d6995f452d3dc50a314",
  "data-agent-id": "agent_3c3c4593cd6acc16a6f1ed68ac",
  "data-voice-public-key": "public_key_a3d6995f452d3dc50a314",
  "data-voice-agent-id": "agent_f3ba111470f33714c280fef608",
  "data-title": "Chat with Al-Diar Restaurant",
  "data-bot-name": "Nour",
  "data-fab-text": "Chat with us!",
  "data-color": "#8B0000",
  "data-popup-message": "مرحباً! أهلاً وسهلاً بكم في مطعم الديار! How can I help you today?",
  "data-show-ai-popup": "true",
  "data-show-ai-popup-time": "5",
};

export function RetellWidget() {
  useEffect(() => {
    if (document.getElementById(WIDGET_ID)) return; // guard against double-mount
    const script = document.createElement("script");
    script.id = WIDGET_ID;
    script.src = "https://dashboard.retellai.com/retell-widget-v2.js";
    script.type = "module";
    for (const [key, value] of Object.entries(ATTRS)) script.setAttribute(key, value);
    document.body.appendChild(script);
  }, []);

  return null;
}
