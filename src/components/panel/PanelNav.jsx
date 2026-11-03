/**
 * =================================================================
 * PanelNav — src/components/panel/PanelNav.jsx
 * -----------------------------------------------------------------
 * Bottom nav bar — 4 tabs (Accueil / Avis clients / Agentplace /
 * Publier un avis). Kaydir switch dial activeTab state (controlled
 * mn App.jsx).
 *
 * NOTE (icons): emoji placeholders (🏠⭐💬✏️) mbdlin b real SVG
 * imports — same pattern deja mst3mal f CloseIcon/StarIcon/SendIcon.
 *
 * NOTE (badge): "Avis clients" 3andha optional notification badge
 * (l cercle bleu bla number, b7al f Figma). Khassha tji mn parent
 * (App.jsx) via prop reviewsBadgeCount — ila ma jatch, l badge ma
 * kaybanch (bla ay hardcoded value hna).
 * =================================================================
 */
import HomeIcon from "../../assets/icons/HomeIcon.svg?react";
import StarNavIcon from "../../assets/icons/StarNavIcon.svg?react";
import ChatIcon from "../../assets/icons/ChatAgentIcon.svg?react";
import PencilIcon from "../../assets/icons/PencilIcon.svg?react";

const TABS = [
  { id: "accueil", label: "Accueil", Icon: HomeIcon },
  { id: "reviews", label: "Avis clients", Icon: StarNavIcon, badge: true },
  { id: "agentplace", label: "Agentplace", Icon: ChatIcon},
  { id: "publish", label: "Publier un avis", Icon: PencilIcon },
];

/**
 * @param {object} props
 * @param {string} props.activeTab
 * @param {(tab: string) => void} props.setActiveTab
 * @param {number} [props.reviewsBadgeCount] - optional count shown on "Avis clients"
 */
export default function PanelNav({ activeTab, setActiveTab, reviewsBadgeCount }) {
  return (
    <nav className="cp-grid cp-grid-cols-4 cp-gap-[4px]">
      {TABS.map(({ id, label, Icon, disabled, badge }) => {
        const isActive = id === activeTab;
        return (
          <button
            key={id}
            type="button"
            disabled={disabled}
            onClick={() => setActiveTab(id)}
            title={disabled ? `${label} — bientôt disponible` : label}
            className={`
              cp-relative
              cp-flex cp-flex-col cp-items-center cp-gap-[3px]
              cp-py-[6px] cp-px-[2px]
              cp-bg-transparent cp-border-0
              cp-transition-colors cp-duration-150
              ${isActive ? "cp-text-cp-primary" : "cp-text-cp-text-light"}
              ${disabled ? "cp-opacity-45 cp-cursor-not-allowed" : "cp-cursor-pointer"}
            `}
          >
            <span className="cp-relative cp-inline-flex">
              <Icon className="cp-w-[18px] cp-h-[18px]" />
              {badge && reviewsBadgeCount > 0 && (
                <span
                  className="
                    cp-absolute cp-top-[-6px] cp-right-[-8px]
                    cp-min-w-[15px] cp-h-[15px] cp-px-[3px]
                    cp-rounded-full cp-bg-cp-primary
                    cp-text-white cp-text-[8px] cp-font-bold
                    cp-flex cp-items-center cp-justify-center
                    cp-leading-none
                  "
                >
                  {reviewsBadgeCount > 99 ? "99+" : reviewsBadgeCount}
                </span>
              )}
            </span>
            <span className="cp-text-[10px] cp-font-semibold cp-leading-none cp-whitespace-nowrap">
              {label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}