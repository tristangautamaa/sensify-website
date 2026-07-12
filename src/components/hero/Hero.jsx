import { useEffect, useState } from 'react';

import ShaderHeroBackground from './ShaderHeroBackground.jsx';
import PixelTrail from '../react-bits/PixelTrail/PixelTrail.jsx';
import ScrollVelocity from '../react-bits/ScrollVelocity/ScrollVelocity.jsx';

import './Hero.css';

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
    <section className="hero" id="home" data-header-theme="dark">
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

      <main className="hero-content">
        <p className="hero-eyebrow">
          <span className="hero-eyebrow-dot" aria-hidden="true" />
          MARKETPLACE EXIT SYSTEM FOR GROWING BRANDS
        </p>

        <h1 className="hero-title">
          <span>An AI-powered storefront</span>
          <span>built for your brand.</span>
        </h1>

        <div className="hero-lower">
          <div className="hero-copy">
            <p className="hero-subtitle">
              Sensify helps brands move beyond marketplace-only selling with an owned storefront,
              AI-assisted shopping, checkout paths, and ongoing maintenance.
            </p>
            <div className="hero-actions">
              <a href="#contact" className="btn btn-primary">
                Build my AI storefront
                <span className="btn-arrow" aria-hidden="true">
                  →
                </span>
              </a>
              <a href="#system" className="btn btn-secondary">
                See how it works
              </a>
            </div>
          </div>
        </div>
      </main>

      <div className="hero-footer-note">
        <span>Built for brands ready to grow beyond rented traffic.</span>
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
