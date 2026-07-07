import { useEffect, useState } from 'react';

import ShaderHeroBackground from './ShaderHeroBackground.jsx';
import SystemSignalCard from './SystemSignalCard.jsx';
import PixelTrail from '../react-bits/PixelTrail/PixelTrail.jsx';
import ScrollVelocity from '../react-bits/ScrollVelocity/ScrollVelocity.jsx';
import StaggeredMenu from '../react-bits/StaggeredMenu/StaggeredMenu.jsx';

import './Hero.css';

// Background-keyed from Logo/logo-main.jpg (light JPG).
// TODO: replace with the official transparent PNG/SVG logo for production.
const sensifyLogo = '/Logo/sensify-mark.png';

const menuItems = [
  { label: 'Home', ariaLabel: 'Go to homepage', link: '#home' },
  { label: 'Problem', ariaLabel: 'View the marketplace problem', link: '#problem' },
  { label: 'Dependency', ariaLabel: 'View dependency reduction', link: '#dependency' },
  { label: 'System', ariaLabel: 'View the Sensify system', link: '#system' },
  { label: 'Experience', ariaLabel: 'View the owned brand experience', link: '#ownership' },
  { label: 'Infrastructure', ariaLabel: 'View infrastructure deliverables', link: '#infrastructure' },
  { label: 'AI Assistant', ariaLabel: 'View the AI assistant', link: '#assistant' },
  { label: 'Contact', ariaLabel: 'Contact Sensify', link: '#contact' }
];

// The trail only earns its GPU cost on fine-pointer devices with motion allowed.
function usePixelTrailEnabled() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const pointerFine = window.matchMedia('(pointer: fine)');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setEnabled(pointerFine.matches && !reducedMotion.matches);
    update();
    pointerFine.addEventListener('change', update);
    reducedMotion.addEventListener('change', update);
    return () => {
      pointerFine.removeEventListener('change', update);
      reducedMotion.removeEventListener('change', update);
    };
  }, []);

  return enabled;
}

export default function Hero() {
  const pixelTrailEnabled = usePixelTrailEnabled();

  return (
    <section className="hero" id="home">
      <ShaderHeroBackground />

      {pixelTrailEnabled && (
        <div className="hero-pixel-layer" aria-hidden="true">
          <PixelTrail
            gridSize={56}
            trailSize={0.08}
            maxAge={260}
            interpolate={5}
            color="#D85A30"
            gooeyFilter={{ id: 'sensify-goo-filter', strength: 1.7 }}
          />
        </div>
      )}

      <StaggeredMenu
        position="right"
        items={menuItems}
        logoUrl={sensifyLogo}
        colors={['#0C447C', '#378ADD', '#D85A30']}
        accentColor="#D85A30"
        menuButtonColor="#F5F7FA"
        openMenuButtonColor="#030609"
        displayItemNumbering={true}
        displaySocials={false}
      />

      <main className="hero-content">
        <p className="hero-eyebrow">
          <span className="hero-eyebrow-dot" aria-hidden="true" />
          MARKETPLACE EXIT SYSTEM FOR GROWING BRANDS
        </p>

        <h1 className="hero-headline">
          {'Your marketplace is '}
          <br className="hero-br" />
          {'not your home. It is '}
          <br className="hero-br" />
          <em>rented shelf space.</em>
        </h1>

        <div className="hero-lower">
          <div className="hero-copy">
            <p className="hero-subtitle">
              Sensify helps brands move from marketplace dependency into their own official
              website — then keeps it maintained at a lower long-term cost.
            </p>
            <div className="hero-actions">
              <a href="#contact" className="btn btn-primary">
                Plan my website transition
                <span className="btn-arrow" aria-hidden="true">
                  →
                </span>
              </a>
              <a href="#system" className="btn btn-secondary">
                See the system
              </a>
            </div>
          </div>

          <SystemSignalCard />
        </div>
      </main>

      <div className="hero-footer-note">
        <span>Built for brands ready to grow beyond rented traffic.</span>
        <span>Official website • campaign pages • monthly maintenance</span>
      </div>

      <div className="hero-scroll-strip" aria-hidden="true">
        <ScrollVelocity
          texts={[
            'OWN THE CHANNEL • PROTECT THE MARGIN • KEEP THE CUSTOMER • MAINTAINED MONTHLY • '
          ]}
          velocity={38}
          className="sensify-scroll-text"
          numCopies={8}
        />
      </div>
    </section>
  );
}
