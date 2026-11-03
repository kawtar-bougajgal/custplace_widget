/**
 * =================================================================
 * AccueilTab — src/components/tabs/AccueilTab.jsx
 * -----------------------------------------------------------------
 * TrustIndicesCard (compact grid) + 2 CTA buttons + derniers avis
 * (single-card carousel, matching Figma exactly).
 *
 * NOTE: greeting block ("Bonjour !" + subtext) is NOT here — it
 * already lives in PanelHeader.
 *
 * NOTE (Points forts): moved OUT of this tab — it now lives in
 * AvisClientsTab.jsx, right above "Derniers avis".
 *
 * NOTE (centering fix): TrustIndicesCard is wrapped in a full-width
 * flex-centered container so it stays centered regardless of its
 * own intrinsic width. No negative margin here — that's already
 * applied once on the scrollable body container in ReviewPanel.jsx.
 *
 * NOTE (reviews): single-review carousel, not a stacked list.
 *
 * NOTE (density): gap tightened from 14px -> 10px, and the "Lire
 * plus d'avis" button removed entirely — Figma has no such button,
 * and the original wider spacing was pushing content past the fold,
 * forcing a scroll that Figma's layout doesn't require.
 * =================================================================
 */
import StarOutlineIcon from "../../assets/icons/StarOutlineIcon.svg?react";
import TrustIndicesCard from "../panel/TrustIndicesCard.jsx";
import ReviewCarousel from "../shared/ReviewCarousel.jsx";
import SendIcon from "../../assets/icons/SendIcon.svg?react";

const RECENT_REVIEWS_LIMIT = 3;

/**
 * @param {object} props
 * @param {object} props.data
 * @param {() => void} [props.onAskQuestion] - kaybeddel l tab l "agentplace"
 * @param {() => void} [props.onPublishReview] - kaybeddel l tab l "publish"
 */
export default function AccueilTab({ data, onAskQuestion, onPublishReview }) {
  const reviews = data?.reviews ?? [];
  const recentReviews = reviews.slice(0, RECENT_REVIEWS_LIMIT);

  return (
    <div className="cp-flex cp-flex-col cp-gap-[10px] cp-tab-enter">
      <div className="cp-w-full cp-flex cp-justify-center">
        <TrustIndicesCard indices={data?.indices} className="cp-w-full" />
      </div>

      <button
        type="button"
        onClick={onAskQuestion}
        className="
          cp-w-full cp-flex cp-items-center cp-justify-between
          cp-py-[12px] cp-px-[16px]
          cp-rounded-[10px] cp-bg-cp-primary hover:cp-bg-cp-primary-dark
          cp-text-white cp-text-[13px] cp-font-bold
          cp-border-0 cp-cursor-pointer
          cp-transition-colors cp-duration-150
        "
      >
        Posez votre question
        <SendIcon className="cp-w-[16px] cp-h-[16px] cp-text-white" />
      </button>
      <button
        type="button"
        onClick={onPublishReview}
        className="
          cp-w-full cp-flex cp-items-center cp-justify-between
          cp-py-[12px] cp-px-[16px]
          cp-rounded-[10px] cp-bg-cp-primary hover:cp-bg-cp-primary-dark
          cp-text-white cp-text-[13px] cp-font-bold
          cp-border-0 cp-cursor-pointer
          cp-transition-colors cp-duration-150
        "
      >
        Publiez un avis
        <span className="cp-flex cp-gap-[2px]">
  {[1, 2, 3, 4, 5].map((n) => (
    <StarOutlineIcon key={n} className="cp-w-[14px] cp-h-[14px] cp-text-white/60" />
  ))}
</span>
      </button>

      <ReviewCarousel reviews={recentReviews} />
    </div>
  );
}