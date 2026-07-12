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
              Brands and operators <em>we’ve supported.</em>
            </h2>
          </FadeUp>
          <FadeUp delay={0.15}>
            <p className="cls-paragraph">
              Selected work from across the Sensify ecosystem — owned websites, commerce, and the
              ongoing maintenance behind them.
            </p>
            <p className="cls-note">Public references — updated as new work is approved.</p>
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
