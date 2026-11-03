/**
 * =================================================================
 * ReviewBadge — src/components/badge/ReviewBadge.jsx
 * -----------------------------------------------------------------
 * 3 states:
 *  1. RESTING (panel closed, !isHovered): circle sghira 62x61
 *  2. HOVER (panel closed, isHovered): wide pill 380px
 *  3. PANEL-OPEN CHIP (panel open): compact pill, width auto,
 *     FIXED (bla hover/interaction ghir click bach ysedd panel)
 *
 * FIX: state 3 button kant 3andha cp-bg-transparent li kant kat-
 * override l cp-bg-[rgba(62,92,255,1)] — msa7naha, daba blue
 * background kaybane mzyan.
 * =================================================================
 */
import ChevronIcon from "../../assets/icons/ChevronIcon.svg?react";

function StarIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={`${className} cp-flex-shrink-0`}>
      <defs>
        <linearGradient id="cpStarGradient" x1="15%" y1="0%" x2="85%" y2="100%">
          <stop offset="0%" stopColor="#3E5CFF" />
          <stop offset="40.9%" stopColor="#3E5CFF" />
          <stop offset="64.21%" stopColor="#C77FFF" />
        </linearGradient>
      </defs>
      <path
        fill="url(#cpStarGradient)"
        d="M12 2l2.9 6.3 6.9.9-5 4.9 1.2 6.9L12 17.8 5.9 21l1.2-6.9-5-4.9 6.9-.9L12 2z"
      />
    </svg>
  );
}

function GradientStarCircle({ showGradient = true }) {
  return (
    <span
      className={`
        cp-flex-shrink-0 cp-inline-flex cp-w-[30px] cp-h-[29.09px] cp-rounded-full
        cp-items-center cp-justify-center cp-p-[6px]
        cp-transition-colors cp-duration-200 cp-ease-cp-ease
        ${showGradient ? "cp-bg-cp-gradient" : "cp-bg-transparent"}
      `}
    >
      <span className="cp-inline-flex cp-w-full cp-h-full cp-rounded-full cp-bg-white cp-items-center cp-justify-center">
        <StarIcon className="cp-w-[20px] cp-h-[19px]" />
      </span>
    </span>
  );
}

/**
 * @param {object} props
 * @param {{ badgeRating: number, badgeTotalReviews: number }} props.stats
 * @param {boolean} props.isHovered
 * @param {(value: boolean) => void} props.setIsHovered
 * @param {() => void} props.onClick
 * @param {boolean} props.isOpen - true mnin panel maftou7 (chip state)
 */
export default function ReviewBadge({ stats, isHovered, setIsHovered, onClick, isOpen }) {
  // ============ STATE 3: PANEL OPEN — compact fixed chip ============
  if (isOpen) {
    return (
      <div className="cp-fixed cp-bottom-5 cp-right-5 cp-z-[9999]">
        <button
          type="button"
          onClick={onClick}
          aria-label="Fermer le panneau des avis"
          className="
            cp-relative cp-inline-flex cp-items-center cp-gap-[8px]
            cp-py-[8px] cp-px-[10px]
            cp-rounded-full cp-bg-[rgba(62,92,255,1)]
            cp-shadow-cp-badge
            cp-border-0 cp-m-0
            cp-appearance-none cp-outline-none cp-cursor-pointer
          "
        >
          <GradientStarCircle showGradient={false} />
          <span className="cp-flex cp-flex-col cp-items-start cp-gap-[1px] cp-whitespace-nowrap cp-leading-[1.1] cp-text-white">
            <span className="cp-text-[14px] cp-font-extrabold">
              {stats.badgeRating}/5
              <span className="cp-text-cp-accent-star cp-text-[13px] cp-ml-[2px]">★</span>
            </span>
            <span className="cp-text-[10px] cp-font-medium cp-opacity-90">
              {stats.badgeTotalReviews.toLocaleString("fr-FR")} avis authentifiés
            </span>
          </span>
          <ChevronIcon className="cp-w-[14px] cp-h-[14px] cp-text-white cp-flex-shrink-0" />
        </button>
      </div>
    );
  }

  // ============ STATE 1 & 2: PANEL CLOSED — resting circle / hover pill ============
  return (
    <div
      className="cp-fixed cp-bottom-5 cp-right-5 cp-z-[9999] cp-pr-[6px]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <button
        type="button"
        onClick={onClick}
        aria-expanded={isHovered}
        aria-label={`Ouvrir les avis clients — note ${stats.badgeRating} sur 5, ${stats.badgeTotalReviews.toLocaleString(
          "fr-FR"
        )} avis authentifiés`}
        className={`
          cp-relative cp-block
          cp-bg-transparent cp-border-0 cp-p-0 cp-m-0
          cp-appearance-none cp-outline-none
          cp-transition-all cp-duration-300 cp-ease-cp-ease
          ${
            isHovered
              ? "cp-w-[219px] cp-h-[60px] cp-rounded-full cp-overflow-hidden"
              : "cp-w-[62px] cp-h-[61.09px]"
          }
        `}
      >
        {/* ============ RESTING — gradient circle + rating pill ============ */}
        <div
          className={`
            cp-absolute cp-inset-0
            cp-transition-opacity cp-duration-200 cp-ease-cp-ease
            ${isHovered ? "cp-opacity-0 cp-pointer-events-none" : "cp-opacity-100"}
          `}
        >
          <div className="cp-absolute cp-bottom-0 cp-left-0">
            <GradientStarCircle showGradient={true} />
          </div>

          <span
            className="
              cp-absolute cp-top-0 cp-right-[-5px]
              cp-inline-flex cp-items-center cp-gap-[4px]
              cp-w-[43px] cp-h-[16px]
              cp-pt-[3px] cp-pb-[3px] cp-pl-[6px] cp-pr-[6px]
              cp-rounded-full cp-bg-[#3E5CFF]
              cp-whitespace-nowrap cp-shadow-cp-badge-rest
            "
          >
            <span className="cp-text-[11px] cp-font-bold cp-text-white cp-leading-none">
              {stats.badgeRating}/5
            </span>
            <span className="cp-text-[10px] cp-leading-none">⭐</span>
          </span>
        </div>

        {/* ============ HOVER — wide pill ============ */}
        <div
          className={`
            cp-absolute cp-inset-0
            cp-flex cp-items-center cp-justify-between
            cp-gap-[14px] cp-p-[10px]
            cp-bg-[rgba(62,92,255,1)]
            cp-shadow-cp-badge
            cp-transition-opacity cp-duration-200 cp-ease-cp-ease
            ${isHovered ? "cp-opacity-100" : "cp-opacity-0 cp-pointer-events-none"}
          `}
        >
          <div className="cp-flex cp-items-center cp-gap-[14px]">
            <GradientStarCircle showGradient={false} />

            <div className="cp-flex cp-flex-col cp-items-start cp-justify-center cp-gap-[2px] cp-whitespace-nowrap cp-overflow-hidden cp-text-left cp-leading-[1.15] cp-text-white">
              <span className="cp-text-[17px] cp-font-extrabold">
                {stats.badgeRating}/5
                <span className="cp-text-cp-accent-star cp-text-[16px] cp-ml-[3px]">★</span>
              </span>
              <span className="cp-text-[11.5px] cp-font-medium cp-opacity-100">
                {stats.badgeTotalReviews.toLocaleString("fr-FR")} avis authentifiés
              </span>
            </div>
          </div>

          <ChevronIcon className="cp-w-[16px] cp-h-[16px] cp-text-white cp-flex-shrink-0" />
        </div>
      </button>
    </div>
  );
}