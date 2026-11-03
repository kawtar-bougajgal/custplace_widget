/**
 * =================================================================
 * useReviews — src/hooks/useReviews.js
 * -----------------------------------------------------------------
 * Hook centralisé li kaydir kolshi li 3laqa m3a data:
 *   - fetch dial client data (company, stats, strengths, reviews)
 *   - pagination dial "Avis clients" (load more)
 *   - submit dial review jdida (formulaire "Publier un avis")
 *
 * ⚠️ MNIN YKON JAHZ BACKEND: bedel ghi les 2 fonctions f
 * services/reviewsApi.js (fetchClientData, submitReview) b vrai
 * fetch() calls — had hook o les components li kayst3mlouh
 * MAYtbedloch.
 * =================================================================
 */

import { useState, useEffect, useCallback } from "react";
import { getClientData, REVIEWS_PER_PAGE } from "../data/mockData.js";

const FAKE_NETWORK_DELAY = 550; // ms — kaysimuler latence dial API

// --- Abstraction layer (services) — daba mock, ghda vrai fetch() ---
function fetchClientData(clientId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        resolve(getClientData(clientId));
      } catch (err) {
        reject(err);
      }
    }, FAKE_NETWORK_DELAY);
  });
}

function submitReviewRequest(clientId, payload) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.info("[Custplace Widget] Avis envoyé (simulation) →", {
        clientId,
        ...payload,
      });
      resolve({ success: true, reviewId: `mock-${Date.now()}` });
    }, FAKE_NETWORK_DELAY);
  });
}

/**
 * @param {string} clientId
 * @returns {{
 *   data: object | null,
 *   isLoading: boolean,
 *   error: string | null,
 *   visibleReviews: Array,
 *   hasMore: boolean,
 *   loadMoreReviews: () => void,
 *   submitReview: (payload: object) => Promise<void>,
 *   submitStatus: "idle" | "submitting" | "success" | "error",
 * }}
 */
export function useReviews(clientId) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- Pagination dial tab "Avis clients" ---
  const [page, setPage] = useState(1);

  // --- State dial formulaire "Publier un avis" ---
  const [submitStatus, setSubmitStatus] = useState("idle");

  useEffect(() => {
    let isCancelled = false;

    setIsLoading(true);
    setError(null);

    fetchClientData(clientId)
      .then((result) => {
        if (isCancelled) return;
        setData(result);
      })
      .catch((err) => {
        if (isCancelled) return;
        setError(err.message || "Impossible de charger les données du widget.");
      })
      .finally(() => {
        if (isCancelled) return;
        setIsLoading(false);
      });

    return () => {
      isCancelled = true;
    };
  }, [clientId]);

  const loadMoreReviews = useCallback(() => {
    setPage((prev) => prev + 1);
  }, []);

  const submitReview = useCallback(
    async (payload) => {
      setSubmitStatus("submitting");
      try {
        await submitReviewRequest(clientId, payload);
        setSubmitStatus("success");
      } catch (err) {
        setSubmitStatus("error");
        throw err;
      }
    },
    [clientId]
  );

  const allReviews = data?.reviews ?? [];
  const visibleReviews = allReviews.slice(0, page * REVIEWS_PER_PAGE);
  const hasMore = visibleReviews.length < allReviews.length;

  return {
    data,
    isLoading,
    error,
    visibleReviews,
    hasMore,
    loadMoreReviews,
    submitReview,
    submitStatus,
  };
}