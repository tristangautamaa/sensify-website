import { ShoppingBag, Sparkles } from 'lucide-react';

/**
 * "After" layer: a finished premium DTC brand website for the fictional
 * "Studio Label®" — editorial nav, campaign hero, price + CTA, payment
 * trust row, and product story cards. A customer-facing storefront, not a
 * dashboard. Presentational only; the parent slider handles aria.
 *
 * Campaign photo: uses /assets/ownership/product-owned.jpg when the asset
 * exists, otherwise the CSS campaign-shot fallback underneath shows.
 */
const NAV_LINKS = ['Collection', 'Story', 'Fit Guide', 'Journal'];
const TRUST_ITEMS = ['QRIS', 'Virtual Account', 'E-Wallet', 'Cards', 'WhatsApp support'];
const STORY_CARDS = [
  { title: 'Breathable cotton blend', dot: '#378ADD' },
  { title: 'Relaxed structured fit', dot: '#D85A30' },
  { title: 'Easy daily layering', dot: '#378ADD' },
];

function CampaignVisual() {
  return (
    <div
      className="relative h-full w-full overflow-hidden"
      style={{
        background:
          'radial-gradient(70% 55% at 50% 18%, rgba(55,138,221,0.32), transparent 62%), radial-gradient(60% 50% at 85% 95%, rgba(216,90,48,0.3), transparent 60%), linear-gradient(150deg, #0C447C 0%, #07111C 58%, #1a1410 100%)',
      }}
    >
      {/* CSS campaign shot: the overshirt lit warm against the gradient */}
      <div
        className="absolute top-1/2 left-1/2 h-[64%] w-[54%] -translate-x-1/2 -translate-y-[46%]"
        style={{
          borderRadius: '16% 16% 20% 20% / 10% 10% 14% 14%',
          background: 'linear-gradient(160deg, #3d5472 0%, #263850 45%, #131e2c 100%)',
          boxShadow:
            '0 30px 60px rgba(0,0,0,0.5), 0 0 60px rgba(216,90,48,0.18), inset 0 1px 0 rgba(255,255,255,0.16)',
        }}
      >
        <div
          className="absolute top-0 left-1/2 h-[14%] w-[38%] -translate-x-1/2"
          style={{ borderRadius: '0 0 50% 50%', background: 'linear-gradient(#0e1722, #1a2939)' }}
        />
        <div className="absolute top-[12%] bottom-[6%] left-1/2 w-px -translate-x-1/2 bg-[rgba(245,247,250,0.18)]" />
        <div className="absolute top-[24%] left-[16%] h-[13%] w-[22%] rounded-sm border border-[rgba(245,247,250,0.2)]" />
        <div className="absolute top-[24%] right-[16%] h-[13%] w-[22%] rounded-sm border border-[rgba(245,247,250,0.2)]" />
      </div>
      {/* Optional real asset on top of the CSS fallback */}
      <img
        src="/assets/ownership/product-owned.jpg"
        alt=""
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover"
        onError={(e) => {
          e.currentTarget.style.display = 'none';
        }}
      />
      <span className="font-mono absolute bottom-3 left-3 text-[7.5px] tracking-[0.24em] text-[rgba(245,247,250,0.55)] md:text-[8.5px]">
        CAMPAIGN 01 — THE OVERSHIRT
      </span>
    </div>
  );
}

export default function OwnedBrandWebsite() {
  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden bg-[#050A12] text-[#F5F7FA]">
      <div
        className="absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(70% 55% at 80% 10%, rgba(55,138,221,0.16), transparent 60%), radial-gradient(45% 40% at 8% 90%, rgba(216,90,48,0.1), transparent 62%)',
        }}
      />

      {/* Brand nav */}
      <div className="relative flex shrink-0 items-center justify-between border-b border-[rgba(245,247,250,0.08)] px-4 py-2.5 md:px-8 md:py-3.5">
        <span className="font-display text-[12px] font-semibold tracking-tight md:text-[14px]">
          Studio Label<sup className="text-[0.6em] text-[#D85A30]">®</sup>
        </span>
        <div className="hidden gap-5 text-[9px] text-[rgba(245,247,250,0.62)] md:flex md:text-[10px]">
          {NAV_LINKS.map((link) => (
            <span key={link}>{link}</span>
          ))}
        </div>
        <span className="flex items-center gap-1.5 text-[9px] text-[rgba(245,247,250,0.75)] md:text-[10px]">
          <ShoppingBag size={11} aria-hidden="true" />
          Cart
          <span className="flex h-3 w-3 items-center justify-center rounded-full bg-[#D85A30] text-[6.5px] font-bold text-white">
            1
          </span>
        </span>
      </div>

      {/* Campaign hero */}
      <div className="relative grid min-h-0 flex-1 grid-cols-1 gap-4 px-4 py-3 md:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] md:items-stretch md:gap-6 md:px-8 md:py-4">
        <div className="flex min-h-0 flex-col justify-center">
          <p className="font-mono text-[7.5px] font-medium tracking-[0.32em] text-[#378ADD] md:text-[9px]">
            NEW COLLECTION — EVERYDAY UTILITY
          </p>
          <p className="font-display mt-2 max-w-[16ch] text-[19px] leading-[1.04] md:mt-3 md:text-[30px] lg:text-[36px]">
            Daily pieces, built for <em>repeat wear.</em>
          </p>
          <p className="mt-1.5 max-w-[40ch] text-[9px] leading-[1.6] text-[rgba(245,247,250,0.66)] md:mt-2.5 md:text-[11px]">
            A premium overshirt designed for workdays, weekends, and everything in between.
          </p>
          <p className="font-mono mt-2 text-[11px] font-medium text-[#F5F7FA] md:mt-3 md:text-[14px]">
            Rp349.000
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-2 md:mt-3.5">
            <span className="rounded-full bg-[#D85A30] px-3.5 py-1.5 text-[8.5px] font-bold text-[#F5F7FA] md:px-5 md:py-2 md:text-[10.5px]">
              Shop the overshirt
            </span>
            <span className="flex items-center gap-1.5 rounded-full border border-[rgba(245,247,250,0.24)] px-3.5 py-1.5 text-[8.5px] font-semibold text-[rgba(245,247,250,0.85)] md:px-4 md:py-2 md:text-[10.5px]">
              <Sparkles size={9} className="text-[#378ADD]" aria-hidden="true" />
              Ask Sensify Assistant
            </span>
          </div>
          {/* Payment / trust row */}
          <div className="mt-2.5 flex flex-wrap gap-1.5 md:mt-4">
            {TRUST_ITEMS.map((item) => (
              <span
                key={item}
                className="font-mono rounded-sm border border-[rgba(245,247,250,0.14)] bg-[rgba(245,247,250,0.04)] px-1.5 py-0.5 text-[6.5px] tracking-[0.12em] text-[rgba(245,247,250,0.6)] uppercase md:px-2 md:text-[7.5px]"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Campaign visual */}
        <div className="hidden overflow-hidden rounded-2xl border border-[rgba(245,247,250,0.12)] md:block">
          <CampaignVisual />
        </div>
      </div>

      {/* Product story strip */}
      <div className="relative shrink-0 px-4 pb-3 md:px-8 md:pb-4">
        <p className="font-mono mb-1.5 text-[6.5px] tracking-[0.26em] text-[rgba(245,247,250,0.45)] uppercase md:mb-2 md:text-[7.5px]">
          Not just a listing — a complete brand-owned product story
        </p>
        <div className="flex gap-2 md:gap-3">
          {STORY_CARDS.map((card) => (
            <div
              key={card.title}
              className="flex h-10 flex-1 items-center gap-2 rounded-xl border border-[rgba(245,247,250,0.12)] bg-[rgba(245,247,250,0.04)] px-2.5 md:h-14 md:px-3.5"
            >
              <span
                className="h-1.5 w-1.5 shrink-0 rounded-full md:h-2 md:w-2"
                style={{ background: card.dot }}
              />
              <span className="text-[7.5px] leading-tight font-medium text-[rgba(245,247,250,0.85)] md:text-[9.5px]">
                {card.title}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
