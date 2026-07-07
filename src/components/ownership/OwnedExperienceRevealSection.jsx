import FadeUp from '../ui/FadeUp.jsx';
import SpotlightReveal from './SpotlightReveal.jsx';

/**
 * Interactive comparison: moving the cursor over a standardized
 * marketplace-style product page reveals the owned brand experience beneath.
 *
 * Real assets can replace the CSS mocks later:
 *   public/assets/ownership/marketplace-page.png        (static overlay)
 *   public/assets/ownership/owned-brand-experience.mp4  (hidden layer)
 * Then pass imageSrc/videoSrc and fallbackMode={false} to SpotlightReveal.
 */
export default function OwnedExperienceRevealSection() {
  return (
    <section
      id="ownership"
      className="relative z-10 min-h-screen w-full overflow-hidden bg-black text-white"
    >
      <SpotlightReveal fallbackMode baseRadius={500} />

      {/* ----- Content overlays (above the reveal layers) ----- */}
      <div className="pointer-events-none absolute inset-0 z-20 flex flex-col justify-between p-6 md:p-12">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <FadeUp className="liquid-glass max-w-[280px] rounded-2xl p-5">
            <p className="mb-2 text-[0.62rem] font-semibold tracking-[0.3em] text-[rgba(245,247,250,0.6)]">
              STANDARDIZED PAGE
            </p>
            <p className="text-[13px] leading-[1.6] text-[rgba(245,247,250,0.82)]">
              Same structure. Limited story. Platform-owned journey.
            </p>
          </FadeUp>

          <FadeUp
            delay={0.1}
            className="rounded-full border border-[rgba(245,247,250,0.2)] bg-[rgba(3,6,9,0.55)] px-5 py-2 backdrop-blur-sm"
          >
            <p className="text-[0.64rem] font-semibold tracking-[0.3em] text-[#378ADD]">
              OWNED EXPERIENCE — MOVE YOUR CURSOR TO REVEAL
            </p>
          </FadeUp>
        </div>

        <div className="flex flex-wrap items-end justify-between gap-6">
          <FadeUp className="max-w-[560px]">
            <h2
              className="font-display text-4xl leading-[1.08] md:text-6xl"
              style={{ textShadow: '0 2px 24px rgba(3,6,9,0.85)' }}
            >
              From marketplace product page to <em>owned brand experience.</em>
            </h2>
            <p
              className="mt-4 max-w-[420px] text-[14px] leading-[1.7] text-[rgba(245,247,250,0.75)]"
              style={{ textShadow: '0 1px 12px rgba(3,6,9,0.9)' }}
            >
              Reveal what changes when your product is no longer trapped inside a standardized
              listing.
            </p>
          </FadeUp>

          <FadeUp delay={0.12} className="liquid-glass max-w-[300px] rounded-2xl p-5">
            <p className="mb-2 text-[0.62rem] font-semibold tracking-[0.3em] text-[#D85A30]">
              OWNED CHANNEL
            </p>
            <p className="text-[13px] leading-[1.6] text-[rgba(245,247,250,0.82)]">
              Your catalog, campaign, story, and customer journey in one official website.
            </p>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
