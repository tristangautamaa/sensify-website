import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import './SensifyFooter.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Cinematic conversion footer — the final moment of the page.
 *
 * Curtain reveal on scroll (GSAP ScrollTrigger), giant SENSIFY background
 * type with parallax, aurora glow + grid backdrop, diagonal marquee, and
 * magnetic CTA pills. All motion collapses cleanly under
 * prefers-reduced-motion.
 */
const MARQUEE_ITEMS = [
  'OWNED CHANNEL',
  'MARKETPLACE EXIT SYSTEM',
  'MONTHLY MAINTENANCE',
  'AI-ASSISTED UPDATES',
  'CAMPAIGN PAGES',
  'CUSTOMER JOURNEY',
  'BRAND CONTROL',
];

const SECONDARY_LINKS = [
  { label: 'Problem', href: '#problem' },
  { label: 'System', href: '#system' },
  { label: 'AI Assistant', href: '#assistant' },
  { label: 'Notes', href: '#testimonials' },
  { label: 'FAQ', href: '#faq' },
];

/** GSAP magnetic hover: the element leans toward the cursor. Works for <a> and <button>. */
function MagneticButton({ as: Tag = 'a', className = '', strength = 0.32, children, ...props }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const finePointer = window.matchMedia('(pointer: fine)');
    if (reducedMotion.matches || !finePointer.matches) return undefined;

    const xTo = gsap.quickTo(el, 'x', { duration: 0.55, ease: 'power3.out' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.55, ease: 'power3.out' });

    const onMove = (event) => {
      const rect = el.getBoundingClientRect();
      xTo((event.clientX - rect.left - rect.width / 2) * strength);
      yTo((event.clientY - rect.top - rect.height / 2) * strength);
    };

    const onLeave = () => {
      xTo(0);
      yTo(0);
    };

    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', onLeave);
    return () => {
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
      gsap.killTweensOf(el);
    };
  }, [strength]);

  return (
    <Tag ref={ref} className={`sf-pill ${className}`} {...props}>
      {children}
    </Tag>
  );
}

export default function SensifyFooter() {
  const footerRef = useRef(null);

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return undefined;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reducedMotion.matches) return undefined;

    const ctx = gsap.context(() => {
      // Curtain: the footer content un-clips as it scrolls into view.
      gsap.fromTo(
        '.sf-curtain',
        { clipPath: 'inset(18% 4% 0% 4% round 32px)' },
        {
          clipPath: 'inset(0% 0% 0% 0% round 0px)',
          ease: 'none',
          scrollTrigger: {
            trigger: footer,
            start: 'top bottom',
            end: 'top 30%',
            scrub: 0.6,
          },
        }
      );

      // Giant background type drifts up slower than the scroll.
      gsap.fromTo(
        '.sf-giant',
        { yPercent: 36 },
        {
          yPercent: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: footer,
            start: 'top bottom',
            end: 'bottom bottom',
            scrub: 0.8,
          },
        }
      );

      // Content stagger once the footer is mostly visible.
      gsap.from('.sf-stagger', {
        y: 34,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.09,
        scrollTrigger: {
          trigger: footer,
          start: 'top 55%',
        },
      });
    }, footer);

    return () => ctx.revert();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer ref={footerRef} id="contact" className="sf-footer">
      <div className="sf-curtain">
        {/* Backdrop: grid + aurora */}
        <div className="sf-grid" aria-hidden="true" />
        <div className="sf-aurora" aria-hidden="true" />

        {/* Giant background type */}
        <div className="sf-giant" aria-hidden="true">
          SENSIFY
        </div>

        {/* Diagonal marquee */}
        <div className="sf-marquee-band" aria-hidden="true">
          <div className="sf-marquee-track">
            {[0, 1].map((copy) => (
              <span key={copy} className="sf-marquee-copy">
                {MARQUEE_ITEMS.map((item) => (
                  <span key={`${copy}-${item}`} className="sf-marquee-item">
                    {item}
                    <span className="sf-marquee-dot" />
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div>

        {/* Main conversion moment */}
        <div className="sf-content">
          <p className="sf-eyebrow sf-stagger">FREE CONSULTATION</p>
          <h2 className="sf-heading sf-stagger">Ready to begin?</h2>
          <p className="sf-sub sf-stagger">
            Start with a free consultation. We’ll map how your brand can move from
            marketplace-only growth into an owned website system.
          </p>

          <div className="sf-actions sf-stagger">
            <MagneticButton
              as="a"
              href="mailto:hello@sensify.example?subject=Free%20consultation"
              className="sf-pill-primary"
            >
              Book a free consultation
              <span className="sf-pill-arrow" aria-hidden="true">
                →
              </span>
            </MagneticButton>
            <MagneticButton
              as="a"
              href="mailto:hello@sensify.example?subject=Website%20transition%20plan"
              className="sf-pill-outline"
            >
              Plan my website transition
            </MagneticButton>
            <MagneticButton as="a" href="#assistant" className="sf-pill-ghost">
              Preview AI Assistant
            </MagneticButton>
          </div>

          <nav className="sf-links sf-stagger" aria-label="Footer navigation">
            {SECONDARY_LINKS.map((link) => (
              <a key={link.href} href={link.href} className="sf-link">
                {link.label}
              </a>
            ))}
            <button type="button" onClick={scrollToTop} className="sf-link">
              Back to top
            </button>
          </nav>
        </div>

        {/* Bottom bar */}
        <div className="sf-bottom">
          <span>© 2026 Sensify. Built for brands ready to grow beyond rented traffic.</span>
          <span className="sf-crafted">Crafted for owned-channel growth</span>
        </div>

        {/* Back to top */}
        <button
          type="button"
          onClick={scrollToTop}
          className="sf-top-btn"
          aria-label="Back to top"
        >
          ↑
        </button>
      </div>
    </footer>
  );
}
