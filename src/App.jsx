import { useEffect, useState } from 'react';

import useMediaQuery from './hooks/useMediaQuery.js';
import AiLoader from './components/loader/AiLoader.jsx';
import StaggeredMenu from './components/react-bits/StaggeredMenu/StaggeredMenu.jsx';
import Hero from './components/hero/Hero.jsx';
import ProblemCardsSection from './components/problem/ProblemCardsSection.jsx';
import AIAssistantCtaSection from './components/assistant/AIAssistantCtaSection.jsx';
import DependencyReductionSection from './components/dependency/DependencyReductionSection.jsx';
import SensifySystemSection from './components/system/SensifySystemSection.jsx';
import OwnedExperienceVideoSection from './components/ownership/OwnedExperienceVideoSection.jsx';
import InfrastructureSection from './components/infrastructure/InfrastructureSection.jsx';
import TestimonialNotesSection from './components/testimonials/TestimonialNotesSection.jsx';
import ClientLogoSection from './components/clients/ClientLogoSection.jsx';
import SmartFAQSection from './components/faq/SmartFAQSection.jsx';
import SensifyFooter from './components/footer/SensifyFooter.jsx';

// Background-keyed from Logo/logo-main.jpg (light JPG).
// TODO: replace with the official transparent PNG/SVG logo for production.
const sensifyLogo = '/Logo/sensify-mark.png';

const menuItems = [
  { label: 'Home', ariaLabel: 'Go to homepage', link: '#home' },
  { label: 'Problem', ariaLabel: 'View the marketplace problem', link: '#problem' },
  { label: 'AI Assistant', ariaLabel: 'View the AI assistant', link: '#assistant' },
  { label: 'Dependency', ariaLabel: 'View dependency reduction', link: '#dependency' },
  { label: 'System', ariaLabel: 'View the Sensify system', link: '#system' },
  { label: 'Experience', ariaLabel: 'View the owned brand experience', link: '#ownership' },
  { label: 'Infrastructure', ariaLabel: 'View infrastructure deliverables', link: '#infrastructure' },
  { label: 'Notes', ariaLabel: 'View client notes', link: '#testimonials' },
  { label: 'FAQ', ariaLabel: 'Ask Sensify a question', link: '#faq' },
  { label: 'Contact', ariaLabel: 'Contact Sensify', link: '#contact' }
];

export default function App() {
  const [loading, setLoading] = useState(true);
  // OwnedExperienceVideoSection skips itself ≤767px, so #ownership does not
  // exist on phones — drop its menu entry there to avoid a dead anchor.
  const isMobile = useMediaQuery('(max-width: 767px)');
  const visibleMenuItems = isMobile
    ? menuItems.filter((item) => item.link !== '#ownership')
    : menuItems;

  // ShaderGradient exposes no reliable "ready" callback, so the loader runs
  // on a timed fallback — long enough for the shader's first frames, and it
  // can never get stuck.
  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 2200);
    return () => window.clearTimeout(timer);
  }, []);

  // Lock body scroll only while the entry loader is visible.
  useEffect(() => {
    if (loading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [loading]);

  return (
    <>
      <AiLoader isLoading={loading} text="Sensify" subtitle="Preparing owned channel" />

      {/* App-level so the fixed overlay wins the root stacking context —
          keeping it inside the hero traps the open panel behind sections
          that create their own stacking contexts. */}
      <StaggeredMenu
        position="right"
        items={visibleMenuItems}
        logoUrl={sensifyLogo}
        colors={['#0C447C', '#378ADD', '#D85A30']}
        accentColor="#D85A30"
        menuButtonColor="#F5F7FA"
        openMenuButtonColor="#030609"
        displayItemNumbering={true}
        displaySocials={false}
      />

      <Hero />
      <ProblemCardsSection />
      <AIAssistantCtaSection />
      <DependencyReductionSection />
      <SensifySystemSection />
      <OwnedExperienceVideoSection />
      <InfrastructureSection />
      <TestimonialNotesSection />
      <ClientLogoSection />
      <SmartFAQSection />
      <SensifyFooter />
    </>
  );
}
