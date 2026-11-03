/**
 * =================================================================
 * CONFIG — js/config.js
 * -----------------------------------------------------------------
 * Kayqra les attributs mn balise <script> li jabt had widget,
 * w kayrja3hom f objet wa7ed centralisé bach kolshi f app
 * yst3mlo mn hna (source of truth wa7ida).
 * =================================================================
 */

function readScriptAttributes() {
  // document.currentScript kayrja3 l balise <script type="module">
  // li kat-run daba. Ila l script mحمل b type="module" b async
  // (default), currentScript momkin ykon null mnbaad — lidalik
  // kanchdo l querySelector b fallback.
  const scriptEl =
    document.currentScript ||
    document.querySelector('script[src*="main.js"]');

  return {
    clientId: scriptEl?.getAttribute("data-client-id") || "default",
    theme: scriptEl?.getAttribute("data-theme") || "default",
    position: scriptEl?.getAttribute("data-position") || "bottom-right",
  };
}

export const CONFIG = {
  ...readScriptAttributes(),
  rootSelector: "#custplace-widget-root",
  brandName: "Custplace",
};