import { useEffect, useRef, useState } from 'react';

/**
 * Circular video visual with graceful source fallback:
 *   1. public/assets/infrastructure/operations-loop.m3u8 (via hls.js)
 *   2. public/assets/infrastructure/operations-loop.mp4
 *   3. animated CSS orb (no assets required)
 *
 * Sources are probed with HEAD requests; an SPA-fallback HTML response is
 * treated as missing. hls.js is imported dynamically so it never lands in
 * the main bundle unless an HLS stream actually exists.
 */
const HLS_SRC = '/assets/infrastructure/operations-loop.m3u8';
const MP4_SRC = '/assets/infrastructure/operations-loop.mp4';

async function sourceExists(url) {
  try {
    const res = await fetch(url, { method: 'HEAD' });
    const type = res.headers.get('content-type') || '';
    return res.ok && !type.includes('text/html');
  } catch {
    return false;
  }
}

export default function HlsVideoCircle() {
  const videoRef = useRef(null);
  const [mode, setMode] = useState('checking'); // 'hls' | 'mp4' | 'fallback' | 'checking'

  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (await sourceExists(HLS_SRC)) {
        if (!cancelled) setMode('hls');
        return;
      }
      if (await sourceExists(MP4_SRC)) {
        if (!cancelled) setMode('mp4');
        return;
      }
      if (!cancelled) setMode('fallback');
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (mode !== 'hls') return undefined;
    const video = videoRef.current;
    if (!video) return undefined;

    // Safari plays HLS natively.
    if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = HLS_SRC;
      return undefined;
    }

    let hls = null;
    let cancelled = false;
    import('hls.js').then(({ default: Hls }) => {
      if (cancelled) return;
      if (Hls.isSupported()) {
        hls = new Hls();
        hls.loadSource(HLS_SRC);
        hls.attachMedia(video);
      } else {
        setMode('fallback');
      }
    });

    return () => {
      cancelled = true;
      if (hls) hls.destroy();
    };
  }, [mode]);

  const circleClass =
    'relative overflow-hidden rounded-full ' +
    'h-[clamp(200px,22vw,400px)] w-[clamp(200px,22vw,400px)]';

  if (mode === 'hls' || mode === 'mp4') {
    return (
      <div className={circleClass} style={{ boxShadow: '0 20px 60px rgba(12,68,124,0.25)' }}>
        <video
          ref={videoRef}
          src={mode === 'mp4' ? MP4_SRC : undefined}
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-label="Sensify operations loop"
        />
      </div>
    );
  }

  // Fallback animated orb — subtle rotating conic sheen + two pulsing rings.
  return (
    <div
      className={circleClass}
      style={{ boxShadow: '0 20px 60px rgba(12,68,124,0.25)' }}
      role="img"
      aria-label="Abstract animation representing the Sensify operations loop"
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 32% 28%, #378ADD 0%, #0C447C 48%, #07111C 82%, #030609 100%)',
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            'conic-gradient(from 0deg, transparent 0deg, rgba(245,247,250,0.14) 70deg, transparent 140deg, rgba(216,90,48,0.22) 230deg, transparent 300deg)',
          animation: 'sensify-orb-rotate 14s linear infinite',
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-[12%] rounded-full border border-[rgba(245,247,250,0.22)]"
        style={{ animation: 'sensify-orb-pulse 5s ease-in-out infinite' }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-[26%] rounded-full border border-[rgba(216,90,48,0.35)]"
        style={{ animation: 'sensify-orb-pulse 5s ease-in-out 1.2s infinite' }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-[42%] rounded-full bg-[rgba(245,247,250,0.08)] backdrop-blur-sm"
      />
    </div>
  );
}
