import FadeUp from '../ui/FadeUp.jsx';
import VerticalPaymentDrop from './VerticalPaymentDrop.jsx';

const PAYMENT_PATHS = [
  'QRIS',
  'Virtual account',
  'Bank transfer',
  'E-wallet',
  'Credit card',
  'Assisted checkout',
];

/**
 * Strategic-position section: Sensify is not anti-marketplace — it adds an
 * owned channel beside the marketplace. Editorial text left, vertical
 * payment card-drop right.
 */
export default function DependencyReductionSection() {
  return (
    <section
      id="dependency"
      data-header-theme="dark"
      className="dark-flow-section relative overflow-hidden text-[#F5F7FA]"
      style={{
        paddingTop: 'clamp(96px, 10vw, 150px)',
        paddingBottom: 'clamp(96px, 10vw, 150px)',
      }}
    >
      {/* Ambient glows tying the section to the hero palette — centered away
          from the top/bottom edges so the dark seams stay flat. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(70% 55% at 85% 38%, rgba(55,138,221,0.12), transparent 55%), radial-gradient(45% 40% at 10% 70%, rgba(12,68,124,0.2), transparent 60%)',
        }}
      />

      <div
        className="relative mx-auto grid w-full max-w-[1280px] grid-cols-1 items-center px-6 md:px-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(320px,520px)]"
        style={{ gap: 'clamp(48px, 8vw, 110px)' }}
      >
        <div className="flex flex-col" style={{ gap: 'clamp(24px, 2.4vw, 32px)' }}>
          <FadeUp>
            <p className="mb-6 text-[0.68rem] font-semibold tracking-[0.34em] text-[#378ADD]">
              DEPENDENCY REDUCTION
            </p>
            <h2
              className="font-display text-4xl leading-[1.1] md:text-6xl"
              style={{ marginBottom: 'clamp(20px, 2.4vw, 34px)' }}
            >
              We do not replace marketplaces. <em>We reduce dependency.</em>
            </h2>
          </FadeUp>

          <FadeUp delay={0.15}>
            <p className="max-w-[620px] text-[15px] leading-[1.72] text-[rgba(245,247,250,0.68)]">
              Marketplaces can keep bringing reach. Sensify gives your brand a second channel that
              you own — with campaign pages, customer journeys, checkout options, and maintenance
              handled outside the platform.
            </p>
            <p className="mt-3 max-w-[620px] text-[15px] leading-[1.72] text-[rgba(245,247,250,0.68)]">
              Your owned website can still support familiar payment paths:
            </p>
          </FadeUp>

          <FadeUp delay={0.25}>
            <ul className="mb-6 flex max-w-[620px] flex-wrap gap-2.5" style={{ marginTop: '18px' }}>
              {PAYMENT_PATHS.map((path) => (
                <li
                  key={path}
                  className="rounded-full border border-[rgba(245,247,250,0.14)] px-4 py-1.5 text-[0.75rem] font-medium text-[rgba(245,247,250,0.82)]"
                >
                  {path}
                </li>
              ))}
            </ul>

            <p
              className="font-display text-[rgba(245,247,250,0.85)] italic"
              style={{
                marginTop: '24px',
                fontSize: 'clamp(1.4rem, 2.4vw, 2rem)',
                lineHeight: 1.15,
              }}
            >
              “Keep the reach. <span className="text-[#D85A30]">Own the relationship.</span>”
            </p>
          </FadeUp>
        </div>

        <FadeUp delay={0.2} className="min-w-0">
          <VerticalPaymentDrop />
        </FadeUp>
      </div>
    </section>
  );
}
