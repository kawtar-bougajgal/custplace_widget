/**
 * =================================================================
 * HELPERS — utils/helpers.js
 * -----------------------------------------------------------------
 * Fonctions pures o mocharrakin (reusable) bin les components.
 * Wa7ed minhom mafihach état, ghi input -> output.
 * =================================================================
 */

/** Kaybni string dial étoiles (★★★★☆) mn note (rating 0-5) */
export function renderStars(rating) {
  const rounded = Math.round(rating);
  return "★".repeat(rounded) + "☆".repeat(5 - rounded);
}

/** "Sara Benali" -> "SB" (initiales, max 2 caractères) */
export function getInitials(fullName = "") {
  return fullName
    .split(" ")
    .filter(Boolean)
    .map((part) => part.charAt(0))
    .join("")
    .substring(0, 2)
    .toUpperCase();
}

/** Kayrja3 "il y a 3 heures" / "il y a 2 semaines" mn date ISO */
export function timeAgo(isoDate) {
  const now = new Date();
  const then = new Date(isoDate);
  const diffMs = now - then;

  const minutes = Math.floor(diffMs / (1000 * 60));
  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);

  if (minutes < 60) return `il y a ${minutes} min`;
  if (hours < 24) return `il y a ${hours} heure${hours > 1 ? "s" : ""}`;
  if (days < 7) return `il y a ${days} jour${days > 1 ? "s" : ""}`;
  if (weeks < 5) return `il y a ${weeks} semaine${weeks > 1 ? "s" : ""}`;
  return `il y a ${months} mois`;
}

/** Kayhsab moyenne dial rating mn array dial reviews */
export function getAverageRating(reviews = []) {
  if (!reviews.length) return 0;
  const total = reviews.reduce((sum, r) => sum + r.rating, 0);
  return +(total / reviews.length).toFixed(1);
}

/** Kaydir échappement dial HTML bach ymna3 XSS (mnin l user
 *  kayktb text f formulaire w kaybane f DOM) */
export function escapeHtml(str = "") {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

/** Kaydir debounce (utile ila zدنا search/filter mnbaad) */
export function debounce(fn, delay = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

/** Validation bsita dial email */
export function isValidEmail(email = "") {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/** Kaykhalliha lil premiere lettre kbira (Jean -> Jean, jean -> Jean) */
export function capitalize(str = "") {
  return str.charAt(0).toUpperCase() + str.slice(1);
}