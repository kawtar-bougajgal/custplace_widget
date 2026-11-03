/**
 * =================================================================
 * MOCK DATA — src/data/mockData.js
 * -----------------------------------------------------------------
 * Structure dyal data bhal ghadi tji mn vrai API (bach l switch
 * l backend mabqach reshkel). Kol client 3ndo ID dyalo (bhal
 * "optical-center-123") w had object kayrja3 lih.
 * =================================================================
 */

export const REVIEWS_PER_PAGE = 5;

const opticalCenterReviews = [
  {
    id: "rev-001",
    author: "Sofia Benali",
    rating: 5,
    date: "2026-06-28",
    location: "Agadir",
    source: "google",
    verified: true,
    text: "Accueil impeccable, conseils personnalisés pour le choix de mes lunettes. Je recommande vivement !",
  },
  {
    id: "rev-002",
    author: "Karim El Fassi",
    rating: 4,
    date: "2026-06-20",
    location: "Agadir",
    source: "custplace",
    verified: true,
    text: "Bon rapport qualité-prix, délai de livraison un peu long mais le résultat final est top.",
  },
  {
    id: "rev-003",
    author: "Nadia Alaoui",
    rating: 5,
    date: "2026-06-15",
    location: "Rabat",
    source: "google",
    verified: true,
    text: "Équipe très professionnelle, examen de vue complet et rapide. Mes nouvelles lunettes sont parfaites.",
  },
  {
    id: "rev-004",
    author: "Youssef Amrani",
    rating: 3,
    date: "2026-06-10",
    location: "Casablanca",
    source: "custplace",
    verified: false,
    text: "Service correct mais l'attente en magasin était assez longue un samedi après-midi.",
  },
  {
    id: "rev-005",
    author: "Leila Chraibi",
    rating: 5,
    date: "2026-06-02",
    location: "Agadir",
    source: "google",
    verified: true,
    text: "Réactivité et sérieux du personnel, ma monture cassée a été réparée gratuitement en 10 minutes.",
  },
  {
    id: "rev-006",
    author: "Hamza Idrissi",
    rating: 4,
    date: "2026-05-27",
    location: "Marrakech",
    source: "custplace",
    verified: true,
    text: "Très bon choix de montures, prix raisonnables. Le vendeur a pris le temps de bien m'expliquer les options.",
  },
  {
    id: "rev-007",
    author: "Amal Tazi",
    rating: 5,
    date: "2026-05-20",
    location: "Agadir",
    source: "google",
    verified: true,
    text: "Excellent suivi après-vente, ils m'ont contactée pour vérifier que tout allait bien avec mes lentilles.",
  },
  {
    id: "rev-008",
    author: "Omar Benjelloun",
    rating: 2,
    date: "2026-05-14",
    location: "Agadir",
    source: "custplace",
    verified: false,
    text: "Attente trop longue pour un simple ajustement de monture, mais le résultat était bien fait.",
  },
];

const clientsDatabase = {
  "optical-center-123": {
   company: {
  name: "Optical Center",
  logoUrl: "/assets/optical-center-logo.png", // ← put your real logo file here instead of placehold.co
},
stats: {
  averageRating: 4.7,
  totalReviews: 44139,
  badgeRating: 4.7,
  badgeTotalReviews: 44139,
},
    strengths: [
      { icon: "shield", label: "Service professionnel" },
      { icon: "box", label: "Bonne qualité du matériel" },
      { icon: "bolt", label: "Réactivité et sérieux" },
      
    ],
    // ⬇️ ZID HADI (jdida) ⬇️
    indices: {
      responseRate: 88,
      coherenceScore: 90,
      freshness: "5/5",
      responseTime: "Réactif",
    },
    reviews: opticalCenterReviews,
  },
};

/**
 * Kayrja3 data dial client mo3ayen. Kayrmi error ila l client
 * makaynch — nafss l comportement li ghadi ykon m3a vrai API
 * (404 → throw, bach useReviews ymsek l erreur f catch).
 */
export function getClientData(clientId) {
  const client = clientsDatabase[clientId];
  if (!client) {
    throw new Error(`Client introuvable: ${clientId}`);
  }
  return client;
}