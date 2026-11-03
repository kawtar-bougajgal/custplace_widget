/**
 * =================================================================
 * PointsFortsCard — src/components/panel/PointsFortsCard.jsx
 * -----------------------------------------------------------------
 * White card, 3-column icon row matching Figma "Points forts":
 * Service professionnel / Bonne qualité du matériel / Réactivité
 * et sérieux. Same visual language as TrustIndicesCard (white bg,
 * rounded-[12px], soft shadow) so it sits consistently in the
 * Accueil stack.
 * =================================================================
 */
import HandshakeIcon from "../../assets/icons/HandshakeIcon.svg?react";
import PackageIcon from "../../assets/icons/PackageIcon.svg?react";
import BoltIcon from "../../assets/icons/BoltIcon.svg?react";

const DEFAULT_POINTS = [
  { icon: HandshakeIcon, label: "Service professionnel" },
  { icon: PackageIcon, label: "Bonne qualité du matériel" },
  { icon: BoltIcon, label: "Réactivité et sérieux" },
];

export default function PointsFortsCard({ points = DEFAULT_POINTS, className = "" }) {
  return (
    <div
      className={`
        cp-bg-white cp-rounded-[12px]
        cp-shadow-[0_2px_10px_rgba(16,24,40,0.08)]
        cp-p-[14px]
        cp-flex cp-flex-col cp-gap-[10px]
        cp-box-border
        ${className}
      `}
    >
      <h3 className="cp-text-[14px] cp-font-bold cp-text-cp-text-dark cp-m-0">
        Points forts
      </h3>

      <div className="cp-flex cp-items-start cp-justify-between cp-gap-[8px]">
        {points.map(({ icon: Icon, label }, i) => (
          <div
            key={i}
            className="
              cp-flex-1 cp-min-w-0
              cp-flex cp-flex-col cp-items-start cp-gap-[6px]
            "
          >
            <Icon className="cp-w-[18px] cp-h-[18px] cp-text-cp-primary" />
            <span className="cp-text-[11px] cp-leading-snug cp-text-cp-text-dark">
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}