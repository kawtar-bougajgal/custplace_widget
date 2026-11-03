import CloseIcon from "../../assets/icons/CloseIcon.svg?react";
import StarIcon from "../../assets/icons/StarIcon.svg?react";

export default function PanelHeader({
  company,
  stats,
  greeting,
  subtitle,
  onClose,
}) {
  return (
    <div
      className="
        cp-relative cp-w-full
        cp-px-[16px] cp-py-[28px]
        cp-flex cp-flex-col cp-gap-[10px]
      "
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Fermer le panneau des avis"
        className="
          cp-absolute cp-top-[10px] cp-right-[10px]
          cp-inline-flex cp-items-center cp-justify-center
          cp-w-[22px] cp-h-[22px]
          cp-rounded-full
          cp-bg-white/15 hover:cp-bg-white/25
          cp-border-0 cp-p-0 cp-appearance-none cp-outline-none
          cp-transition-colors cp-duration-150 cp-ease-cp-ease
          cp-cursor-pointer
        "
      >
        <CloseIcon className="cp-w-[10px] cp-h-[10px] cp-text-white" />
      </button>

      <div className="cp-flex cp-items-center cp-justify-between cp-gap-[12px]">
        <div
          className="
            cp-flex-shrink-0
            cp-w-[48px] cp-h-[48px]
            cp-rounded-[10px]
            cp-bg-white
            cp-flex cp-items-center cp-justify-center
            cp-overflow-hidden
            cp-p-[5px]
          "
        >
          <img
            src={company.logoUrl}
            alt={company?.name ? `Logo ${company.name}` : "Logo entreprise"}
            className="cp-w-full cp-h-full cp-object-contain"
          />
        </div>

        <div className="cp-flex cp-flex-col cp-items-end cp-pr-[50px] cp-shrink-0">
          <span
            className="
              cp-inline-flex cp-items-center cp-gap-[6px]
              cp-text-white cp-text-[26px] cp-font-extrabold
              cp-leading-none cp-whitespace-nowrap
            "
          >
            {stats.badgeRating}/5
            <StarIcon className="cp-w-[22px] cp-h-[22px] cp-text-cp-accent-star" />
          </span>
          <span className="cp-text-white/80 cp-text-[9px] cp-font-medium cp-mt-[2px] cp-whitespace-nowrap">
            {stats.badgeTotalReviews.toLocaleString("fr-FR")} avis authentifiés
          </span>
        </div>
      </div>

      {/* 👉 greeting/subtitle daba conditional — mnin tab "publish"
          activa, App.jsx kaysift greeting="" subtitle="", fhad l7ala
          had l juj l elements ma kaybanouch abadan (bla espace khawi). */}
      {greeting && (
        <h2 className="cp-text-white/70 cp-text-[23px] cp-font-extrabold cp-leading-tight cp-m-0">
          {greeting}
        </h2>
      )}
      {subtitle && (
        <p className="cp-text-white cp-text-[11.5px] cp-font-normal cp-leading-snug cp-m-0">
          {subtitle}
        </p>
      )}
    </div>
  );
}