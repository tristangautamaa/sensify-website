import {
  BarChart3,
  LayoutTemplate,
  ListChecks,
  MessageCircle,
  Package,
  Wrench,
} from 'lucide-react';

const PREVIEW_CARDS = [
  { icon: Package, title: 'Product catalog', note: '12 items queued' },
  { icon: LayoutTemplate, title: 'Landing page', note: 'Draft structure ready' },
  { icon: MessageCircle, title: 'WhatsApp CTA', note: 'Copy prepared' },
  { icon: BarChart3, title: 'Analytics note', note: 'Traffic baseline set' },
  { icon: Wrench, title: 'Maintenance queue', note: '1 request pending' },
];

const BRIEF_ITEMS = [
  'Update 12 products',
  'Create campaign hero',
  'Add payment CTA',
  'Prepare mobile layout',
  'Send to maintenance',
];

/**
 * Fake Sensify console preview shown beside the assistant chat —
 * a static mock, no real data.
 */
export default function SensifySitePreview() {
  return (
    <div className="liquid-glass flex h-full flex-col rounded-2xl">
      {/* Console top nav */}
      <div className="flex items-center justify-between gap-3 border-b border-[rgba(255,255,255,0.08)] p-4">
        <p className="text-[13px] font-semibold tracking-wide text-[#F5F7FA]">Sensify® Console</p>
        <span className="rounded-full border border-[rgba(55,138,221,0.5)] bg-[rgba(55,138,221,0.12)] px-3 py-1 text-[0.6rem] font-semibold tracking-[0.22em] text-[#378ADD]">
          OWNED CHANNEL
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-4">
        <p className="font-display text-xl text-[#F5F7FA] italic">Campaign page draft</p>

        <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {PREVIEW_CARDS.map(({ icon: Icon, title, note }) => (
            <li
              key={title}
              className="flex items-center gap-3 rounded-xl border border-[rgba(245,247,250,0.1)] bg-[rgba(245,247,250,0.05)] px-3 py-2.5"
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

        {/* AI-generated brief */}
        <div className="mt-auto rounded-xl border border-[rgba(216,90,48,0.35)] bg-[rgba(216,90,48,0.08)] p-3.5">
          <p className="mb-2 flex items-center gap-2 text-[0.62rem] font-semibold tracking-[0.24em] text-[#D85A30]">
            <ListChecks size={13} strokeWidth={2.5} aria-hidden="true" />
            AI-GENERATED BRIEF
          </p>
          <ul className="space-y-1.5">
            {BRIEF_ITEMS.map((item) => (
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
