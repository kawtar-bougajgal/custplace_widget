/**
 * =================================================================
 * useDraggableWidget — src/hooks/useDraggableWidget.js
 * -----------------------------------------------------------------
 * Drag dial widget kamel (badge + panel) 3bra global window
 * listeners. 5px threshold: ta7t 5px = click, fo9o = drag.
 * =================================================================
 */
import { useState, useRef, useEffect, useCallback } from "react";

const DRAG_THRESHOLD = 5;

export function useDraggableWidget() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const dragData = useRef({
    dragging: false,
    moved: false,
    startX: 0,
    startY: 0,
    origX: 0,
    origY: 0,
  });

  const handleDragStart = useCallback(
    (e) => {
      dragData.current = {
        dragging: true,
        moved: false,
        startX: e.clientX,
        startY: e.clientY,
        origX: position.x,
        origY: position.y,
      };
    },
    [position]
  );

  useEffect(() => {
    function handleMouseMove(e) {
      if (!dragData.current.dragging) return;
      const dx = e.clientX - dragData.current.startX;
      const dy = e.clientY - dragData.current.startY;
      if (Math.abs(dx) > DRAG_THRESHOLD || Math.abs(dy) > DRAG_THRESHOLD) {
        dragData.current.moved = true;
      }
      setPosition({ x: dragData.current.origX + dx, y: dragData.current.origY + dy });
    }

    function handleMouseUp() {
      dragData.current.dragging = false;
    }

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  const wasDragged = useCallback(() => dragData.current.moved, []);

  return { position, handleDragStart, wasDragged };
}