import { useEffect, useRef } from 'react';

/**
 * Continuous 3D ring of generic payment-method cards.
 *
 * No animation library — a single requestAnimationFrame loop drives a slow
 * rotation plus a mouse-parallax tilt, writing transforms straight to the
 * DOM so React never re-renders per frame. Cards get volumetric thickness
 * from a few stacked layers behind the face. The loop pauses when the
 * carousel scrolls out of view and freezes for prefers-reduced-motion.
 *
 * These are generic payment rails for an owned checkout — deliberately not
 * bank products, so no card numbers, no bank logos.
 */
const PAYMENT_CARDS = [
  {
    id: 'qris',
    name: 'QRIS',
    label: 'Instant scan payment',
    tag: 'Sensify Pay Layer',
    background: 'linear-gradient(135deg, #0C447C 0%, #082c52 70%, #07111C 100%)',
    edge: '#08325c',
    text: '#F5F7FA',
    muted: 'rgba(245,247,250,0.62)',
  },
  {
    id: 'virtual-account',
    name: 'Virtual Account',
    label: 'Bank transfer rails',
    tag: 'Owned Checkout',
    background: 'linear-gradient(135deg, #378ADD 0%, #1d5fa6 65%, #0C447C 100%)',
    edge: '#2266ab',
    text: '#F5F7FA',
    muted: 'rgba(245,247,250,0.66)',
  },
  {
    id: 'e-wallet',
    name: 'E-Wallet',
    label: 'Fast mobile checkout',
    tag: 'Sensify Pay Layer',
    background: 'linear-gradient(135deg, #D85A30 0%, #a83f1e 70%, #4a1c0e 100%)',
    edge: '#8f3519',
    text: '#F5F7FA',
    muted: 'rgba(245,247,250,0.7)',
  },
  {
    id: 'card-payment',
    name: 'Card Payment',
    label: 'Credit / debit ready',
    tag: 'Owned Checkout',
    background: 'linear-gradient(135deg, #FFFFFF 0%, #F5F7FA 55%, #d8e2ee 100%)',
    edge: '#c3cfdd',
    text: '#07111C',
    muted: 'rgba(7,17,28,0.6)',
  },
  {
    id: 'assisted-checkout',
    name: 'Assisted Checkout',
    label: 'WhatsApp order support',
    tag: 'Sensify Pay Layer',
    background: 'linear-gradient(135deg, #10202f 0%, #07111C 60%, #030609 100%)',
    edge: '#0b1826',
    text: '#F5F7FA',
    muted: 'rgba(245,247,250,0.58)',
  },
];

const THICKNESS_LAYERS = 4;
const LAYER_DEPTH = 1.3; // px per stacked layer

export default function PaymentCardCarousel() {
  const wrapRef = useRef(null);
  const stageRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    const wrap = wrapRef.current;
    const stage = stageRef.current;
    if (!wrap || !stage) return undefined;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const step = 360 / PAYMENT_CARDS.length;

    let rafId = 0;
    let running = false;
    let visible = false;
    let progress = -14;
    let lastTime = 0;
    let radius = 300;
    const tilt = { x: 0, y: 0, targetX: 0, targetY: 0 };

    const measure = () => {
      const width = wrap.getBoundingClientRect().width;
      radius = Math.min(320, Math.max(210, width * 0.34));
    };

    const layout = () => {
      stage.style.transform = `rotateX(${tilt.x.toFixed(2)}deg) rotateY(${tilt.y.toFixed(2)}deg)`;
      cardRefs.current.forEach((el, i) => {
        if (!el) return;
        const angle = progress + step * i;
        el.style.transform = `translate(-50%, -50%) rotateY(${angle.toFixed(2)}deg) translateZ(${radius}px)`;
      });
    };

    const frame = (time) => {
      if (!lastTime) lastTime = time;
      const dt = Math.min(48, time - lastTime);
      lastTime = time;
      progress += dt * 0.011; // slow continuous drift (~11deg/s)
      tilt.x += (tilt.targetX - tilt.x) * 0.06;
      tilt.y += (tilt.targetY - tilt.y) * 0.06;
      layout();
      rafId = requestAnimationFrame(frame);
    };

    const start = () => {
      if (running) return;
      running = true;
      lastTime = 0;
      rafId = requestAnimationFrame(frame);
    };

    const stop = () => {
      running = false;
      cancelAnimationFrame(rafId);
    };

    const sync = () => {
      if (reducedMotion.matches) {
        // Static fanned layout instead of motion.
        stop();
        tilt.x = -6;
        tilt.y = 0;
        layout();
      } else if (visible) {
        start();
      } else {
        stop();
      }
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        sync();
      },
      { threshold: 0.15 }
    );

    const onPointerMove = (event) => {
      if (reducedMotion.matches) return;
      const rect = wrap.getBoundingClientRect();
      const nx = (event.clientX - rect.left) / rect.width - 0.5;
      const ny = (event.clientY - rect.top) / rect.height - 0.5;
      tilt.targetY = nx * 14;
      tilt.targetX = ny * -10;
    };

    const onPointerLeave = () => {
      tilt.targetX = 0;
      tilt.targetY = 0;
    };

    measure();
    layout();
    io.observe(wrap);
    wrap.addEventListener('pointermove', onPointerMove);
    wrap.addEventListener('pointerleave', onPointerLeave);
    window.addEventListener('resize', measure);
    reducedMotion.addEventListener('change', sync);

    return () => {
      stop();
      io.disconnect();
      wrap.removeEventListener('pointermove', onPointerMove);
      wrap.removeEventListener('pointerleave', onPointerLeave);
      window.removeEventListener('resize', measure);
      reducedMotion.removeEventListener('change', sync);
    };
  }, []);

  return (
    <div className="flex flex-col items-center gap-8">
      <div
        ref={wrapRef}
        className="relative h-[360px] w-full max-w-[560px] md:h-[440px]"
        style={{ perspective: '1350px' }}
        role="img"
        aria-label="Rotating showcase of payment methods supported on a Sensify owned website: QRIS, virtual account, e-wallet, card payment, and WhatsApp assisted checkout."
      >
        <div
          ref={stageRef}
          className="absolute inset-0"
          style={{ transformStyle: 'preserve-3d' }}
          aria-hidden="true"
        >
          {PAYMENT_CARDS.map((card, index) => (
            <div
              key={card.id}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              className="absolute top-1/2 left-1/2 h-[150px] w-[240px] md:h-[175px] md:w-[280px]"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Volumetric thickness: stacked edge layers behind the face */}
              {Array.from({ length: THICKNESS_LAYERS }).map((_, depth) => (
                <div
                  key={depth}
                  className="absolute inset-0 rounded-2xl"
                  style={{
                    transform: `translateZ(${-(depth + 1) * LAYER_DEPTH}px)`,
                    background: card.edge,
                  }}
                />
              ))}

              {/* Back face (kept text-free so it never renders mirrored copy) */}
              <div
                className="absolute inset-0 overflow-hidden rounded-2xl"
                style={{
                  transform: `rotateY(180deg) translateZ(${(THICKNESS_LAYERS + 1) * LAYER_DEPTH}px)`,
                  backfaceVisibility: 'hidden',
                  background: card.background,
                }}
              >
                <div
                  className="absolute inset-0 opacity-40"
                  style={{
                    background:
                      'radial-gradient(circle at 80% 20%, rgba(255,255,255,0.18), transparent 45%), radial-gradient(circle at 15% 85%, rgba(255,255,255,0.1), transparent 40%)',
                  }}
                />
              </div>

              {/* Front face */}
              <div
                className="absolute inset-0 flex flex-col justify-between overflow-hidden rounded-2xl p-5"
                style={{
                  background: card.background,
                  color: card.text,
                  backfaceVisibility: 'hidden',
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.14)',
                }}
              >
                {/* Abstract circles + line pattern instead of bank branding */}
                <div className="pointer-events-none absolute inset-0">
                  <div
                    className="absolute -top-10 -right-10 h-32 w-32 rounded-full border"
                    style={{ borderColor: card.muted, opacity: 0.35 }}
                  />
                  <div
                    className="absolute -top-4 -right-16 h-40 w-40 rounded-full border"
                    style={{ borderColor: card.muted, opacity: 0.2 }}
                  />
                  <div
                    className="absolute bottom-8 left-5 h-px w-2/3"
                    style={{ background: card.muted, opacity: 0.35 }}
                  />
                </div>

                <div className="relative flex items-start justify-between gap-3">
                  <span
                    className="mt-1 inline-block h-2 w-2 rounded-full"
                    style={{ background: card.id === 'card-payment' ? '#D85A30' : '#F5F7FA' }}
                  />
                  <span
                    className="text-[0.58rem] font-semibold tracking-[0.22em] uppercase"
                    style={{ color: card.muted }}
                  >
                    {card.tag}
                  </span>
                </div>

                <div className="relative">
                  <p className="text-lg font-semibold tracking-tight md:text-xl">{card.name}</p>
                  <p className="mt-1 text-[0.72rem]" style={{ color: card.muted }}>
                    {card.label}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <p className="text-[0.72rem] font-medium tracking-[0.22em] text-[rgba(245,247,250,0.48)] uppercase">
        Marketplace convenience, owned-channel control.
      </p>
    </div>
  );
}
