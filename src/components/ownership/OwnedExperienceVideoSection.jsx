import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';

import useMediaQuery from '../../hooks/useMediaQuery.js';
import OptimizedVideo from '../media/OptimizedVideo.jsx';
import './OwnedExperienceVideoSection.css';

/**
 * Owned Experience — scroll-led cinematic video section.
 *
 * Pure media moment: a tall scroll track (200vh) with a sticky 100dvh stage.
 * The video starts as a lightly inset surface, then expands to fill the whole
 * viewport as the user scrolls — no overlay copy, chips, or labels. An
 * sr-only heading keeps the section reachable for assistive tech, but the
 * video is the only visual.
 *
 * Video bytes stay lazy: <OptimizedVideo /> only assigns the source near
 * the viewport and pauses playback offscreen. Reduced motion renders a
 * static full-viewport video with no sticky expansion (and OptimizedVideo
 * swaps autoplay for a manual play button).
 */
export default function OwnedExperienceVideoSection() {
  const sectionRef = useRef(null);
  const reducedMotion = useReducedMotion();
  // The master video is a landscape desktop composition — it can't read
  // well on a phone, so the whole section is skipped on small screens and
  // the page flows straight from System into Infrastructure.
  const isMobile = useMediaQuery('(max-width: 767px)');

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  // Animated inset: interpolating the four edges (not width/height) makes
  // the fullscreen expansion cheap and artifact-free.
  const frameTop = useTransform(scrollYProgress, [0, 0.35], ['12vh', '0vh']);
  const frameRight = useTransform(scrollYProgress, [0, 0.35], ['5vw', '0vw']);
  const frameBottom = useTransform(scrollYProgress, [0, 0.35], ['12vh', '0vh']);
  const frameLeft = useTransform(scrollYProgress, [0, 0.35], ['5vw', '0vw']);
  const frameRadius = useTransform(scrollYProgress, [0, 0.35], ['24px', '0px']);

  // All hooks are called above this line, so the mobile skip never changes
  // the hook order when the viewport class flips (e.g. tablet rotation).
  if (isMobile) {
    return null;
  }

  const heading = (
    <h2 className="sr-only">From marketplace product page to owned brand experience</h2>
  );

  const video = (
    <OptimizedVideo
      src="/Video/final.mp4"
      poster="/Video/transition-poster.jpg"
      className="scroll-video-media"
      lazy
      autoPlay
      loop
      muted
    />
  );

  if (reducedMotion) {
    return (
      <section
        id="ownership"
        data-header-theme="dark"
        className="scroll-video-section scroll-video-section--static dark-flow-section"
      >
        {heading}
        <div className="scroll-video-frame scroll-video-frame--static">{video}</div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      id="ownership"
      data-header-theme="dark"
      className="scroll-video-section dark-flow-section"
    >
      {heading}
      <div className="scroll-video-sticky">
        <motion.div
          className="scroll-video-frame"
          style={{
            top: frameTop,
            right: frameRight,
            bottom: frameBottom,
            left: frameLeft,
            borderRadius: frameRadius,
          }}
        >
          {video}
        </motion.div>
      </div>
    </section>
  );
}
