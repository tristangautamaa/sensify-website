import FadeUp from '../ui/FadeUp.jsx';
import ClientLogoCarousel from './ClientLogoCarousel.jsx';
import './ClientLogoSection.css';

/**
 * ClientLogoSection — "Selected References" panel between the client notes
 * and the FAQ. Logos come straight from /public/Logo; Sensify's own marks
 * (logo-main.jpg, sensify-mark.png) are intentionally excluded.
 *
 * `surface` picks the tile backing: "dark" for white/transparent marks,
 * "light" for dark logos or logos shipped on white/colored JPG squares.
 */
const CLIENT_LOGOS = [
  { name: 'GISEU', src: '/Logo/giseu.png', surface: 'dark' },
  { name: 'Poncol', src: '/Logo/poncol.png', surface: 'dark' },
  { name: 'Toko Kuat', src: '/Logo/tokokuat.jpg', surface: 'light' },
  { name: 'Groots', src: '/Logo/groots.jpg', surface: 'light' },
  { name: 'La Douce', src: '/Logo/ladouce.jpg', surface: 'light' },
  { name: 'UMN', src: '/Logo/umn.png', surface: 'dark' },
];

export default function ClientLogoSection() {
  return (
    <section id="clients" data-header-theme="dark" className="client-logo-section dark-flow-section">
      <div className="client-logo-inner">
        <div className="client-logo-copy">
          <FadeUp>
            <p className="cls-eyebrow">SELECTED REFERENCES</p>
            <h2 className="cls-heading font-display">
              Built for brands moving beyond rented channels.
            </h2>
          </FadeUp>
          <FadeUp delay={0.15}>
            <p className="cls-paragraph">
              A reference space for brands, institutions, and operators connected to the Sensify
              ecosystem. Replace or refine this list as the client portfolio becomes public.
            </p>
            <p className="cls-note">
              Logos shown here can be adjusted as public references are approved.
            </p>
          </FadeUp>
        </div>

        <FadeUp delay={0.2} className="client-logo-panel-slot">
          <div className="client-logo-panel">
            <ClientLogoCarousel logos={CLIENT_LOGOS} columnCount={4} />
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
