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
  { id: 'qris', name: 'QRIS', label: 'Scan-to-pay checkout', tag: 'OWNED CHECKOUT', accent: '#0C447C', strip: '#378ADD' },
  { id: 'virtual-account', name: 'Virtual Account', label: 'Bank transfer rails', tag: 'PAYMENT PATH', accent: '#378ADD', strip: '#378ADD' },
  { id: 'e-wallet', name: 'E-Wallet', label: 'Mobile-first payment flow', tag: 'FAST CHECKOUT', accent: '#D85A30', strip: '#D85A30' },
  { id: 'card-payment', name: 'Card Payment', label: 'Credit / debit ready', tag: 'DIRECT PAYMENT', accent: '#F5F7FA', strip: '#F5F7FA' },
  { id: 'assisted-checkout', name: 'Assisted Checkout', label: 'WhatsApp order support', tag: 'HUMAN FALLBACK', accent: '#07111C', strip: '#D85A30' },
];

const COUNT = PAYMENT_CARDS.length;
const CYCLE_MS = 2800;

/* Slot layout by distance from the active card: 0 = front center,
   1-2 = queue receding down-right, 3-4 = served cards drifting up-left. */
const SLOTS = [
  { x: 0, y: 0, z: 80, scale: 1, rotate: -1, opacity: 1, blur: 0, zIndex: 5 },
  { x: 32, y: 42, z: 40, scale: 0.94, rotate: 3, opacity: 0.72, blur: 0.6, zIndex: 4 },
  { x: 64, y: 84, z: 10, scale: 0.88, rotate: 6, opacity: 0.46, blur: 1.2, zIndex: 3 },
  { x: -32, y: -42, z: 20, scale: 0.91, rotate: -5, opacity: 0.58, blur: 0.9, zIndex: 2 },
  { x: -64, y: -84, z: 0, scale: 0.84, rotate: -8, opacity: 0.34, blur: 1.6, zIndex: 1 },
];

const CARD_BACKGROUND = `linear-gradient(135deg, rgba(245,247,250,.10), rgba(245,247,250,.035)),
  radial-gradient(circle at 12% 18%, rgba(55,138,221,.28), transparent 34%),
  radial-gradient(circle at 86% 72%, rgba(216,90,48,.20), transparent 30%),
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
                className="absolute top-1/2 left-1/2 h-[clamp(160px,20vw,230px)] w-[clamp(260px,34vw,440px)]"
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
                <div
                  className="relative flex h-full w-full flex-col justify-between overflow-hidden p-6"
                  style={{
                    borderRadius: '32px',
                    background: CARD_BACKGROUND,
                    color: '#F5F7FA',
                    border: '1px solid rgba(245,247,250,.14)',
                    boxShadow: '0 24px 80px rgba(0,0,0,.35), inset 0 1px 0 rgba(255,255,255,.12)',
                  }}
                >
                  {/* Accent strip + glow keyed to the payment method */}
                  <span
                    aria-hidden="true"
                    className="absolute top-6 bottom-6 left-0 w-[3px] rounded-r-full"
                    style={{
                      background: card.strip,
                      boxShadow: `0 0 22px ${card.strip}`,
                      opacity: 0.85,
                    }}
                  />

                  {/* Abstract concentric arcs — no bank branding */}
                  <div className="pointer-events-none absolute inset-0" aria-hidden="true">
                    <div
                      className="absolute -top-12 -right-12 h-36 w-36 rounded-full border"
                      style={{ borderColor: 'rgba(245,247,250,0.4)', opacity: 0.22 }}
                    />
                    <div
                      className="absolute -top-6 -right-20 h-48 w-48 rounded-full border"
                      style={{ borderColor: 'rgba(245,247,250,0.4)', opacity: 0.12 }}
                    />
                    <div
                      className="absolute bottom-8 left-6 h-px w-1/2"
                      style={{ background: 'rgba(245,247,250,0.35)' }}
                    />
                    <div
                      className="absolute bottom-[30px] left-[calc(50%+16px)] h-[5px] w-[5px] rounded-full"
                      style={{ background: card.strip }}
                    />
                  </div>

                  <div className="relative flex items-start justify-between gap-3 pl-3">
                    <span className="font-mono rounded-full border border-[rgba(245,247,250,0.22)] px-2.5 py-1 text-[0.55rem] font-medium tracking-[0.18em] text-[rgba(245,247,250,0.72)]">
                      {card.tag}
                    </span>
                    <span className="font-mono pt-1 text-[0.55rem] tracking-[0.24em] text-[rgba(245,247,250,0.5)]">
                      SENSIFY PAY LAYER
                    </span>
                  </div>

                  <div className="relative pl-3">
                    <p className="font-display text-xl md:text-2xl">{card.name}</p>
                    <p className="mt-1 text-[0.74rem] text-[rgba(245,247,250,0.62)]">{card.label}</p>
                  </div>
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
