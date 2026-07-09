import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';

/**
 * ClientLogoCarousel — calm cycling logo columns for the Selected References
 * section. Logos are distributed across columns; every `cycleInterval` each
 * column swaps to its next logo at a staggered offset, entering with a
 * blur/slide-up and exiting upward.
 *
 * Reduced motion: cycling is disabled and all logos render as a static grid.
 * Broken images are tracked in state and filtered out, so a missing file can
 * never leave an empty tile or break the layout.
 */

const TICK_MS = 100;

/** Distribute logos round-robin, then pad short columns from the full list
    so every column can cycle. Padding is phase-shifted so two columns never
    show the same logo during the same cycle step. */
function distributeLogos(logos, columnCount) {
  const columns = Array.from({ length: columnCount }, () => []);
  logos.forEach((logo, index) => {
    columns[index % columnCount].push(logo);
  });
  const maxLength = Math.max(...columns.map((column) => column.length), 0);
  columns.forEach((column, columnIndex) => {
    while (column.length > 0 && column.length < maxLength) {
      column.push(logos[(columnIndex + column.length * columnCount) % logos.length]);
    }
  });
  return columns.filter((column) => column.length > 0);
}

function useMediaFlag(query) {
  const [matches, setMatches] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(query).matches
  );
  useEffect(() => {
    const media = window.matchMedia(query);
    const onChange = () => setMatches(media.matches);
    media.addEventListener('change', onChange);
    onChange();
    return () => media.removeEventListener('change', onChange);
  }, [query]);
  return matches;
}

function LogoTile({ logo, onFail }) {
  return (
    <div className={`clc-surface ${logo.surface === 'light' ? 'is-light' : 'is-dark'}`}>
      <img
        src={logo.src}
        alt={logo.name}
        loading="lazy"
        draggable="false"
        onError={() => onFail(logo.src)}
      />
    </div>
  );
}

export default function ClientLogoCarousel({
  logos,
  columnCount = 4,
  cycleInterval = 2200,
  columnDelay = 180,
}) {
  const [time, setTime] = useState(0);
  const [failedSrcs, setFailedSrcs] = useState(() => new Set());

  const reducedMotion = useMediaFlag('(prefers-reduced-motion: reduce)');
  const isTablet = useMediaFlag('(max-width: 1023px)');
  const isMobile = useMediaFlag('(max-width: 639px)');

  const visibleLogos = useMemo(
    () => logos.filter((logo) => !failedSrcs.has(logo.src)),
    [logos, failedSrcs]
  );

  const effectiveColumns = Math.min(
    isMobile ? 2 : isTablet ? 3 : columnCount,
    Math.max(visibleLogos.length, 1)
  );

  const columns = useMemo(
    () => distributeLogos(visibleLogos, effectiveColumns),
    [visibleLogos, effectiveColumns]
  );

  useEffect(() => {
    if (reducedMotion) return undefined;
    const interval = window.setInterval(() => {
      setTime((current) => current + TICK_MS);
    }, TICK_MS);
    return () => window.clearInterval(interval);
  }, [reducedMotion]);

  const markFailed = (src) => {
    setFailedSrcs((current) => {
      if (current.has(src)) return current;
      const next = new Set(current);
      next.add(src);
      return next;
    });
  };

  if (visibleLogos.length === 0) return null;

  // Reduced motion: static grid of every logo, no cycling.
  if (reducedMotion) {
    return (
      <div className="clc-static-grid">
        {visibleLogos.map((logo) => (
          <div key={logo.src} className="clc-item">
            <LogoTile logo={logo} onFail={markFailed} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="clc-columns">
      {columns.map((column, columnIndex) => {
        const step = Math.floor((time + columnIndex * columnDelay) / cycleInterval);
        const activeIndex = step % column.length;
        const activeLogo = column[activeIndex];
        return (
          <div key={columnIndex} className="clc-column">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div
                key={`${activeIndex}-${activeLogo.src}`}
                className="clc-item"
                initial={{ y: 26, opacity: 0, filter: 'blur(8px)' }}
                animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                exit={{ y: -26, opacity: 0, filter: 'blur(8px)' }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              >
                <LogoTile logo={activeLogo} onFail={markFailed} />
              </motion.div>
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
