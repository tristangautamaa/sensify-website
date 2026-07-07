import { useRef } from 'react';
import { useReducedMotion, useScroll, useTransform, motion } from 'motion/react';

import FadeUp from '../ui/FadeUp.jsx';
import PrimaryButton from '../ui/PrimaryButton.jsx';
import AssistantDashboardMock from './AssistantDashboardMock.jsx';

/**
 * AI Assistant showcase CTA — framed as a website operations co-pilot
 * (drafting briefs, organizing update tasks), not an autonomous business
 * runner. This section replaces the previously planned roadmap / packages
 * teaser / FAQ ending.
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
      className="relative w-full overflow-hidden"
      style={{ background: 'linear-gradient(to bottom, #030609 0%, #14191E 100%)' }}
    >
      {/* Abstract blue/orange glow replacing the reference's foreground image */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-64"
        style={{
          background:
            'radial-gradient(60% 90% at 30% 100%, rgba(12,68,124,0.4), transparent 70%), radial-gradient(40% 70% at 78% 100%, rgba(216,90,48,0.18), transparent 70%)',
        }}
      />

      <div className="relative mx-auto w-full max-w-[1180px] px-6 py-28 md:px-12 md:py-36">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-[minmax(0,400px)_minmax(0,1fr)] lg:gap-12">
          {/* Left: copy */}
          <div>
            <FadeUp>
              <p className="mb-6 text-[0.68rem] font-semibold tracking-[0.34em] text-[#D85A30]">
                AI WEBSITE OPERATIONS ASSISTANT
              </p>
              <h2 className="font-display text-4xl leading-[1.1] text-[#F5F7FA] md:text-5xl">
                Manage your owned channel without speaking in <em>technical tickets.</em>
              </h2>
            </FadeUp>

            <FadeUp delay={0.15}>
              <p className="mt-6 text-[15px] leading-[1.75] text-[rgba(245,247,250,0.68)]">
                Ask Sensify Assistant to prepare product updates, campaign page briefs, landing
                page copy, catalog changes, and maintenance requests — so your brand can move
                faster without hiring an internal tech team.
              </p>
            </FadeUp>

            <FadeUp delay={0.25}>
              <div className="mt-9 flex flex-col items-start gap-4">
                <PrimaryButton href="#assistant-demo">Preview the assistant</PrimaryButton>
                <p className="text-[12px] text-[rgba(245,247,250,0.45)]">
                  For now, this is a product preview interface. Connect real workflows later.
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
