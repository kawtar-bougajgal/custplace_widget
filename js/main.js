/**
 * =================================================================
 * MAIN — js/main.js
 * -----------------------------------------------------------------
 * Entry point. Had file howa li:
 *  1. Kayqra CONFIG (client-id...)
 *  2. Kayjib data (fetchClientData → mock daba, vrai API mnbaad)
 *  3. Kaybni root DOM (badge f loading state → mnbaad badge+panel)
 *  4. Kaydir bind dial toggle open/close, click outside, Escape
 * =================================================================
 */

import { CONFIG } from "./config.js";
import { fetchClientData } from "./services/Reviews-api.js";
import { renderToggleBadge, bindToggleBadge, setBadgeVisibility } from "../src/components/ToggleBadge.js";
import { renderPanel, bindPanel } from "../src/components/Panel.js";

function getRoot() {
  let root = document.querySelector(CONFIG.rootSelector);
  if (!root) {
    // Ila l page dial client ma fihach #custplace-widget-root,
    // kanbnioh automatiquement (bach l widget ykon "plug & play").
    root = document.createElement("div");
    root.id = CONFIG.rootSelector.replace("#", "");
    document.body.appendChild(root);
  }
  return root;
}

function renderLoadingState(root) {
  root.innerHTML = `
    <div class="cp-badge is-hidden" aria-hidden="true"></div>
  `;
}

function renderErrorState(root) {
  console.error("[Custplace Widget] Impossible de charger le widget pour client:", CONFIG.clientId);
  // Fchell (échec) silencieux mn nahiyat l visiteur dial site —
  // ma khassnach nchowlo layout dial site dial client b message
  // d'erreur bayen. Kanخليو ghi log fl console bach dev y-debugui.
}

let panelController = null;
let isPanelOpen = false;

function openPanel() {
  const panel = document.getElementById("cpPanel");
  if (!panel) return;
  panel.classList.add("is-open");
  setBadgeVisibility(true);
  isPanelOpen = true;
}

function closePanel() {
  const panel = document.getElementById("cpPanel");
  if (!panel) return;
  panel.classList.remove("is-open");
  setBadgeVisibility(false);
  isPanelOpen = false;
}

function togglePanel() {
  isPanelOpen ? closePanel() : openPanel();
}

function setupGlobalInteractions(root) {
  bindToggleBadge(togglePanel);

  const closeBtn = document.getElementById("cpCloseBtn");
  if (closeBtn) closeBtn.addEventListener("click", closePanel);

  // Sed panel ila deghi user barra mno
  document.addEventListener("click", (e) => {
    if (!isPanelOpen) return;
    const panel = document.getElementById("cpPanel");
    const badge = document.getElementById("cpToggleBadge");
    const isInside = panel?.contains(e.target) || badge?.contains(e.target);
    if (!isInside) closePanel();
  });

  // Sed b Escape (accessibilité)
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isPanelOpen) closePanel();
  });
}

async function init() {
  const root = getRoot();
  renderLoadingState(root);

  try {
    const clientData = await fetchClientData(CONFIG.clientId);

    root.innerHTML = `
      ${renderToggleBadge(clientData.stats)}
      ${renderPanel(clientData)}
    `;

    panelController = bindPanel(CONFIG.clientId, clientData);
    setupGlobalInteractions(root);
  } catch (err) {
    renderErrorState(root);
  }
}

// Bda l widget mnin l page tkon jahza (DOM ready)
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}