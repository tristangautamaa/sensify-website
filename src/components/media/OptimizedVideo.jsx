import { useCallback, useEffect, useRef, useState } from 'react';
import './OptimizedVideo.css';

/**
 * OptimizedVideo — lazy, viewport-aware video player.
 *
 * Performance behavior:
 * - With `lazy`, no video bytes are fetched until the shell is within
 *   ~600px of the viewport (IntersectionObserver assigns `src` imperatively
 *   and calls load(), since React won't re-evaluate a <source> added after
 *   mount).
 * - `preload="metadata"` keeps the initial fetch tiny.
 * - Playback starts only once the shell is meaningfully visible
 *   (intersectionRatio > 0.35) and pauses as soon as it scrolls away.
 * - prefers-reduced-motion disables autoplay entirely; a manual play
 *   button renders instead. The same button appears if autoplay is
 *   blocked by the browser.
 * - A gradient placeholder + loading indicator cover the frame until
 *   `canplay` fires, so a missing poster never breaks layout.
 *
 * TODO: Export a WebM version for modern browsers (public/Video/transition.webm)
 *       and render <source type="video/webm"> before the MP4 fallback.
 * TODO: Create /Video/transition-poster.jpg from a polished frame for
 *       faster perceived loading (ffmpeg was not available at build time).
 */
export default function OptimizedVideo({
  src,
  poster,
  className = '',
  lazy = true,
  autoPlay = true,
  loop = true,
  muted = true,
}) {
  const shellRef = useRef(null);
  const videoRef = useRef(null);
  const [shouldLoad, setShouldLoad] = useState(!lazy);
  const [isReady, setIsReady] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [needsManualPlay, setNeedsManualPlay] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  // Poster is optional: only pass it to the element once it actually loads,
  // so a 404 never flashes a broken frame over the gradient placeholder.
  const [posterOk, setPosterOk] = useState(false);

  const tryPlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    video
      .play()
      .then(() => setNeedsManualPlay(false))
      .catch(() => setNeedsManualPlay(true));
  }, []);

  // Track prefers-reduced-motion live.
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReducedMotion(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  // Probe the optional poster off-DOM.
  useEffect(() => {
    if (!poster) return undefined;
    const img = new Image();
    img.onload = () => setPosterOk(true);
    img.src = poster;
    return () => {
      img.onload = null;
    };
  }, [poster]);

  // Lazy source fetch: arm well before the section is reached.
  useEffect(() => {
    if (shouldLoad) return undefined;
    const shell = shellRef.current;
    if (!shell) return undefined;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          io.disconnect();
        }
      },
      { rootMargin: '600px' }
    );
    io.observe(shell);
    return () => io.disconnect();
  }, [shouldLoad]);

  // Imperative src assignment — conditional <source> children added after
  // mount are not picked up by the media element without a load() call.
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !shouldLoad || video.dataset.loaded === 'true') return;
    video.src = src;
    video.load();
    video.dataset.loaded = 'true';
  }, [shouldLoad, src]);

  // Play when visible enough, pause when offscreen.
  useEffect(() => {
    const shell = shellRef.current;
    if (!shell || !autoPlay) return undefined;
    const io = new IntersectionObserver(
      ([entry]) => {
        const video = videoRef.current;
        if (!video) return;
        if (entry.intersectionRatio > 0.35 && !reducedMotion) {
          if (video.paused) tryPlay();
        } else if (!video.paused) {
          video.pause();
        }
      },
      { threshold: [0, 0.35, 0.6] }
    );
    io.observe(shell);
    return () => io.disconnect();
  }, [autoPlay, reducedMotion, tryPlay]);

  const showPlayButton =
    shouldLoad && !hasError && !isPlaying && (needsManualPlay || reducedMotion || !autoPlay);
  const showLoading = shouldLoad && !isReady && !hasError;

  return (
    <div ref={shellRef} className={`optimized-video ${className}`.trim()}>
      {/* Gradient placeholder sits behind the video at all times, so there is
          never a layout shift or a black flash while bytes arrive. */}
      <div className="optimized-video__placeholder" aria-hidden="true" />

      <video
        ref={videoRef}
        className="optimized-video__el"
        muted={muted}
        loop={loop}
        playsInline
        preload="metadata"
        poster={posterOk ? poster : undefined}
        onCanPlay={() => setIsReady(true)}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onError={() => setHasError(true)}
      />

      {/* Loading state stays unobtrusive: a thin scan bar only, no text. */}
      {showLoading && (
        <div className="optimized-video__loading" aria-hidden="true">
          <span className="optimized-video__loading-bar" />
        </div>
      )}

      {/* Error state stays silent: the gradient placeholder already covers
          the frame, so failures never surface visible error copy. */}
      {hasError && (
        <span className="sr-only" role="status">
          Video preview could not be loaded
        </span>
      )}

      {showPlayButton && (
        <button
          type="button"
          className="optimized-video__play"
          onClick={tryPlay}
          aria-label="Play transition video"
        >
          <span className="optimized-video__play-icon" aria-hidden="true" />
          Play transition
        </button>
      )}
    </div>
  );
}
