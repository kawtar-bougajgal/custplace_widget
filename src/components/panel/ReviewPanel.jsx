import { useRef } from "react";
import PanelHeader from "./PanelHeader";

export default function ReviewPanel({
  isOpen,
  onClose,
  company,
  stats,
  greeting,
  subtitle,
  children,
  footer,
}) {
  const scrollRef = useRef(null);
  const isDragging = useRef(false);
  const startY = useRef(0);
  const startScrollTop = useRef(0);

  function handleMouseDown(e) {
    isDragging.current = true;
    startY.current = e.clientY;
    startScrollTop.current = scrollRef.current.scrollTop;
  }
  function handleMouseMove(e) {
    if (!isDragging.current) return;
    const delta = e.clientY - startY.current;
    scrollRef.current.scrollTop = startScrollTop.current - delta;
  }
  function stopDragging() {
    isDragging.current = false;
  }

  if (!isOpen) return null;

  return (
    <div
      className="
        cp-fixed cp-bottom-[95px] cp-right-5 cp-z-[9999]
        cp-w-[300px] cp-h-[657px]
        cp-max-h-[calc(100vh-120px)]
        cp-rounded-[16px]
        cp-bg-white
        cp-shadow-cp-badge
        cp-flex cp-flex-col
        cp-overflow-hidden
      "
      role="dialog"
      aria-modal="true"
      aria-label="Panneau des avis clients"
    >
      <div className="cp-absolute cp-top-0 cp-left-0 cp-right-0 cp-h-[175px] cp-z-0 cp-bg-cp-gradient" />

      <div
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={stopDragging}
        onMouseLeave={stopDragging}
        className="
          cp-relative cp-z-10
          cp-flex-1 cp-min-h-0
          cp-overflow-y-auto cp-overflow-x-hidden cp-scrollbar-hidden
          cp-select-none cp-cursor-grab active:cp-cursor-grabbing
          cp-flex cp-flex-col
        "
      >
        <PanelHeader
          company={company}
          stats={stats}
          onClose={onClose}
          greeting={greeting}
          subtitle={subtitle}
        />

        <div
          className="
            cp-relative cp--mt-6
            cp-flex cp-flex-col cp-gap-[16px]
            cp-px-[16px] cp-pb-[16px]
            cp-rounded-t-[10px]
          "
        >
          {children}
        </div>
      </div>

      {footer && (
        <div
          className="
            cp-relative cp-z-10 cp-flex-shrink-0
            cp-border-t cp-border-[#EEF0F5] cp-bg-white
            cp-px-[16px] cp-py-[10px]
          "
        >
          {footer}
        </div>
      )}
    </div>
  );
}