import FadeUp from '../ui/FadeUp.jsx';
import ImageComparisonSlider from './ImageComparisonSlider.jsx';

/**
 * Before/after comparison: drag the divider between a standardized
 * marketplace listing and the owned brand website experience.
 * Replaces the earlier cursor-spotlight reveal.
 */
export default function OwnedExperienceComparisonSection() {
  return (
    <section
      id="ownership"
      className="relative overflow-hidden bg-[#030609] px-6 py-24 text-[#F5F7FA] md:py-32"
    >
      <div className="mx-auto w-full max-w-[1180px]">
        {/* Header */}
        <FadeUp className="mb-10 max-w-[720px] md:mb-14">
          <p className="font-mono mb-6 text-[0.66rem] font-medium tracking-[0.34em] text-[#378ADD]">
            OWNED EXPERIENCE
          </p>
          <h2 className="font-display text-4xl leading-[1.06] md:text-6xl">
            From marketplace product page to <em>owned brand experience.</em>
          </h2>
          <p className="mt-5 max-w-[560px] text-[15px] leading-[1.7] text-[rgba(245,247,250,0.68)]">
            Compare the standardized listing your customers see on marketplaces with the richer
            product story your brand can own on its official website.
          </p>
        </FadeUp>

        {/* Comparison frame */}
        <FadeUp delay={0.15}>
          <div
            className="overflow-hidden border border-[rgba(245,247,250,0.14)] shadow-[0_40px_120px_rgba(0,0,0,0.5)]"
            style={{ borderRadius: '28px', background: 'rgba(245,247,250,0.03)' }}
          >
            <ImageComparisonSlider />
          </div>
          <p className="font-mono mt-5 text-center text-[0.6rem] tracking-[0.24em] text-[rgba(245,247,250,0.45)] uppercase">
            Drag the handle to compare
          </p>
        </FadeUp>
      </div>
    </section>
  );
}
