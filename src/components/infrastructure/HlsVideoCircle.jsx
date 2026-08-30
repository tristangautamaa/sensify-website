/**
 * Circular operations visual — an animated CSS orb (rotating conic sheen +
 * two pulsing rings). Self-contained, no media assets.
 *
 * This started as a video circle with HLS/MP4 source probing and a graceful
 * orb fallback, but the operations-loop clip was never produced, so every
 * load fired two dead HEAD requests (and shipped hls.js) only to land on the
 * orb anyway. If a real clip is added later, reintroduce a lazy <video>
 * here.
 */
const circleClass =
  'relative overflow-hidden rounded-full ' +
  'h-[clamp(200px,22vw,400px)] w-[clamp(200px,22vw,400px)]';

export default function HlsVideoCircle() {
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
