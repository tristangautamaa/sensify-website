import {
  ArrowLeftRight,
  BookOpen,
  PackageSearch,
  Sparkles,
  Tags,
  Truck,
  Wallet,
} from 'lucide-react';

// Consumer-facing assistance modules, mirroring what the assistant actually
// covers: recommendations by need and budget, comparisons, price and promo
// questions, usage and care, payment paths, and order/shipping questions.
const PREVIEW_CARDS = [
  { icon: PackageSearch, title: 'Recommendations', note: 'By need and budget' },
  { icon: ArrowLeftRight, title: 'Compare products', note: 'Differences at a glance' },
  { icon: Tags, title: 'Price & promos', note: 'Prices, vouchers, stock' },
  { icon: BookOpen, title: 'Usage & care', note: 'How to use and maintain' },
  { icon: Wallet, title: 'Payment options', note: 'From QRIS to credit card' },
  { icon: Truck, title: 'Orders & shipping', note: 'Delivery, tracking, returns' },
];

const FLOW_ITEMS = [
  'Understand customer intent',
  'Recommend relevant products',
  'Explain differences clearly',
  'Answer payment, shipping, and order questions',
  'Keep the journey on your website',
];

/**
 * Fake customer-guide console shown beside the assistant chat —
 * a static mock of an AI-guided shopping session, no real data.
 */
export default function SensifySitePreview() {
  return (
    <div className="liquid-glass flex h-full flex-col rounded-2xl">
      {/* Console top nav */}
      <div className="flex items-center justify-between gap-3 border-b border-[rgba(255,255,255,0.08)] p-4">
        <p className="text-[13px] font-semibold tracking-wide text-[#F5F7FA]">Sensify® Assistant</p>
        <span className="rounded-full border border-[rgba(55,138,221,0.5)] bg-[rgba(55,138,221,0.12)] px-3 py-1 text-[0.6rem] font-semibold tracking-[0.22em] text-[#378ADD]">
          CUSTOMER GUIDE
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-4">
        <p className="font-display text-xl text-[#F5F7FA] italic">Product recommendation session</p>

        <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {PREVIEW_CARDS.map(({ icon: Icon, title, note }) => (
            <li
              key={title}
              className="flex cursor-pointer items-center gap-3 rounded-xl border border-[rgba(245,247,250,0.1)] bg-[rgba(245,247,250,0.05)] px-3 py-2.5 transition-[transform,border-color,background-color,box-shadow] duration-[180ms] ease-out hover:-translate-y-[2px] hover:border-[rgba(55,138,221,0.42)] hover:bg-[rgba(245,247,250,0.08)] hover:shadow-[0_14px_36px_rgba(0,0,0,0.22),0_0_0_1px_rgba(216,90,48,0.10)] active:translate-y-0"
            >
              <Icon size={15} strokeWidth={2.25} className="shrink-0 text-[#378ADD]" aria-hidden="true" />
              <div className="min-w-0">
                <p className="truncate text-[12px] font-medium text-[rgba(245,247,250,0.92)]">
                  {title}
                </p>
                <p className="truncate text-[10.5px] text-[rgba(245,247,250,0.5)]">{note}</p>
              </div>
            </li>
          ))}
        </ul>

        {/* AI-guided shopping flow */}
        <div className="mt-auto rounded-xl border border-[rgba(216,90,48,0.35)] bg-[rgba(216,90,48,0.08)] p-3.5">
          <p className="mb-2 flex items-center gap-2 text-[0.62rem] font-semibold tracking-[0.24em] text-[#D85A30]">
            <Sparkles size={13} strokeWidth={2.5} aria-hidden="true" />
            AI-GUIDED SHOPPING FLOW
          </p>
          <ul className="space-y-1.5">
            {FLOW_ITEMS.map((item) => (
              <li
                key={item}
                className="flex items-center gap-2 text-[11.5px] text-[rgba(245,247,250,0.78)]"
              >
                <span className="h-1 w-1 shrink-0 rounded-full bg-[#D85A30]" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
