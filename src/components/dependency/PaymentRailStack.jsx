import { useEffect, useRef, useState } from 'react';

/**
 * Layered "payment rail" stack — premium alternative to a spinning carousel.
 *
 * Five payment-method cards share one centered rail: the active card sits
 * front and level; the queue recedes down-right, the just-served cards drift
 * up-left. Every ~2.8s the front card changes and everything glides one slot
 * with CSS transitions (one React state tick per cycle, no per-frame
 * renders). A light rAF loop handles hover parallax only.
 *
 * Reduced motion: no cycling, static fanned stack. Cycling also pauses
 * while the section is off-screen.
 *
 * Generic payment rails for an owned checkout — no card numbers, no bank
 * branding, no chips.
 */
const PAYMENT_CARDS = [
  { id: 'qris', name: 'QRIS', desc: 'Customer scans and pays through familiar Indonesian checkout behavior.', tag: 'SCAN PAYMENT', strip: '#378ADD' },
  { id: 'virtual-account', name: 'Virtual Account', desc: 'Give customers a structured transfer path beyond marketplace checkout.', tag: 'BANK TRANSFER', strip: '#378ADD' },
  { id: 'e-wallet', name: 'E-wallet', desc: 'Keep mobile-first customers moving with familiar wallet payment flows.', tag: 'MOBILE CHECKOUT', strip: '#D85A30' },
  { id: 'card-payment', name: 'Card Payment', desc: 'Support credit and debit card payment paths when the brand is ready.', tag: 'DIRECT PAYMENT', strip: '#F5F7FA' },
  { id: 'assisted-checkout', name: 'Assisted Checkout', desc: 'Let customers ask, confirm, and complete orders with human assistance.', tag: 'WHATSAPP SUPPORT', strip: '#D85A30' },
];

const COUNT = PAYMENT_CARDS.length;
const CYCLE_MS = 2800;

/* Slot layout by distance from the active card: 0 = front center,
   1-2 = queue receding down-right, 3-4 = served cards drifting up-left.
   Back cards stay nearly sharp (blur <= 0.2px) so the stack never looks muddy. */
const SLOTS = [
  { x: 0, y: 0, z: 80, scale: 1, rotate: -1, opacity: 1, blur: 0, zIndex: 5 },
  { x: 34, y: 46, z: 40, scale: 0.96, rotate: 3, opacity: 0.72, blur: 0, zIndex: 4 },
  { x: 68, y: 92, z: 10, scale: 0.9, rotate: 6, opacity: 0.44, blur: 0.2, zIndex: 3 },
  { x: -34, y: -46, z: 20, scale: 0.93, rotate: -5, opacity: 0.6, blur: 0, zIndex: 2 },
  { x: -68, y: -92, z: 0, scale: 0.88, rotate: -8, opacity: 0.36, blur: 0.2, zIndex: 1 },
];

const CARD_BACKGROUND = `radial-gradient(circle at 12% 18%, rgba(55,138,221,.24), transparent 34%),
  radial-gradient(circle at 86% 72%, rgba(216,90,48,.18), transparent 30%),
  linear-gradient(135deg, rgba(245,247,250,.105), rgba(245,247,250,.035)),
  #07111C`;

export default function PaymentRailStack() {
  const wrapRef = useRef(null);
  const stageRef = useRef(null);
  const [active, setActive] = useState(0);
  const [reduced, setReduced] = useState(false);

  // Cycle the front card while visible; freeze for reduced motion.
  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return undefined;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let intervalId = 0;
    let visible = false;

    const sync = () => {
      setReduced(reducedMotion.matches);
      window.clearInterval(intervalId);
      if (!reducedMotion.matches && visible) {
        intervalId = window.setInterval(() => {
          setActive((a) => (a + 1) % COUNT);
        }, CYCLE_MS);
      }
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        sync();
      },
      { threshold: 0.2 }
    );

    io.observe(wrap);
    reducedMotion.addEventListener('change', sync);

    return () => {
      window.clearInterval(intervalId);
      io.disconnect();
      reducedMotion.removeEventListener('change', sync);
    };
  }, []);

  // Subtle hover parallax tilt on the whole stage (rAF-lerped, DOM writes only).
  useEffect(() => {
    const wrap = wrapRef.current;
    const stage = stageRef.current;
    if (!wrap || !stage) return undefined;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let rafId = 0;
    let running = false;
    const tilt = { x: 0, y: 0, targetX: 0, targetY: 0 };

    const frame = () => {
      tilt.x += (tilt.targetX - tilt.x) * 0.08;
      tilt.y += (tilt.targetY - tilt.y) * 0.08;
      stage.style.transform = `rotateX(${tilt.x.toFixed(2)}deg) rotateY(${tilt.y.toFixed(2)}deg)`;
      if (Math.abs(tilt.x - tilt.targetX) < 0.01 && Math.abs(tilt.y - tilt.targetY) < 0.01) {
        running = false;
        return;
      }
      rafId = requestAnimationFrame(frame);
    };

    const kick = () => {
      if (running) return;
      running = true;
      rafId = requestAnimationFrame(frame);
    };

    const onPointerMove = (event) => {
      if (reducedMotion.matches) return;
      const rect = wrap.getBoundingClientRect();
      const nx = (event.clientX - rect.left) / rect.width - 0.5;
      const ny = (event.clientY - rect.top) / rect.height - 0.5;
      tilt.targetY = nx * 6;
      tilt.targetX = ny * -4;
      kick();
    };

    const onPointerLeave = () => {
      tilt.targetX = 0;
      tilt.targetY = 0;
      kick();
    };

    wrap.addEventListener('pointermove', onPointerMove);
    wrap.addEventListener('pointerleave', onPointerLeave);

    return () => {
      cancelAnimationFrame(rafId);
      wrap.removeEventListener('pointermove', onPointerMove);
      wrap.removeEventListener('pointerleave', onPointerLeave);
    };
  }, []);

  return (
    <div className="flex flex-col items-center gap-8">
      <div
        ref={wrapRef}
        className="relative flex h-[420px] w-full max-w-[560px] items-center justify-center md:h-[480px]"
        style={{ perspective: '1500px' }}
        role="img"
        aria-label="Layered stack of payment methods supported on a Sensify owned website: QRIS, virtual account, e-wallet, card payment, and WhatsApp assisted checkout."
      >
        <div
          ref={stageRef}
          className="relative h-full w-full"
          style={{ transformStyle: 'preserve-3d' }}
          aria-hidden="true"
        >
          {PAYMENT_CARDS.map((card, index) => {
            const rel = reduced
              ? Math.min(index, SLOTS.length - 1)
              : (index - active + COUNT) % COUNT;
            const slot = SLOTS[rel];
            return (
              <div
                key={card.id}
                className="absolute top-1/2 left-1/2 w-[clamp(280px,34vw,460px)]"
                style={{
                  zIndex: slot.zIndex,
                  opacity: reduced ? Math.max(slot.opacity, 0.3) : slot.opacity,
                  transform: `translate(-50%, -50%) translate3d(${slot.x}px, ${slot.y}px, ${slot.z}px) scale(${slot.scale}) rotate(${slot.rotate}deg)`,
                  filter: slot.blur ? `blur(${slot.blur}px)` : 'none',
                  transition: reduced
                    ? 'none'
                    : 'transform 1.15s cubic-bezier(0.22, 1, 0.36, 1), opacity 1.15s cubic-bezier(0.22, 1, 0.36, 1), filter 1.15s ease',
                  willChange: 'transform, opacity',
                }}
              >
                {/* Flex column keeps text clear of every decorative element:
                    tag row top, title block middle, rail line bottom. */}
                <div
                  className="relative flex w-full flex-col justify-between gap-7 overflow-hidden"
                  style={{
                    minHeight: 'clamp(180px, 21vw, 260px)',
                    borderRadius: '32px',
                    padding: 'clamp(22px, 2.4vw, 34px)',
                    background: CARD_BACKGROUND,
                    color: '#F5F7FA',
                    border: '1px solid rgba(245,247,250,.14)',
                    boxShadow: '0 30px 90px rgba(0,0,0,.45), inset 0 1px 0 rgba(255,255,255,.12)',
                  }}
                >
                  {/* Abstract concentric arcs — background only, low opacity,
                      kept in the top-right corner away from the text column. */}
                  <div className="pointer-events-none absolute inset-0" aria-hidden="true">
                    <div
                      className="absolute -top-14 -right-14 h-36 w-36 rounded-full border"
                      style={{ borderColor: 'rgba(245,247,250,0.4)', opacity: 0.16 }}
                    />
                    <div
                      className="absolute -top-8 -right-24 h-48 w-48 rounded-full border"
                      style={{ borderColor: 'rgba(245,247,250,0.4)', opacity: 0.09 }}
                    />
                  </div>

                  <div className="relative flex items-start justify-between gap-3">
                    <span className="font-mono rounded-full border border-[rgba(245,247,250,0.22)] px-2.5 py-1 text-[0.55rem] font-medium tracking-[0.18em] text-[rgba(245,247,250,0.72)]">
                      {card.tag}
                    </span>
                    <span className="font-mono pt-1 text-[0.55rem] tracking-[0.24em] text-[rgba(245,247,250,0.5)]">
                      SENSIFY PAY LAYER
                    </span>
                  </div>

                  <div className="relative">
                    <p
                      className="font-display m-0"
                      style={{
                        fontSize: 'clamp(1.8rem, 3vw, 3rem)',
                        lineHeight: 0.95,
                        letterSpacing: '-0.055em',
                      }}
                    >
                      {card.name}
                    </p>
                    <p
                      className="mt-2.5"
                      style={{ fontSize: '0.95rem', lineHeight: 1.45, color: 'rgba(245,247,250,.68)' }}
                    >
                      {card.desc}
                    </p>
                  </div>

                  {/* Decorative rail line — its own bottom row, never under text */}
                  <div
                    aria-hidden="true"
                    className="relative h-px w-full"
                    style={{
                      background: `linear-gradient(90deg, rgba(245,247,250,.12), ${card.strip}, rgba(245,247,250,.04))`,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <p className="font-mono text-[0.68rem] tracking-[0.22em] text-[rgba(245,247,250,0.48)] uppercase">
        Marketplace convenience, owned-channel control.
      </p>
    </div>
  );
}
