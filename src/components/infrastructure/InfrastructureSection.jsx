import { Check, X } from 'lucide-react';

import FadeUp from '../ui/FadeUp.jsx';
import HlsVideoCircle from './HlsVideoCircle.jsx';

const WITHOUT_OWNED_CHANNEL = [
  'Campaign pages rebuilt manually for every launch.',
  'Product information scattered across chats, sheets, and marketplaces.',
  'Small website changes become slow freelancer coordination.',
  'Customer journeys depend entirely on platform templates.',
  'No consistent place to measure direct brand interest.',
];

const WITH_SENSIFY = [
  'Official website structure ready for campaigns and product drops.',
  'Product catalog, brand pages, and landing pages in one system.',
  'Monthly maintenance for edits, fixes, and updates.',
  'Customer journey designed around the brand, not the platform.',
  'Analytics setup to understand traffic, behavior, and conversion intent.',
];

const CARD_SHADOW = '0 3px 9.1px #3f4a7e0d, 0 1px 29px #3f4a7e1a';

function InfraCard({ children, negative = false, delay = 0 }) {
  const Icon = negative ? X : Check;
  return (
    <FadeUp delay={delay}>
      <div
        className="flex items-start gap-3.5 rounded-[18px] bg-white p-4 md:p-5"
        style={{ boxShadow: CARD_SHADOW }}
      >
        <span
          className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
          style={{
            background: negative ? 'rgba(216,90,48,0.12)' : 'rgba(55,138,221,0.12)',
            color: negative ? '#D85A30' : '#378ADD',
          }}
        >
          <Icon size={14} strokeWidth={3} aria-hidden="true" />
        </span>
        <p className="text-[13.5px] leading-[1.6] text-[rgba(12,68,124,0.85)]">{children}</p>
      </div>
    </FadeUp>
  );
}

/**
 * Negative/positive comparison around a central operations visual:
 * "without an owned channel" vs "with Sensify infrastructure".
 */
export default function InfrastructureSection() {
  return (
    <section id="infrastructure" className="bg-[#F5F7FA] px-6 py-24 md:px-12 md:py-32">
      <div className="mx-auto w-full max-w-[1280px]">
        <FadeUp className="mx-auto mb-16 flex max-w-[820px] flex-col items-center text-center md:mb-20">
          <span className="mb-6 rounded-full border border-[rgba(12,68,124,0.2)] bg-white px-4 py-1.5 text-[0.64rem] font-semibold tracking-[0.3em] text-[#0C447C]">
            INFRASTRUCTURE
          </span>
          <h2 className="font-display text-4xl leading-[1.1] text-[#0C447C] md:text-6xl">
            Everything your brand needs to operate <em>beyond the marketplace.</em>
          </h2>
          <p className="mt-6 text-lg font-medium text-[rgba(12,68,124,0.65)] md:text-xl">
            Stop rebuilding from scratch. Run from{' '}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: 'linear-gradient(90deg, #0C447C, #378ADD 50%, #D85A30)',
              }}
            >
              one owned system.
            </span>
          </p>
        </FadeUp>

        {/* Mobile: visual first, then stacked cards. Desktop: 3 columns. */}
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:gap-10">
          <FadeUp className="order-first flex justify-center lg:order-none lg:col-start-2 lg:row-start-1">
            <HlsVideoCircle />
          </FadeUp>

          <div className="flex flex-col gap-4 lg:col-start-1 lg:row-start-1">
            <h3 className="mb-1 text-[0.72rem] font-semibold tracking-[0.28em] text-[#D85A30]">
              WITHOUT AN OWNED CHANNEL
            </h3>
            {WITHOUT_OWNED_CHANNEL.map((item, i) => (
              <InfraCard key={item} negative delay={0.05 * i}>
                {item}
              </InfraCard>
            ))}
          </div>

          <div className="flex flex-col gap-4 lg:col-start-3 lg:row-start-1">
            <h3 className="mb-1 text-[0.72rem] font-semibold tracking-[0.28em] text-[#378ADD]">
              WITH SENSIFY INFRASTRUCTURE
            </h3>
            {WITH_SENSIFY.map((item, i) => (
              <InfraCard key={item} delay={0.05 * i}>
                {item}
              </InfraCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
