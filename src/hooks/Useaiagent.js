/**
 * =================================================================
 * src/hooks/useAIAgent.js
 * -----------------------------------------------------------------
 * Frontend hook that calls our own serverless proxy at
 * /api/generate-reply. Never touches the Gemini SDK or API key
 * directly — the key stays server-side only.
 *
 * NOTE (chatbot adjustment): generateReply now takes
 * { question, history } instead of review data, matching the
 * updated backend. history is an array of { role, text } turns.
 * =================================================================
 */
import { useState, useCallback } from "react";

export function useAIAgent() {
  const [reply, setReply] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const generateReply = useCallback(async ({ question, history = [] }) => {
    setIsLoading(true);
    setError(null);
    setReply(null);
    try {
      const res = await fetch("/api/generate-reply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question, history }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error || "Une erreur est survenue.");
      }
      setReply(data.reply);
      return data.reply;
    } catch (err) {
      setError(err.message || "Une erreur est survenue.");
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setReply(null);
    setError(null);
    setIsLoading(false);
  }, []);

  return { reply, isLoading, error, generateReply, reset };
}