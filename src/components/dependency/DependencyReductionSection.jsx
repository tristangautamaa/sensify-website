import FadeUp from '../ui/FadeUp.jsx';
import PaymentCardCarousel from './PaymentCardCarousel.jsx';

const PAYMENT_PATHS = [
  'QRIS',
  'Virtual accounts',
  'Bank transfer',
  'E-wallet',
  'Cards',
  'Assisted checkout',
];

/**
 * Strategic-position section: Sensify is not anti-marketplace — it adds an
 * owned channel beside the marketplace. Editorial text left, 3D payment
 * carousel right.
 */
export default function DependencyReductionSection() {
  return (
    <section
      id="dependency"
      className="relative overflow-hidden bg-[#030609] py-28 text-[#F5F7FA] md:py-36"
    >
      {/* Ambient glows tying the section to the hero palette */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(70% 55% at 85% 30%, rgba(55,138,221,0.12), transparent 60%), radial-gradient(45% 40% at 10% 85%, rgba(12,68,124,0.2), transparent 65%)',
        }}
      />

      <div className="relative mx-auto grid w-full max-w-[1280px] grid-cols-1 items-center gap-16 px-6 md:px-12 lg:grid-cols-2 lg:gap-10">
        <div>
          <FadeUp>
            <p className="mb-6 text-[0.68rem] font-semibold tracking-[0.34em] text-[#378ADD]">
              DEPENDENCY REDUCTION
            </p>
            <h2 className="font-display text-4xl leading-[1.1] md:text-6xl">
              We do not replace marketplaces. <em>We reduce dependency.</em>
            </h2>
          </FadeUp>

          <FadeUp delay={0.15}>
            <p className="mt-7 max-w-[520px] text-[15px] leading-[1.75] text-[rgba(245,247,250,0.68)]">
              Marketplaces can keep bringing reach. Sensify gives your brand a second channel that
              you own — with campaign pages, customer journeys, checkout options, and maintenance
              handled outside the platform.
            </p>
            <p className="mt-5 max-w-[520px] text-[15px] leading-[1.75] text-[rgba(245,247,250,0.68)]">
              Your owned website can still support familiar payment paths:
            </p>
          </FadeUp>

          <FadeUp delay={0.25}>
            <ul className="mt-5 flex max-w-[520px] flex-wrap gap-2">
              {PAYMENT_PATHS.map((path) => (
                <li
                  key={path}
                  className="rounded-full border border-[rgba(245,247,250,0.14)] px-4 py-1.5 text-[0.75rem] font-medium text-[rgba(245,247,250,0.82)]"
                >
                  {path}
                </li>
              ))}
            </ul>

            <p className="font-display mt-10 text-xl text-[rgba(245,247,250,0.85)] italic md:text-2xl">
              “Keep the reach. <span className="text-[#D85A30]">Own the relationship.</span>”
            </p>
          </FadeUp>
        </div>

        <FadeUp delay={0.2} className="min-w-0">
          <PaymentCardCarousel />
        </FadeUp>
      </div>
    </section>
  );
}
