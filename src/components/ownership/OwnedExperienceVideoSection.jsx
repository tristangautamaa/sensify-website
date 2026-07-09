import FadeUp from '../ui/FadeUp.jsx';
import OptimizedVideo from '../media/OptimizedVideo.jsx';
import './OwnedExperienceVideoSection.css';

/**
 * Owned Experience — cinematic video reveal. Replaces the earlier
 * drag-to-compare slider: the transition from a standardized marketplace
 * listing to an owned brand website now plays as a single looping video.
 *
 * The video is lazy-loaded and viewport-gated by <OptimizedVideo /> so it
 * never competes with first paint.
 */
export default function OwnedExperienceVideoSection() {
  return (
    <section id="ownership" data-header-theme="dark" className="owned-video-section">
      <div className="owned-video-bg" aria-hidden="true" />

      <div className="owned-video-inner">
        <FadeUp className="owned-video-copy">
          <p className="owned-video-eyebrow font-mono">OWNED EXPERIENCE</p>
          <h2 className="owned-video-heading font-display">
            From marketplace product page to <em>owned brand experience.</em>
          </h2>
          <p className="owned-video-paragraph">
            Watch how a standardized marketplace layout becomes a brand-owned shopping journey —
            with product storytelling, direct checkout paths, and an assistant that helps customers
            choose.
          </p>
        </FadeUp>

        <FadeUp delay={0.15} className="owned-video-stage">
          <div className="owned-video-shell">
            <div className="owned-video-topbar" aria-hidden="true">
              <span className="owned-video-chip">TRANSITION PREVIEW</span>
              <span className="owned-video-chip owned-video-chip--status">GENERATED CONCEPT</span>
            </div>
            <OptimizedVideo
              src="/Video/transition.mp4"
              poster="/Video/transition-poster.jpg"
              className="owned-experience-video"
              lazy
              autoPlay
              loop
              muted
            />
          </div>

          <p className="owned-video-label font-mono">
            MARKETPLACE STRUCTURE <span aria-hidden="true">→</span> OWNED BRAND WEBSITE
          </p>
          <p className="owned-video-note">
            Video preview generated for concept direction. Final footage can be replaced later.
          </p>
        </FadeUp>
      </div>
    </section>
  );
}
