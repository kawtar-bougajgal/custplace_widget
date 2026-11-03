/**
 * =================================================================
 * ICONS — utils/icons.js
 * -----------------------------------------------------------------
 * SVG bsita (inline), bla dépendance khariجية (bach l widget
 * ykon "self-contained" o khfif).
 * =================================================================
 */

export const ICONS = {
  star: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.9 6.3 6.9.9-5 4.9 1.2 6.9L12 17.8 5.9 21l1.2-6.9-5-4.9 6.9-.9L12 2z"/></svg>`,

  /**
   * Nejma b gradient — b nafss les valeurs li kayjin f Figma:
   * linear-gradient(140.53deg, #3E5CFF 0%, #3E5CFF 40.9%, #C77FFF 64.21%)
   * SVG maعندوش "deg" bhal CSS, lidalik drt x1/y1/x2/y2 li kayqarbo
   * l nafss l diagonale (fo9-lyssar → taht-lyamin).
   */
  starGradient: `<svg viewBox="0 0 24 24">
    <defs>
      <linearGradient id="cpStarGradient" x1="15%" y1="0%" x2="85%" y2="100%">
        <stop offset="0%" stop-color="#3E5CFF"/>
        <stop offset="40.9%" stop-color="#3E5CFF"/>
        <stop offset="64.21%" stop-color="#C77FFF"/>
      </linearGradient>
    </defs>
    <path fill="url(#cpStarGradient)" d="M12 2l2.9 6.3 6.9.9-5 4.9 1.2 6.9L12 17.8 5.9 21l1.2-6.9-5-4.9 6.9-.9L12 2z"/>
  </svg>`,

  chevronDown: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 9l6 6 6-6"/></svg>`,

  close: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>`,

  shield: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-4z"/></svg>`,

  box: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 8l-9-5-9 5 9 5 9-5zM3 8v8l9 5 9-5V8M12 13v8"/></svg>`,

  bolt: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13 2L3 14h7l-1 8 11-14h-7l0-6z"/></svg>`,

  send: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>`,

  edit: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>`,

  home: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 11l9-8 9 8M5 10v10h14V10"/></svg>`,

  chatBot: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="7" width="16" height="12" rx="2"/><path d="M12 7V3M9 12h.01M15 12h.01"/></svg>`,

  check: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M5 13l4 4L19 7"/></svg>`,

  clock: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg>`,

  google: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 10.8v2.9h4.1c-.2 1.1-1.6 3.2-4.1 3.2-2.5 0-4.5-2-4.5-4.5s2-4.5 4.5-4.5c1.4 0 2.4.6 2.9 1.1l2-1.9C15.6 5.9 14 5 12 5c-3.9 0-7 3.1-7 7s3.1 7 7 7c4 0 6.7-2.8 6.7-6.8 0-.5 0-.8-.1-1.2H12z"/></svg>`,
};