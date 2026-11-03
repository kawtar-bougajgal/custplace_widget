/**
 * =================================================================
 * TrustIndicesCard — src/components/panel/TrustIndicesCard.jsx
 * -----------------------------------------------------------------
 * "Indices de confiance" — now a real ELEVATED CARD (white bg,
 * rounded corners, soft shadow) instead of a flush section. The
 * floating/overlap positioning itself is applied by the PARENT
 * (AccueilTab), not here — this component only owns its own visual
 * styling (card look), not its position in the layout.
 *
 * Icons: 5 distinct SVGs, one per metric — machi nafss icon
 * mkarr like before (Cohérence w Fraîcheur kanou kaysta3mlou
 * nafss PulseIcon b8alt, daba kol wa7ed 3ndo icon dyalo).
 * =================================================================
 */
import ShieldIcon from "../../assets/icons/ShieldIcon.svg?react";
import ChatIcon from "../../assets/icons/ChatIcon.svg?react";
import TargetIcon from "../../assets/icons/TargetIcon.svg?react";
import PulseIcon from "../../assets/icons/PulseIcon.svg?react";
import ClockIcon from "../../assets/icons/ClockIcon.svg?react";

/** Single metric cell — icon + value + label, tight horizontal row */
function TrustMetric({ icon, value, label }) {
  return (
    <div className="cp-flex cp-items-center cp-gap-[6px]">
      <span className="cp-flex-shrink-0 cp-text-[#3A3A4A]">{icon}</span>
      <div className="cp-flex cp-flex-col cp-leading-none">
        <span className="cp-text-[13px] cp-font-bold cp-text-[#1A1A2E]">
          {value}
        </span>
        <span className="cp-text-[10.5px] cp-font-normal cp-text-[#8B8FA3] cp-mt-[2px]">
          {label}
        </span>
      </div>
    </div>
  );
}

/**
 * @param {object} props
 * @param {object} props.indices
 * @param {number} props.indices.responseRate - e.g. 88 (%)
 * @param {number} props.indices.coherenceScore - e.g. 90 (%)
 * @param {string} props.indices.freshness - e.g. "5/5"
 * @param {string} props.indices.responseTime - e.g. "Réactif"
 */
export default function TrustIndicesCard({ indices }) {
  if (!indices) return null;

  return (
    <div
      className="
        cp-w-full cp-bg-white
        cp-rounded-[14px]
        cp-shadow-cp-badge-rest
        cp-p-[14px]
        cp-flex cp-flex-col cp-gap-[10px]
      "
    >
      {/* Title row */}
      <div className="cp-flex cp-items-center cp-gap-[6px]">
        <ShieldIcon className="cp-w-[14px] cp-h-[14px] cp-text-cp-primary" />
        <span className="cp-text-[13px] cp-font-bold cp-text-[#1A1A2E]">
          Indices de confiance
        </span>
      </div>

      {/* 2x2 metric grid — dense spacing */}
      <div className="cp-grid cp-grid-cols-2 cp-gap-x-[18px] cp-gap-y-[10px]">
        <TrustMetric
          icon={<ChatIcon className="cp-w-[15px] cp-h-[15px]" />}
          value={`${indices.responseRate}%`}
          label="Taux de réponse"
        />
        <TrustMetric
          icon={<TargetIcon className="cp-w-[15px] cp-h-[15px]" />}
          value={`${indices.coherenceScore}%`}
          label="Indice de Cohérence"
        />
        <TrustMetric
          icon={<PulseIcon className="cp-w-[15px] cp-h-[15px]" />}
          value={indices.freshness}
          label="Fraîcheur des avis"
        />
        <TrustMetric
          icon={<ClockIcon className="cp-w-[15px] cp-h-[15px]" />}
          value={indices.responseTime}
          label="Temps de réponse"
        />
      </div>
    </div>
  );
}