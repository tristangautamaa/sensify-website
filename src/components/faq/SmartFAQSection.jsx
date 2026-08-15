import FadeUp from '../ui/FadeUp.jsx';
import SmartFAQ from './SmartFAQ.jsx';
import { FAQ_ENTRIES } from '../../data/faqEntries.js';

/**
 * FAQ section wrapping the SmartFAQ widget with Sensify's default entries.
 */
export default function SmartFAQSection() {
  return (
    <section
      id="faq"
      data-header-theme="dark"
      className="dark-flow-section relative overflow-hidden px-6 py-24 text-[#F5F7FA] md:px-12 md:py-32"
    >
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(50% 40% at 20% 26%, rgba(12,68,124,0.18), transparent 60%), radial-gradient(40% 35% at 85% 74%, rgba(216,90,48,0.08), transparent 60%)',
        }}
      />

      <div className="relative mx-auto w-full max-w-[880px]">
        <FadeUp className="mb-10 text-center md:mb-14">
          <p className="font-mono mb-6 text-[0.66rem] font-medium tracking-[0.34em] text-[#378ADD]">
            SMART FAQ
          </p>
          <h2 className="font-display text-4xl leading-[1.08] md:text-5xl">
            Ask Sensify before you move <em>beyond marketplaces.</em>
          </h2>
        </FadeUp>

        <FadeUp delay={0.12}>
          <SmartFAQ
            title="Questions before building your owned channel?"
            placeholder="Ask about pricing, maintenance, payments, marketplaces, timeline..."
            faqEntries={FAQ_ENTRIES}
          />
        </FadeUp>

        {/* The widget above only reveals an answer once someone searches, so the
            full list also lives here in plain markup: readable without JS, and
            it keeps the FAQPage schema honest about what the page shows. */}
        <FadeUp delay={0.18}>
          <div className="mt-14 md:mt-20">
            <p className="font-mono mb-6 text-[0.62rem] font-medium tracking-[0.28em] text-[rgba(245,247,250,0.45)]">
              EVERY ANSWER
            </p>

            <div className="border-t border-[rgba(245,247,250,0.12)]">
              {FAQ_ENTRIES.map((entry) => (
                <details
                  key={entry.title}
                  className="group border-b border-[rgba(245,247,250,0.12)]"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-[15px] leading-snug transition-colors hover:text-[#378ADD] md:text-[16.5px] [&::-webkit-details-marker]:hidden">
                    <h3 className="font-display font-normal">{entry.title}</h3>
                    <span
                      aria-hidden="true"
                      className="shrink-0 text-[#378ADD] transition-transform duration-300 group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <p className="max-w-[68ch] pb-6 text-[14.5px] leading-[1.75] text-[rgba(245,247,250,0.72)]">
                    {entry.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
