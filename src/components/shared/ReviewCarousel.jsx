import { useState } from "react";
import ReviewCard from "./ReviewCard.jsx";

function ChevronIcon({ className, direction = "left" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      style={{ transform: direction === "right" ? "rotate(180deg)" : undefined }}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 18l-6-6 6-6" />
    </svg>
  );
}

/**
 * @param {object} props
 * @param {Array} props.reviews
 */
export default function ReviewCarousel({ reviews = [] }) {
  const [index, setIndex] = useState(0);

  if (reviews.length === 0) {
    return (
      <div className="cp-text-[13px] cp-text-cp-text-light">
        Mazal makayn 7ta avis.
      </div>
    );
  }

  const goPrev = () => setIndex((i) => (i === 0 ? reviews.length - 1 : i - 1));
  const goNext = () => setIndex((i) => (i === reviews.length - 1 ? 0 : i + 1));

  return (
    // 👉 flex + items-center = boutons kaytmarkzo 3moudiyan m3a l card
    // AWTOMATIKIYAN. cp-box-border + cp-py-[2px] bach l shadow dyal
    // ReviewCard ma yt9tou3ch mn l scroll container li fo9o, o
    // cp-min-w-0 fo9 bach l flex-1 ma yfor7ich l width b7al content.
    <div className="cp-w-full cp-flex cp-items-center cp-gap-[10px] cp-py-[2px] cp-box-border cp-min-w-0">
      <button
        type="button"
        onClick={goPrev}
        aria-label="Avis précédent"
        className="
          cp-flex-shrink-0 cp-w-[24px] cp-h-[24px]
          cp-flex cp-items-center cp-justify-center
          cp-rounded-full cp-bg-cp-primary cp-text-white
          cp-border-0 cp-cursor-pointer
          cp-shadow-[0_2px_6px_rgba(16,24,40,0.15)]
        "
      >
        <ChevronIcon className="cp-w-[14px] cp-h-[14px]" direction="left" />
      </button>

      <div className="cp-flex-1 cp-min-w-0">
        <ReviewCard review={reviews[index]} compact />
      </div>

      <button
        type="button"
        onClick={goNext}
        aria-label="Avis suivant"
        className="
          cp-flex-shrink-0 cp-w-[24px] cp-h-[24px]
          cp-flex cp-items-center cp-justify-center
          cp-rounded-full cp-bg-cp-primary cp-text-white
          cp-border-0 cp-cursor-pointer
          cp-shadow-[0_2px_6px_rgba(16,24,40,0.15)]
        "
      >
        <ChevronIcon className="cp-w-[14px] cp-h-[14px]" direction="right" />
      </button>
    </div>
  );
}