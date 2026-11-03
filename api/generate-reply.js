/**
 * =================================================================
 * api/generate-reply.js — Vercel Serverless Function
 * -----------------------------------------------------------------
 * Runs on the server, NOT in the browser. Holds the Gemini API key
 * safely via process.env — never exposed to the client.
 *
 * NOTE (chatbot adjustment): now accepts a free-text customer
 * question instead of review data, and prompts Gemini to act as
 * Optical Center's AI assistant. Still includes hard timeout +
 * retry-with-backoff for transient errors (503 / 429 / timeout).
 * =================================================================
 */
import { GoogleGenerativeAI } from "@google/generative-ai";

const MODEL_NAME = "gemini-3.1-flash-lite";
const MAX_RETRIES = 3;
const BASE_DELAY_MS = 1000; // 1s, 2s, 4s
const REQUEST_TIMEOUT_MS = 10000; // hard cap per attempt: 10s

// 👉 BUSINESS CONTEXT — edit these facts to match the real business.
// This gets injected into every prompt so the AI can answer
// factual questions (hours, services, location) instead of
// hallucinating. Swap this for real data from mockData.js later.
const BUSINESS_CONTEXT = `
  Nom de l'entreprise : Optical Center
  Secteur : Opticien / audition (lunettes, lentilles, appareils auditifs)
  Horaires : Lundi-Samedi 9h30-19h00, Fermé le dimanche
  Services : Examens de vue gratuits, lunettes de vue, lunettes de soleil,
  lentilles de contact, appareils auditifs, réparations
  Note moyenne : 4.7/5 sur 44 139 avis clients
`;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function isRetryableError(err) {
  const status = err?.status;
  return status === 503 || status === 429 || err?.name === "AbortError";
}

async function generateContentWithTimeout(model, prompt, timeoutMs) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const result = await model.generateContent(prompt, {
      signal: controller.signal,
    });
    return result;
  } catch (err) {
    if (controller.signal.aborted) {
      const timeoutErr = new Error(`Timeout après ${timeoutMs}ms`);
      timeoutErr.name = "AbortError";
      throw timeoutErr;
    }
    throw err;
  } finally {
    clearTimeout(timeoutId);
  }
}

async function generateWithRetry(model, prompt) {
  let lastError = null;

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      console.log(`[generate-reply] Tentative ${attempt}/${MAX_RETRIES} (timeout ${REQUEST_TIMEOUT_MS}ms)...`);
      const result = await generateContentWithTimeout(model, prompt, REQUEST_TIMEOUT_MS);
      const reply = result.response.text();
      console.log(`[generate-reply] Succès (tentative ${attempt}).`);
      return reply;
    } catch (err) {
      lastError = err;
      const retryable = isRetryableError(err);

      console.error(
        `[generate-reply] Échec (tentative ${attempt}/${MAX_RETRIES}):`,
        err?.name === "AbortError" ? "TIMEOUT" : (err?.status || err?.message || err)
      );

      if (!retryable) {
        throw err;
      }

      if (attempt < MAX_RETRIES) {
        const delay = BASE_DELAY_MS * 2 ** (attempt - 1);
        await sleep(delay);
      }
    }
  }

  throw lastError;
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // 👉 CHANGED: now accepts { question, history } instead of
  // { reviewText, rating, companyName }. history is optional —
  // an array of past { role: "user"|"assistant", text } turns, so
  // the assistant can hold a real back-and-forth conversation.
  const { question, history = [] } = req.body ?? {};

  if (!question || !question.trim()) {
    return res.status(400).json({
      error: "Une question est requise.",
    });
  }

  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });

    // 👉 CHANGED: prompt now frames Gemini as a customer-facing
    // assistant for the business, grounded in BUSINESS_CONTEXT,
    // with prior conversation turns included for continuity.
    const historyText = history
      .map((turn) => `${turn.role === "user" ? "Client" : "Assistant"}: ${turn.text}`)
      .join("\n");

    const prompt = `
      Tu es l'assistant IA officiel d'Optical Center. Tu réponds aux
      questions des clients de manière professionnelle, chaleureuse et
      concise, en français, en te basant UNIQUEMENT sur les informations
      suivantes :

      ${BUSINESS_CONTEXT}

      Si une question porte sur une information que tu n'as pas
      (ex: prix exact, stock d'un produit précis, rendez-vous), invite
      poliment le client à contacter le magasin directement ou à utiliser
      le formulaire "Publier un avis" / la prise de rendez-vous en ligne.
      Ne jamais inventer d'informations non fournies ci-dessus.

      ${historyText ? `Historique de la conversation :\n${historyText}\n` : ""}

      Nouvelle question du client : "${question}"

      Réponds directement à cette question en 2-4 phrases maximum.
    `;

    const reply = await generateWithRetry(model, prompt);

    return res.status(200).json({ reply });
  } catch (err) {
    console.error("[api/generate-reply] Erreur Gemini finale:", err);
    return res.status(500).json({
      error: "Impossible de générer une réponse pour le moment.",
    });
  }
}