// src/App.jsx
import { useState, useEffect } from "react";
import ReviewBadge from "./components/badge/ReviewBadge.jsx";
import ReviewPanel from "./components/panel/ReviewPanel.jsx";
import PanelNav from "./components/panel/PanelNav.jsx";
import AccueilTab from "./components/tabs/AccueilTab.jsx";
import AvisClientsTab from "./components/tabs/AvisClientsTab.jsx";
import AgentplaceTab from "./components/tabs/AgentplaceTab.jsx";
import PublierAvisTab from "./components/tabs/PublierAvisTab.jsx";
import { useReviews } from "./hooks/useReviews.js";

const CLIENT_ID = "optical-center-123";

const TAB_HEADERS = {
  accueil: {
    greeting: "Bonjour !",
    subtitle: "Trouvez ici ce que nos clients pensent de nous",
  },
  reviews: {
    greeting: "Avis clients",
    subtitle: "Découvrez les retours de nos clients",
  },
  agentplace: {
    greeting: "Posez votre question",
    subtitle: "Notre équipe vous répond rapidement",
  },
  publish: {
    greeting: "Publiez votre avis",
    subtitle: "sur Optical Center en quelques instants",
  },
};

export default function App() {
  const [isHovered, setIsHovered] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("accueil");
  const { data, isLoading, error } = useReviews(CLIENT_ID);

  useEffect(() => {
    if (isOpen) setIsHovered(false);
  }, [isOpen]);

  if (isLoading || !data) return null;
  if (error) return null;

  function renderActiveTab() {
    switch (activeTab) {
      case "accueil":
        return (
          <AccueilTab
            data={data}
            onSeeMoreReviews={() => setActiveTab("reviews")}
            onAskQuestion={() => setActiveTab("agentplace")}
            onPublishReview={() => setActiveTab("publish")}
          />
        );
      case "reviews":
        return <AvisClientsTab clientId={CLIENT_ID} data={data} />;
      case "agentplace":
        return <AgentplaceTab />;
      case "publish":
        return <PublierAvisTab clientId={CLIENT_ID} />;
      default:
        return null;
    }
  }

  const headerText = TAB_HEADERS[activeTab] ?? TAB_HEADERS.accueil;

  return (
    <>
      <ReviewBadge
        stats={data.stats}
        isHovered={isHovered}
        setIsHovered={setIsHovered}
        onClick={() => setIsOpen((prev) => !prev)}
        isOpen={isOpen}
      />
      <ReviewPanel
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        company={data.company}
        stats={data.stats}
        greeting={headerText.greeting}
        subtitle={headerText.subtitle}
        footer={<PanelNav activeTab={activeTab} setActiveTab={setActiveTab} />}
      >
        {renderActiveTab()}
      </ReviewPanel>
    </>
  );
}