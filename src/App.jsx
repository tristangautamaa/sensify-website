import { useEffect, useState } from 'react';

import SiteLoader from './components/loader/SiteLoader.jsx';
import Hero from './components/hero/Hero.jsx';
import ProblemCardsSection from './components/problem/ProblemCardsSection.jsx';
import DependencyReductionSection from './components/dependency/DependencyReductionSection.jsx';
import SensifySystemSection from './components/system/SensifySystemSection.jsx';
import OwnedExperienceRevealSection from './components/ownership/OwnedExperienceRevealSection.jsx';
import InfrastructureSection from './components/infrastructure/InfrastructureSection.jsx';
import AIAssistantCtaSection from './components/assistant/AIAssistantCtaSection.jsx';

export default function App() {
  const [loading, setLoading] = useState(true);

  // ShaderGradient exposes no reliable "ready" callback, so the loader runs
  // on a timed fallback — long enough for the shader's first frames, and it
  // can never get stuck.
  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 2200);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <>
      <SiteLoader isLoading={loading} />
      <Hero />
      <ProblemCardsSection />
      <DependencyReductionSection />
      <SensifySystemSection />
      <OwnedExperienceRevealSection />
      <InfrastructureSection />
      <AIAssistantCtaSection />

      {/* Minimal contact anchor — full footer comes later */}
      <footer
        id="contact"
        className="flex flex-col items-start gap-5 bg-[#030609] px-6 py-12 text-[#F5F7FA] md:flex-row md:items-center md:justify-between md:px-12"
      >
        <div>
          <p className="text-lg font-semibold tracking-wide">Sensify®</p>
          <p className="mt-1 text-[13.5px] text-[rgba(245,247,250,0.68)]">
            Build the channel your brand actually owns.
          </p>
        </div>
        <a
          href="mailto:hello@sensify.example"
          className="rounded-full bg-[#D85A30] px-6 py-3 text-sm font-semibold text-[#F5F7FA] transition-colors hover:bg-[#c74d27]"
        >
          Book a consultation
        </a>
      </footer>
    </>
  );
}
