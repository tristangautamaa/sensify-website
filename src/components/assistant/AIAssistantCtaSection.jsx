import { useRef } from 'react';
import { useReducedMotion, useScroll, useTransform, motion } from 'motion/react';

import FadeUp from '../ui/FadeUp.jsx';
import AssistantDashboardMock from './AssistantDashboardMock.jsx';

/**
 * AI Assistant showcase CTA — a customer-facing shopping assistant that
 * lives on the brand's owned website: product recommendations, comparisons,
 * payment/shipping/care questions. Preview interface only; real product
 * data and checkout logic connect later.
 */
export default function AIAssistantCtaSection() {
  const sectionRef = useRef(null);
  const reducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [56, -56]);

  return (
    <section
      ref={sectionRef}
      id="assistant"
      data-header-theme="dark"
      className="dark-flow-section relative w-full overflow-hidden"
    >
      {/* Abstract blue/orange glow replacing the reference's foreground image.
          Radials are centered inside the strip and fade before its edges, so
          the section's bottom seam stays exactly the shared dark base. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-80"
        style={{
          background:
            'radial-gradient(50% 42% at 30% 50%, rgba(12,68,124,0.38), transparent 70%), radial-gradient(36% 32% at 78% 55%, rgba(216,90,48,0.16), transparent 70%)',
        }}
      />

      <div className="relative mx-auto w-full max-w-[1180px] px-6 py-28 md:px-12 md:py-36">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-[minmax(0,400px)_minmax(0,1fr)] lg:gap-12">
          {/* Left: copy */}
          <div>
            <FadeUp>
              <p className="mb-6 text-[0.68rem] font-semibold tracking-[0.34em] text-[#D85A30]">
                AI SHOPPING ASSISTANT
              </p>
              <h2 className="font-display text-4xl leading-[1.1] text-[#F5F7FA] md:text-5xl">
                Help customers choose faster on <em>your owned website.</em>
              </h2>
            </FadeUp>

            <FadeUp delay={0.15}>
              <p className="mt-6 text-[15px] leading-[1.75] text-[rgba(245,247,250,0.68)]">
                Sensify Assistant can sit inside your official website to help visitors ask for
                recommendations, compare products, understand details, and move closer to
                purchase without leaving your owned channel.
              </p>
            </FadeUp>

            <FadeUp delay={0.25}>
              <div className="mt-9 flex flex-col items-start gap-4">
                <a
                  href="#assistant-demo"
                  className="inline-flex items-center gap-2.5 rounded-full border border-[rgba(245,247,250,0.12)] bg-[#D85A30] px-7 py-4 text-sm font-semibold text-[#F5F7FA] transition-all duration-300 hover:-translate-y-[1px] hover:bg-[#C94E28] hover:shadow-[0_18px_44px_rgba(216,90,48,0.28)] active:translate-y-0"
                >
                  Ask Sensify Assistant
                  <span aria-hidden="true">→</span>
                </a>
                <p className="text-[12px] text-[rgba(245,247,250,0.45)]">
                  For now, this is a product preview interface. Real product data, inventory, and
                  checkout logic can be connected later.
                </p>
              </div>
            </FadeUp>
          </div>

          {/* Right: dashboard mock with scroll parallax */}
          <motion.div style={reducedMotion ? undefined : { y: parallaxY }} className="min-w-0">
            <FadeUp delay={0.2}>
              <AssistantDashboardMock />
            </FadeUp>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
