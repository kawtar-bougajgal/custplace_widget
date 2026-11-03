import StarIcon from "../../assets/icons/StarIcon.svg?react";
import GoogleIcon from "../../assets/icons/GoogleIcon.svg?react";

function VerifiedIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M12 2l2.4 2.2 3.2-.6.9 3.1 3 1.4-.9 3.1 1.4 2.8-2.6 2-.4 3.2-3.2-.2L12 22l-2.8-3-3.2.2-.4-3.2-2.6-2 1.4-2.8-.9-3.1 3-1.4.9-3.1 3.2.6L12 2z" opacity="0.15"/>
      <path d="M8.5 12.5l2.3 2.3 4.7-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function PinIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

export default function ReviewCard({ review, compact = false, list = false }) {
  // 👉 LIST VARIANT — flat row style, matches Figma "Derniers avis":
  // no card shadow, thin bottom divider, name+checkmark / location on
  // their own lines, rating pinned top-right.
  if (list) {
    return (
      <div
        className="
          cp-w-full cp-py-[12px]
          cp-border-b cp-border-cp-border
          last:cp-border-b-0
          cp-flex cp-flex-col cp-gap-[4px]
        "
      >
        <div className="cp-flex cp-items-start cp-justify-between cp-gap-[8px]">
          <div className="cp-flex cp-flex-col cp-gap-[2px] cp-min-w-0">
            <div className="cp-flex cp-items-center cp-gap-[4px] cp-min-w-0">
              <span className="cp-text-[13px] cp-font-bold cp-text-cp-text-dark cp-truncate">
                {review.author}
              </span>
              {review.verified && (
                <VerifiedIcon className="cp-w-[13px] cp-h-[13px] cp-text-cp-primary cp-flex-shrink-0" />
              )}
            </div>
            <div className="cp-flex cp-items-center cp-gap-[6px] cp-flex-wrap">
              <span className="cp-text-[11px] cp-text-cp-text-light cp-whitespace-nowrap">
                {review.timeAgo}
              </span>
              {review.location && (
                <span className="cp-inline-flex cp-items-center cp-gap-[2px] cp-text-[11px] cp-text-cp-text-light">
                  <PinIcon className="cp-w-[10px] cp-h-[10px]" />
                  {review.location}
                </span>
              )}
            </div>
          </div>
          <span className="cp-flex-shrink-0 cp-inline-flex cp-items-center cp-gap-[4px]">
            <GoogleIcon className="cp-w-[14px] cp-h-[14px]" />
            <StarIcon className="cp-w-[12px] cp-h-[12px] cp-text-cp-accent-star" />
            <span className="cp-text-[12px] cp-font-bold cp-text-cp-text-dark">
              {review.rating}
            </span>
          </span>
        </div>

        <p className="cp-text-[13px] cp-text-cp-text-dark cp-leading-snug cp-m-0 cp-overflow-hidden cp-line-clamp-3">
          {review.text}
        </p>
      </div>
    );
  }

  // 👉 CARD VARIANT (unchanged) — used by ReviewCarousel on Accueil tab.
  return (
    <div
      className="
        cp-w-full cp-box-border
        cp-bg-white cp-rounded-[12px]
        cp-shadow-[0_2px_10px_rgba(16,24,40,0.08)]
        cp-p-[14px]
        cp-flex cp-flex-col cp-gap-[6px]
        cp-overflow-hidden
      "
    >
      <div className="cp-flex cp-items-center cp-justify-between cp-gap-[8px] cp-min-w-0">
        <span className="cp-text-[13px] cp-font-bold cp-text-cp-text-dark cp-truncate">
          {review.author}
        </span>
        <span className="cp-flex-shrink-0 cp-inline-flex cp-items-center cp-gap-[4px]">
          <GoogleIcon className="cp-w-[14px] cp-h-[14px]" />
          <StarIcon className="cp-w-[12px] cp-h-[12px] cp-text-cp-accent-star" />
          <span className="cp-text-[12px] cp-font-bold cp-text-cp-text-dark">
            {review.rating}
          </span>
        </span>
      </div>
      <span className="cp-text-[11px] cp-text-cp-text-light">
        {review.timeAgo}
      </span>
      <p className="cp-text-[13px] cp-text-cp-text-dark cp-leading-snug cp-m-0 cp-overflow-hidden cp-line-clamp-2">
        {review.text}
      </p>
    </div>
  );
}