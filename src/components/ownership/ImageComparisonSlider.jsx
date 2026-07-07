import { useCallback, useEffect, useRef, useState } from 'react';
import { GripVertical } from 'lucide-react';

import MarketplaceMockup from './MarketplaceMockup.jsx';
import OwnedWebsiteMockup from './OwnedWebsiteMockup.jsx';

/**
 * Draggable before/after comparison.
 *
 * Base layer: owned website experience (right/after). Overlay: marketplace
 * page (left/before), clipped to the handle position with `clip-path`.
 * Dragging anywhere on the frame moves the divider; the handle also supports
 * keyboard arrows. Position is clamped 5-95%.
 *
 * Lightweight DOM/CSS only — no canvas, no animation library.
 */
const MIN = 5;
const MAX = 95;
const clamp = (v) => Math.min(MAX, Math.max(MIN, v));

export default function ImageComparisonSlider() {
  const containerRef = useRef(null);
  const draggingRef = useRef(false);
  const [position, setPosition] = useState(50);

  const updateFromClientX = useCallback((clientX) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    setPosition(clamp(((clientX - rect.left) / rect.width) * 100));
  }, []);

  const onPointerDown = useCallback(
    (event) => {
      draggingRef.current = true;
      containerRef.current?.setPointerCapture?.(event.pointerId);
      updateFromClientX(event.clientX);
    },
    [updateFromClientX]
  );

  const onPointerMove = useCallback(
    (event) => {
      if (!draggingRef.current) return;
      updateFromClientX(event.clientX);
    },
    [updateFromClientX]
  );

  const endDrag = useCallback(() => {
    draggingRef.current = false;
  }, []);

  // Global pointerup covers drags that end outside the frame.
  useEffect(() => {
    window.addEventListener('pointerup', endDrag);
    window.addEventListener('pointercancel', endDrag);
    return () => {
      window.removeEventListener('pointerup', endDrag);
      window.removeEventListener('pointercancel', endDrag);
    };
  }, [endDrag]);

  const onHandleKeyDown = (event) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      setPosition((p) => clamp(p - 5));
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      setPosition((p) => clamp(p + 5));
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative h-[520px] w-full touch-none overflow-hidden select-none md:aspect-video md:h-auto"
      style={{ borderRadius: '28px' }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
    >
      {/* Base layer: owned brand experience (after) */}
      <div className="absolute inset-0" aria-hidden="true">
        <OwnedWebsiteMockup />
      </div>

      {/* Overlay: marketplace listing (before), clipped left of the divider */}
      <div
        className="absolute inset-0"
        aria-hidden="true"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <MarketplaceMockup />
      </div>

      {/* Layer labels */}
      <div
        className="pointer-events-none absolute top-4 left-4 z-10 overflow-hidden rounded-xl border border-[rgba(245,247,250,0.14)] px-4 py-3 transition-opacity duration-300 md:top-5 md:left-5"
        style={{
          background: 'rgba(3,6,9,.78)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          opacity: position < 18 ? 0 : 1,
        }}
      >
        <p className="font-mono text-[0.58rem] font-medium tracking-[0.26em] text-[#378ADD]">
          MARKETPLACE LISTING
        </p>
        <p className="mt-1 max-w-[240px] text-[12px] leading-[1.55] text-[rgba(245,247,250,0.72)]">
          Standard structure. Limited story. Platform-owned journey.
        </p>
      </div>

      <div
        className="pointer-events-none absolute right-4 bottom-4 z-10 overflow-hidden rounded-xl border border-[rgba(245,247,250,0.14)] px-4 py-3 text-right transition-opacity duration-300 md:right-5 md:bottom-5"
        style={{
          background: 'rgba(3,6,9,.78)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          opacity: position > 82 ? 0 : 1,
        }}
      >
        <p className="font-mono text-[0.58rem] font-medium tracking-[0.26em] text-[#D85A30]">
          OWNED BRAND EXPERIENCE
        </p>
        <p className="mt-1 ml-auto max-w-[250px] text-[12px] leading-[1.55] text-[rgba(245,247,250,0.72)]">
          Your catalog, campaign, story, and customer journey in one official website.
        </p>
      </div>

      {/* Divider line + handle */}
      <div
        className="absolute top-0 bottom-0 z-20 w-px -translate-x-1/2 bg-[#F5F7FA]"
        style={{
          left: `${position}%`,
          boxShadow: '0 0 24px rgba(55,138,221,0.5), 0 0 60px rgba(216,90,48,0.25)',
        }}
        aria-hidden="true"
      />
      <div
        role="slider"
        tabIndex={0}
        aria-label="Compare marketplace page and owned website experience"
        aria-valuemin={MIN}
        aria-valuemax={MAX}
        aria-valuenow={Math.round(position)}
        onKeyDown={onHandleKeyDown}
        className="absolute top-1/2 z-30 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize items-center justify-center rounded-full bg-[#F5F7FA] text-[#030609] outline-offset-4 focus-visible:outline-2 focus-visible:outline-[#378ADD]"
        style={{
          left: `${position}%`,
          boxShadow:
            '0 6px 24px rgba(0,0,0,0.45), 0 0 34px rgba(55,138,221,0.45), 0 0 60px rgba(216,90,48,0.2)',
        }}
      >
        <GripVertical size={18} strokeWidth={2} aria-hidden="true" />
      </div>
    </div>
  );
}
