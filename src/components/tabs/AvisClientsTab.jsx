/**
 * =================================================================
 * AvisClientsTab — src/components/tabs/AvisClientsTab.jsx
 * -----------------------------------------------------------------
 * NOTE (Points forts): moved IN from AccueilTab.jsx — sits above
 * the "Derniers avis" white card, own separate card same as before.
 * =================================================================
 */
import { useReviews } from "../../hooks/useReviews.js";
import ReviewCard from "../shared/ReviewCard.jsx";
import PointsFortsCard from "../panel/PointsFortsCard.jsx";

export default function AvisClientsTab({ clientId, data }) {
  const { visibleReviews, hasMore, loadMoreReviews } = useReviews(clientId);

  return (
    <div className="cp-flex cp-flex-col cp-gap-[10px]">
      <PointsFortsCard points={data?.pointsForts} />

      <div
        className="
          cp-bg-white cp-rounded-[12px]
          cp-shadow-[0_2px_10px_rgba(16,24,40,0.08)]
          cp-px-[14px] cp-pt-[14px]
          cp-flex cp-flex-col
        "
      >
        <div className="cp-flex cp-items-center cp-justify-between cp-pb-[10px]">
          <h3 className="cp-text-[15px] cp-font-bold cp-text-cp-text-dark cp-m-0">
            Derniers avis
          </h3>
          <span
            className="
              cp-flex cp-items-center cp-justify-center
              cp-w-[26px] cp-h-[26px]
              cp-rounded-full
              cp-bg-cp-primary
              cp-text-white cp-text-[8px] cp-font-extrabold
              cp-flex-shrink-0
            "
            title="Norme certifiée"
          >
            NF
          </span>
        </div>

        <div className="cp-flex cp-flex-col">
          {visibleReviews.length === 0 ? (
            <div className="cp-text-[13px] cp-text-cp-text-light cp-pb-[14px]">
              Mazal makayn 7ta avis.
            </div>
          ) : (
            visibleReviews.map((review) => (
              <ReviewCard key={review.id} review={review} list />
            ))
          )}
        </div>
      </div>

      {hasMore && (
        <button
          type="button"
          onClick={loadMoreReviews}
          className="
            cp-w-full cp-py-[10px]
            cp-rounded-[10px] cp-border cp-border-cp-border
            cp-bg-transparent cp-text-cp-primary
            cp-text-[13px] cp-font-bold
            cp-transition-colors cp-duration-150
            hover:cp-bg-cp-bg-soft
          "
        >
          Lire plus d'avis
        </button>
      )}

      <p className="cp-text-center cp-text-[10px] cp-text-cp-text-light cp-m-0">
        Powered by{" "}
        <span className="cp-font-bold cp-text-cp-text-muted">Custplace</span>
      </p>
    </div>
  );
}