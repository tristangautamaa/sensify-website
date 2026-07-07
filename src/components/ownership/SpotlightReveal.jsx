import { useEffect, useRef } from 'react';

/**
 * Cursor-following spotlight that reveals the owned-brand layer beneath a
 * standardized marketplace-style page.
 *
 * Implementation note: the reference asset used an SVG mask over a flat
 * image. Our layers are live DOM mocks (until real assets arrive), so the
 * reveal layer sits on top and is clipped with `clip-path: circle()` —
 * identical visual result, reliable across browsers for HTML content. Six
 * trail circles follow the cursor: the lead circle is the reveal itself,
 * five decorative rings trail behind it at different lerp speeds.
 *
 * Props (per spec): imageSrc, videoSrc, fallbackMode, isPlaying, baseRadius.
 * When real assets land in public/assets/ownership/, pass imageSrc/videoSrc
 * and set fallbackMode={false}.
 */
const TRAIL_RINGS = 5;

export default function SpotlightReveal({
  imageSrc = null,
  videoSrc = null,
  fallbackMode = true,
  isPlaying = true,
  baseRadius = 500,
}) {
  const containerRef = useRef(null);
  const revealRef = useRef(null);
  const glowRef = useRef(null);
  const ringRefs = useRef([]);
  const videoRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const reveal = revealRef.current;
    const glow = glowRef.current;
    if (!container || !reveal) return undefined;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const coarsePointer = window.matchMedia('(pointer: coarse)');

    let rafId = 0;
    let running = false;
    let visible = false;
    let lastInputAt = 0;
    let driftAngle = 0;
    let rect = container.getBoundingClientRect();

    const radius = () => (coarsePointer.matches ? Math.min(300, baseRadius) : baseRadius);

    // Lead spotlight position + one lerped point per trailing ring.
    const target = { x: rect.width * 0.62, y: rect.height * 0.45 };
    const points = Array.from({ length: TRAIL_RINGS + 1 }, () => ({ ...target }));
    const speeds = [0.16, 0.12, 0.095, 0.075, 0.06, 0.048];

    const paint = () => {
      const r = radius();
      const lead = points[0];
      reveal.style.clipPath = `circle(${r}px at ${lead.x.toFixed(1)}px ${lead.y.toFixed(1)}px)`;
      if (glow) {
        glow.style.background = `radial-gradient(circle ${r * 1.12}px at ${lead.x.toFixed(1)}px ${lead.y.toFixed(1)}px, transparent ${r * 0.82}px, rgba(55,138,221,0.35) ${r * 0.96}px, transparent ${r * 1.12}px)`;
      }
      ringRefs.current.forEach((ring, i) => {
        if (!ring) return;
        const p = points[i + 1];
        const ringSize = r * (0.34 - i * 0.05);
        ring.style.width = `${ringSize * 2}px`;
        ring.style.height = `${ringSize * 2}px`;
        ring.style.transform = `translate(${(p.x - ringSize).toFixed(1)}px, ${(p.y - ringSize).toFixed(1)}px)`;
      });
    };

    const frame = (time) => {
      // Idle auto-drift on touch devices so the reveal works without hover.
      if (coarsePointer.matches && time - lastInputAt > 2600) {
        driftAngle += 0.004;
        target.x = rect.width * (0.5 + 0.3 * Math.cos(driftAngle));
        target.y = rect.height * (0.48 + 0.22 * Math.sin(driftAngle * 1.4));
      }
      points.forEach((p, i) => {
        p.x += (target.x - p.x) * speeds[i];
        p.y += (target.y - p.y) * speeds[i];
      });
      paint();
      rafId = requestAnimationFrame(frame);
    };

    const start = () => {
      if (running) return;
      running = true;
      rafId = requestAnimationFrame(frame);
    };

    const stop = () => {
      running = false;
      cancelAnimationFrame(rafId);
    };

    const sync = () => {
      rect = container.getBoundingClientRect();
      if (reducedMotion.matches) {
        // Static reveal: fixed circle on the right half, no trails.
        stop();
        points.forEach((p) => {
          p.x = rect.width * 0.68;
          p.y = rect.height * 0.5;
        });
        paint();
      } else if (visible && isPlaying) {
        start();
      } else {
        stop();
      }
    };

    const setTarget = (clientX, clientY) => {
      target.x = clientX - rect.left;
      target.y = clientY - rect.top;
      lastInputAt = performance.now();
    };

    const onPointerMove = (event) => {
      if (reducedMotion.matches) return;
      setTarget(event.clientX, event.clientY);
    };

    const onTouchMove = (event) => {
      if (reducedMotion.matches || !event.touches.length) return;
      setTarget(event.touches[0].clientX, event.touches[0].clientY);
    };

    const onResize = () => {
      rect = container.getBoundingClientRect();
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        sync();
      },
      { threshold: 0.12 }
    );

    io.observe(container);
    sync();
    paint();
    container.addEventListener('pointermove', onPointerMove);
    container.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('resize', onResize);
    reducedMotion.addEventListener('change', sync);

    return () => {
      stop();
      io.disconnect();
      container.removeEventListener('pointermove', onPointerMove);
      container.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('resize', onResize);
      reducedMotion.removeEventListener('change', sync);
    };
  }, [baseRadius, isPlaying]);

  // Pause/play the hidden-layer video with the isPlaying prop.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (isPlaying) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [isPlaying]);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden">
      {/* ----- Base layer: standardized marketplace-style page ----- */}
      <div className="absolute inset-0" aria-hidden="true">
        {!fallbackMode && imageSrc ? (
          <img src={imageSrc} alt="" className="h-full w-full object-cover" loading="lazy" />
        ) : (
          <MarketplaceMock />
        )}
      </div>

      {/* ----- Reveal layer: owned brand experience, clipped to the spotlight ----- */}
      <div ref={revealRef} className="absolute inset-0 will-change-[clip-path]" aria-hidden="true">
        {!fallbackMode && videoSrc ? (
          <video
            ref={videoRef}
            src={videoSrc}
            className="h-full w-full object-cover"
            muted
            loop
            playsInline
            preload="metadata"
          />
        ) : (
          <OwnedBrandMock />
        )}
      </div>

      {/* Soft blue edge glow around the spotlight */}
      <div
        ref={glowRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 mix-blend-screen"
      />

      {/* Trailing rings */}
      {Array.from({ length: TRAIL_RINGS }).map((_, i) => (
        <div
          key={i}
          ref={(el) => {
            ringRefs.current[i] = el;
          }}
          aria-hidden="true"
          className="pointer-events-none absolute top-0 left-0 rounded-full border border-[rgba(55,138,221,0.35)]"
          style={{ opacity: 0.5 - i * 0.08 }}
        />
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* CSS fallback layers — replace with real assets when available:      */
/*   public/assets/ownership/marketplace-page.png                      */
/*   public/assets/ownership/owned-brand-experience.mp4                */
/* ------------------------------------------------------------------ */

/** Flat, cramped, standardized product-listing look. Deliberately generic. */
function MarketplaceMock() {
  return (
    <div className="flex h-full w-full flex-col bg-[#eceff3] font-sans text-[#3a4148]">
      {/* Platform header */}
      <div className="flex items-center gap-3 border-b border-[#d7dce2] bg-white px-4 py-2.5 md:px-8">
        <div className="h-6 w-20 rounded bg-[#c3cbd4]" />
        <div className="hidden h-7 flex-1 max-w-[380px] rounded-sm border border-[#d7dce2] bg-[#f4f6f8] px-2 text-[10px] leading-7 text-[#9aa4ae] sm:block">
          Search products…
        </div>
        <div className="ml-auto flex gap-2">
          <div className="h-6 w-6 rounded bg-[#dfe4e9]" />
          <div className="h-6 w-6 rounded bg-[#dfe4e9]" />
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="px-4 py-2 text-[10px] text-[#9aa4ae] md:px-8">
        Category / Sub-category / Product name here
      </div>

      {/* Listing body */}
      <div className="grid flex-1 grid-cols-1 gap-4 px-4 pb-4 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] md:px-8">
        <div className="flex flex-col gap-2">
          <div className="flex aspect-[4/3] items-center justify-center rounded-sm border border-[#d7dce2] bg-white">
            <div className="h-1/2 w-1/2 rounded bg-[#e3e8ed]" />
          </div>
          <div className="flex gap-2">
            {[0, 1, 2, 3, 4].map((i) => (
              <div key={i} className="h-10 w-10 rounded-sm border border-[#d7dce2] bg-white" />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3 rounded-sm border border-[#d7dce2] bg-white p-4">
          <div className="h-4 w-4/5 rounded bg-[#dfe4e9]" />
          <div className="h-3 w-2/5 rounded bg-[#eceff3]" />
          <div className="h-7 w-1/3 rounded bg-[#dfe4e9]" />
          <div className="mt-1 space-y-1.5">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="flex justify-between border-b border-[#f0f2f5] pb-1.5">
                <div className="h-2.5 w-1/4 rounded bg-[#eceff3]" />
                <div className="h-2.5 w-2/5 rounded bg-[#f0f2f5]" />
              </div>
            ))}
          </div>
          <div className="mt-auto flex gap-2">
            <div className="h-9 flex-1 rounded-sm bg-[#c3cbd4]" />
            <div className="h-9 flex-1 rounded-sm bg-[#aeb8c2]" />
          </div>
          <div className="flex items-center gap-2 border-t border-[#f0f2f5] pt-2">
            <div className="h-7 w-7 rounded-full bg-[#dfe4e9]" />
            <div className="h-2.5 w-1/3 rounded bg-[#eceff3]" />
          </div>
        </div>
      </div>
    </div>
  );
}

/** Premium owned-brand website look in the Sensify palette. */
function OwnedBrandMock() {
  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden bg-[#07111C] text-[#F5F7FA]">
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(75% 60% at 78% 22%, rgba(55,138,221,0.28), transparent 60%), radial-gradient(50% 45% at 15% 85%, rgba(216,90,48,0.2), transparent 62%), radial-gradient(90% 80% at 50% 110%, rgba(12,68,124,0.4), transparent 70%)',
        }}
      />

      {/* Brand nav */}
      <div className="relative flex items-center justify-between px-6 py-5 md:px-12">
        <span className="text-sm font-semibold tracking-[0.28em]">SENSIFY DEMO BRAND</span>
        <div className="hidden gap-6 text-[11px] tracking-[0.18em] text-[rgba(245,247,250,0.6)] md:flex">
          <span>COLLECTION</span>
          <span>STORY</span>
          <span>CAMPAIGN</span>
        </div>
        <span className="rounded-full border border-[rgba(216,90,48,0.6)] px-3 py-1 text-[10px] tracking-[0.2em] text-[#D85A30]">
          OWNED
        </span>
      </div>

      {/* Editorial hero */}
      <div className="relative flex flex-1 flex-col justify-center px-6 md:px-12">
        <p className="mb-4 text-[10px] font-semibold tracking-[0.34em] text-[#378ADD]">
          THE STORY YOUR PRODUCT DESERVES
        </p>
        <p className="font-display max-w-[16ch] text-4xl leading-[1.05] md:text-6xl">
          Crafted to be <em>remembered,</em> not scrolled past.
        </p>
        <div className="mt-7 flex flex-wrap items-center gap-4">
          <span className="rounded-full bg-[#D85A30] px-6 py-2.5 text-xs font-semibold text-[#F5F7FA]">
            Explore the collection
          </span>
          <span className="text-[11px] tracking-[0.16em] text-[rgba(245,247,250,0.6)]">
            CAMPAIGN 01 — OWNED CHANNEL
          </span>
        </div>
      </div>

      {/* Editorial product strip */}
      <div className="relative flex gap-4 px-6 pb-8 md:px-12">
        {['01', '02', '03'].map((n) => (
          <div
            key={n}
            className="flex h-20 flex-1 items-end justify-between rounded-xl border border-[rgba(245,247,250,0.14)] bg-[rgba(245,247,250,0.05)] p-3 md:h-24"
          >
            <span className="text-[10px] tracking-[0.2em] text-[rgba(245,247,250,0.55)]">
              PRODUCT {n}
            </span>
            <span className="h-2 w-2 rounded-full bg-[#378ADD]" />
          </div>
        ))}
      </div>
    </div>
  );
}
