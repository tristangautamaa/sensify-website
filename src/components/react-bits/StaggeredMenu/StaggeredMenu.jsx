// API-compatible implementation of the React Bits StaggeredMenu component.
// Fixed header with logo + Menu/Close toggle; a right-side panel slides in
// behind staggered color prelayers, then menu items reveal with a GSAP stagger.
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

import './StaggeredMenu.css';

export default function StaggeredMenu({
  position = 'right',
  items = [],
  colors = ['#0C447C', '#378ADD', '#D85A30'],
  accentColor = '#D85A30',
  menuButtonColor = '#F5F7FA',
  openMenuButtonColor = '#030609',
  changeMenuColorOnOpen = true,
  displayItemNumbering = true,
  displaySocials = false,
  socialItems = [],
  logoUrl,
  className = '',
  onMenuOpen,
  onMenuClose
}) {
  const [open, setOpen] = useState(false);
  const panelRef = useRef(null);
  const preLayersRef = useRef(null);
  const tlRef = useRef(null);

  const offscreen = position === 'left' ? -100 : 100;

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set([...preLayersRef.current.children, panelRef.current], {
        xPercent: offscreen
      });
    });
    return () => ctx.revert();
  }, [offscreen]);

  const openMenu = useCallback(() => {
    setOpen(true);
    onMenuOpen?.();

    const panel = panelRef.current;
    const layers = Array.from(preLayersRef.current.children);
    const labels = panel.querySelectorAll('.sm-panel-itemLabel');
    const meta = panel.querySelectorAll('.sm-panel-itemIndex, .sm-panel-meta, .sm-socials');

    tlRef.current?.kill();
    tlRef.current = gsap
      .timeline({ defaults: { ease: 'power4.out' } })
      .to(layers, { xPercent: 0, duration: 0.5, stagger: 0.08 })
      .to(panel, { xPercent: 0, duration: 0.65 }, '-=0.35')
      .fromTo(
        labels,
        { yPercent: 145, rotate: 8 },
        { yPercent: 0, rotate: 0, duration: 0.9, stagger: 0.065 },
        '-=0.42'
      )
      .fromTo(
        meta,
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.55, ease: 'power2.out' },
        '-=0.6'
      );
  }, [onMenuOpen]);

  const closeMenu = useCallback(() => {
    setOpen(false);
    onMenuClose?.();

    const panel = panelRef.current;
    const layers = Array.from(preLayersRef.current.children).reverse();

    tlRef.current?.kill();
    tlRef.current = gsap
      .timeline({ defaults: { ease: 'power3.in' } })
      .to(panel, { xPercent: offscreen, duration: 0.32 })
      .to(layers, { xPercent: offscreen, duration: 0.28, stagger: 0.05 }, '-=0.2');
  }, [offscreen, onMenuClose]);

  const toggleMenu = useCallback(() => {
    (open ? closeMenu : openMenu)();
  }, [open, openMenu, closeMenu]);

  // Escape closes; page scroll locks while the panel is open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') closeMenu();
    };
    window.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, closeMenu]);

  return (
    <div
      className={`staggered-menu-wrapper ${className}`.trim()}
      data-position={position}
      data-open={open || undefined}
      style={{
        '--sm-accent': accentColor,
        '--sm-btn': menuButtonColor,
        '--sm-btn-open': changeMenuColorOnOpen ? openMenuButtonColor : menuButtonColor
      }}
    >
      <header className="staggered-menu-header">
        <a className="sm-logo" href="#home" aria-label="Sensify — home">
          {logoUrl ? (
            <>
              <img src={logoUrl} alt="" width="46" height="46" />
              <span className="sm-logo-word">
                Sensify<sup>®</sup>
              </span>
            </>
          ) : (
            <span className="sm-logo-text">
              Sensify<sup>®</sup>
            </span>
          )}
        </a>

        <button
          type="button"
          className="sm-toggle"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="staggered-menu-panel"
          onClick={toggleMenu}
        >
          <span className="sm-toggle-textWrap" aria-hidden="true">
            <span className="sm-toggle-textInner">
              <span className="sm-toggle-line">Menu</span>
              <span className="sm-toggle-line">Close</span>
            </span>
          </span>
          <span className="sm-icon" aria-hidden="true">
            <span className="sm-icon-line" />
            <span className="sm-icon-line sm-icon-line-v" />
          </span>
        </button>
      </header>

      <div className="sm-prelayers" ref={preLayersRef} aria-hidden="true">
        {colors.slice(0, 3).map((color, i) => (
          <div key={`${color}-${i}`} className="sm-prelayer" style={{ background: color }} />
        ))}
      </div>

      <aside
        id="staggered-menu-panel"
        className="staggered-menu-panel"
        ref={panelRef}
        inert={!open}
      >
        <nav aria-label="Main navigation">
          <ul className="sm-panel-list" data-numbering={displayItemNumbering || undefined}>
            {items.map((item, idx) => (
              <li className="sm-panel-item" key={item.label}>
                <a
                  className="sm-panel-itemWrap"
                  href={item.link}
                  aria-label={item.ariaLabel}
                  onClick={closeMenu}
                >
                  <span className="sm-panel-itemLabel">{item.label}</span>
                  {displayItemNumbering && (
                    <span className="sm-panel-itemIndex" aria-hidden="true">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                  )}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {displaySocials && socialItems.length > 0 && (
          <div className="sm-socials">
            {socialItems.map((social) => (
              <a key={social.label} href={social.link} target="_blank" rel="noreferrer">
                {social.label}
              </a>
            ))}
          </div>
        )}

        <footer className="sm-panel-meta">
          <span>Sensify® — owned channel systems</span>
          <span>For growing brands</span>
        </footer>
      </aside>
    </div>
  );
}
