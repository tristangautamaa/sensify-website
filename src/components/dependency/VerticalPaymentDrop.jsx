import { useEffect, useRef, useState } from 'react';
import './VerticalPaymentDrop.css';

/**
 * VerticalPaymentDrop — premium vertical "card drop" for the Dependency
 * Reduction section.
 *
 * Payment cards descend continuously through a 3D scene: each card enters
 * blurred/dimmed from the top, sharpens into focus at center, then recedes
 * out the bottom and wraps back to the top. One rAF loop drives a shared
 * `progress` value; every card's transform is derived from its wrapped
 * distance to that progress and written straight to the DOM (no per-frame
 * React renders). A smoothstep on the fractional progress gives each card a
 * brief dwell at center.
 *
 * Reduced motion: the loop is disabled and a static stacked layout renders.
 * The loop also pauses while the section is off-screen.
 *
 * No official payment-provider branding is bundled. Cards render designed
 * generic fallbacks; drop approved assets into /public/assets/payments/ and
 * they are picked up automatically (missing files hide gracefully).
 */

// TODO: Replace payment fallback surfaces with approved brand/payment assets.
// Suggested files:
// /assets/payments/bca-va-card.png
// /assets/payments/gopay-card.png
// /assets/payments/qris-card.png
// /assets/payments/card-payment.png
// /assets/payments/whatsapp-checkout.png
// Optional logos:
// /assets/payments/bca-logo.svg
// /assets/payments/gopay-logo.svg
// /assets/payments/qris-logo.svg
// /assets/payments/visa-mastercard.svg
// /assets/payments/whatsapp-logo.svg
const PAYMENT_CARDS = [
  {
    id: 'bca-va',
    method: 'BCA Virtual Account',
    type: 'BANK TRANSFER',
    description:
      'A structured bank transfer path for customers who prefer familiar account-based payment.',
    asset: '/assets/payments/bca-va-card.png',
    logo: '/assets/payments/bca-logo.svg',
    accent: '#378ADD',
    fallbackGradient: 'linear-gradient(135deg, #0C447C 0%, #07111C 55%, #378ADD 100%)',
  },
  {
    id: 'qris',
    method: 'QRIS Payment',
    type: 'SCAN PAYMENT',
    description: 'A scan-to-pay flow designed for Indonesian mobile checkout behavior.',
    asset: '/assets/payments/qris-card.png',
    logo: '/assets/payments/qris-logo.svg',
    accent: '#F5F7FA',
    fallbackGradient: 'linear-gradient(135deg, #F5F7FA 0%, #DCE6F2 45%, #378ADD 100%)',
  },
  {
    id: 'gopay',
    method: 'GoPay / E-wallet',
    type: 'MOBILE CHECKOUT',
    description: 'A mobile-first wallet payment path for customers who want fast checkout.',
    asset: '/assets/payments/gopay-card.png',
    logo: '/assets/payments/gopay-logo.svg',
    accent: '#00AEEF',
    fallbackGradient: 'linear-gradient(135deg, #00AEEF 0%, #0C447C 58%, #07111C 100%)',
  },
  {
    id: 'card',
    method: 'Credit / Debit Card',
    type: 'DIRECT PAYMENT',
    description: 'A card payment option for brands ready to support direct checkout.',
    asset: '/assets/payments/card-payment.png',
    logo: '/assets/payments/visa-mastercard.svg',
    accent: '#D85A30',
    fallbackGradient: 'linear-gradient(135deg, #D85A30 0%, #07111C 60%, #0C447C 100%)',
  },
  {
    id: 'assisted',
    method: 'Assisted Checkout',
    type: 'WHATSAPP SUPPORT',
    description: 'A human-assisted order path for customers who want confirmation before purchase.',
    asset: '/assets/payments/whatsapp-checkout.png',
    logo: '/assets/payments/whatsapp-logo.svg',
    accent: '#25D366',
    fallbackGradient: 'linear-gradient(135deg, #07111C 0%, #0C447C 54%, #25D366 100%)',
  },
];

const COUNT = PAYMENT_CARDS.length;
const SPEED_PER_FRAME = 0.0024; // progress units per 60fps frame — slow, premium

/* Vertical drop keyframes, keyed by signed distance from center:
   positive = above center (waiting to drop in), negative = below (already
   served, receding out). The ±half-wrap ends are fully transparent so the
   top/bottom wrap never pops.

   Tuned so cards hand off instead of colliding: vertical spacing exceeds
   the card height at every point of the transition, opacity falls sharply
   past |offset| 0.5, and blur rises with distance — the outgoing card is a
   ghost before the incoming one reaches center. */
const KEYFRAMES = [
  { o: -2.4, y: 460, z: -120, s: 0.68, op: 0, rx: -34, rz: 8, blur: 8 },
  { o: -1.6, y: 372, z: -60, s: 0.74, op: 0.07, rx: -26, rz: 6.5, blur: 5.5 },
  { o: -1, y: 260, z: 20, s: 0.84, op: 0.28, rx: -18, rz: 5, blur: 3 },
  { o: -0.5, y: 138, z: 100, s: 0.92, op: 0.42, rx: -9, rz: 1.5, blur: 1.6 },
  { o: 0, y: 0, z: 180, s: 1, op: 1, rx: 0, rz: -2, blur: 0 },
  { o: 0.5, y: -138, z: 100, s: 0.92, op: 0.42, rx: 9, rz: -4, blur: 1.6 },
  { o: 1, y: -260, z: 20, s: 0.84, op: 0.28, rx: 18, rz: -6, blur: 3 },
  { o: 1.6, y: -372, z: -60, s: 0.74, op: 0.07, rx: 26, rz: -7, blur: 5.5 },
  { o: 2.4, y: -460, z: -120, s: 0.68, op: 0, rx: 34, rz: -8, blur: 8 },
];

const lerp = (a, b, t) => a + (b - a) * t;
const smoothstep = (t) => t * t * (3 - 2 * t);

/** Interpolate the keyframe track at a signed offset. */
function sampleTrack(offset) {
  const first = KEYFRAMES[0];
  const last = KEYFRAMES[KEYFRAMES.length - 1];
  if (offset <= first.o) return first;
  if (offset >= last.o) return last;
  for (let i = 0; i < KEYFRAMES.length - 1; i += 1) {
    const a = KEYFRAMES[i];
    const b = KEYFRAMES[i + 1];
    if (offset >= a.o && offset <= b.o) {
      const t = (offset - a.o) / (b.o - a.o);
      return {
        y: lerp(a.y, b.y, t),
        z: lerp(a.z, b.z, t),
        s: lerp(a.s, b.s, t),
        op: lerp(a.op, b.op, t),
        rx: lerp(a.rx, b.rx, t),
        rz: lerp(a.rz, b.rz, t),
        blur: lerp(a.blur, b.blur, t),
      };
    }
  }
  return last;
}

/** Signed wrapped distance of card `index` from the current progress. */
function wrappedOffset(index, progress) {
  let o = (((index - progress) % COUNT) + COUNT) % COUNT;
  if (o > COUNT / 2) o -= COUNT;
  return o;
}

/** Write one card's transform/opacity/filter for a given offset + tilt. */
function applyCardStyle(el, offset, tilt) {
  const p = sampleTrack(offset);
  // Near-center cards respond to the pointer; far cards barely move.
  const focus = Math.max(0, 1 - Math.min(Math.abs(offset), 1));
  const ry = tilt.y * 6 * (0.2 + 0.8 * focus);
  const rxTilt = tilt.x * -4 * (0.2 + 0.8 * focus);
  el.style.transform =
    `translate(-50%, -50%) translate3d(0px, ${p.y.toFixed(1)}px, ${p.z.toFixed(1)}px) ` +
    `rotateX(${(p.rx + rxTilt).toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) ` +
    `rotateZ(${p.rz.toFixed(2)}deg) scale(${p.s.toFixed(3)})`;
  el.style.opacity = p.op.toFixed(3);
  el.style.filter = p.blur > 0.05 ? `blur(${p.blur.toFixed(2)}px)` : 'none';
  el.style.zIndex = String(Math.round((COUNT - Math.abs(offset)) * 10));
}

export default function VerticalPaymentDrop() {
  const wrapRef = useRef(null);
  const cardRefs = useRef([]);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return undefined;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const progress = { current: 0 };
    const tilt = { x: 0, y: 0, targetX: 0, targetY: 0 };
    let rafId = 0;
    let running = false;
    let visible = false;
    let lastTime = 0;

    const renderCards = () => {
      // Smoothstep on the fractional part = brief dwell while a card
      // holds center, then a smooth hand-off to the next card.
      const whole = Math.floor(progress.current);
      const shaped = whole + smoothstep(progress.current - whole);
      cardRefs.current.forEach((el, index) => {
        if (!el) return;
        applyCardStyle(el, wrappedOffset(index, shaped), tilt);
      });
    };

    const frame = (time) => {
      if (!running) return;
      const dt = lastTime ? Math.min(time - lastTime, 48) : 16.7;
      lastTime = time;
      progress.current += SPEED_PER_FRAME * (dt / 16.7);
      tilt.x += (tilt.targetX - tilt.x) * 0.06;
      tilt.y += (tilt.targetY - tilt.y) * 0.06;
      renderCards();
      rafId = requestAnimationFrame(frame);
    };

    const sync = () => {
      setReduced(reducedMotion.matches);
      const shouldRun = visible && !reducedMotion.matches;
      if (shouldRun && !running) {
        running = true;
        lastTime = 0;
        rafId = requestAnimationFrame(frame);
      } else if (!shouldRun && running) {
        running = false;
        cancelAnimationFrame(rafId);
      }
      if (reducedMotion.matches) {
        // Static stacked layout — clear the rAF-driven inline styles.
        cardRefs.current.forEach((el) => {
          if (!el) return;
          el.style.transform = '';
          el.style.opacity = '';
          el.style.filter = '';
          el.style.zIndex = '';
        });
      } else {
        renderCards();
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
      const rect = wrap.getBoundingClientRect();
      tilt.targetY = (event.clientX - rect.left) / rect.width - 0.5;
      tilt.targetX = (event.clientY - rect.top) / rect.height - 0.5;
    };
    const onPointerLeave = () => {
      tilt.targetX = 0;
      tilt.targetY = 0;
    };

    io.observe(wrap);
    reducedMotion.addEventListener('change', sync);
    wrap.addEventListener('pointermove', onPointerMove);
    wrap.addEventListener('pointerleave', onPointerLeave);
    sync();

    return () => {
      running = false;
      cancelAnimationFrame(rafId);
      io.disconnect();
      reducedMotion.removeEventListener('change', sync);
      wrap.removeEventListener('pointermove', onPointerMove);
      wrap.removeEventListener('pointerleave', onPointerLeave);
    };
  }, []);

  return (
    <div className="vertical-payment-drop-block">
      <div
        ref={wrapRef}
        className={`vertical-payment-drop${reduced ? ' is-static' : ''}`}
        role="img"
        aria-label="Payment method preview: BCA Virtual Account, QRIS payment, GoPay and e-wallets, credit or debit card, and WhatsApp assisted checkout descending through an owned checkout flow."
      >
        {/* Enlarged masked stage: the edge fades happen well outside the
            card area, so glows and card shadows dissolve into the section
            background with no visible rectangle. */}
        <div className="vpd-scene-mask" aria-hidden="true">
          {/* Environment glows */}
          <div className="vpd-glow vpd-glow--blue" />
          <div className="vpd-glow vpd-glow--orange" />

          <div className="vpd-scene">
            {PAYMENT_CARDS.map((card, index) => (
              <div
                key={card.id}
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                className="payment-drop-card"
                data-static-slot={reduced ? wrappedOffset(index, 0) : undefined}
              >
                <DropCardSurface card={card} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <p className="vpd-microcopy">Marketplace convenience, owned-channel control.</p>
    </div>
  );
}

/**
 * One card surface. Tries the optional local asset first; if it is missing
 * the designed generic fallback renders instead. Logos likewise degrade to
 * text-only labels. Nothing here claims official partnership — labels are
 * generic payment-method names only.
 */
function DropCardSurface({ card }) {
  const [assetOk, setAssetOk] = useState(true);
  const [logoOk, setLogoOk] = useState(true);
  const light = card.id === 'qris';

  if (assetOk) {
    return (
      <div className="vpd-surface vpd-surface--asset">
        <img
          className="vpd-asset-img"
          src={card.asset}
          alt=""
          loading="lazy"
          draggable="false"
          onError={() => setAssetOk(false)}
        />
        <div className="vpd-asset-shade" />
        <div className="vpd-asset-caption">
          <span className="vpd-pill">{card.type}</span>
          <span className="vpd-asset-method">{card.method}</span>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`vpd-surface vpd-surface--fallback${light ? ' is-light' : ''}`}
      style={{ background: card.fallbackGradient }}
    >
      <div className="vpd-overlay" />
      <div className="vpd-noise" />

      {/* Abstract decoration layer, kept clear of the text column */}
      <div className="vpd-deco">
        <span className="vpd-arc vpd-arc--1" style={{ borderColor: card.accent }} />
        <span className="vpd-arc vpd-arc--2" style={{ borderColor: card.accent }} />
        {card.id === 'bca-va' && (
          <span className="vpd-va-blocks">
            <i /><i /><i /><i />
          </span>
        )}
        {card.id === 'qris' && (
          <span className="vpd-qr">
            {Array.from({ length: 16 }, (_, i) => (
              <i key={i} className={i % 3 === 0 ? 'on' : ''} />
            ))}
          </span>
        )}
        {card.id === 'gopay' && (
          <span className="vpd-waves">
            <i /><i /><i />
          </span>
        )}
        {card.id === 'card' && <span className="vpd-chip" />}
      </div>

      <div className="vpd-row-top">
        <span className="vpd-pill">{card.type}</span>
        <span className="vpd-brand-slot">
          {logoOk ? (
            <img
              className="vpd-logo-img"
              src={card.logo}
              alt=""
              loading="lazy"
              draggable="false"
              onError={() => setLogoOk(false)}
            />
          ) : (
            <span className="vpd-layer-label">SENSIFY PAY LAYER</span>
          )}
        </span>
      </div>

      <div className="vpd-body">
        <p className="vpd-method">{card.method}</p>
        <p className="vpd-description">{card.description}</p>
      </div>

      <div
        className="vpd-rail"
        style={{
          background: `linear-gradient(90deg, transparent, ${card.accent}, transparent)`,
        }}
      />
    </div>
  );
}
