import { useEffect, useState } from 'react';

import './SiteLoader.css';

// Branded splash shown while the ShaderGradient hero warms up.
// Placeholder animation — will be replaced with the final loader later.
export default function SiteLoader({ isLoading }) {
  const [mounted, setMounted] = useState(true);

  // Unmount after the CSS fade completes so the overlay never lingers.
  useEffect(() => {
    if (isLoading) return undefined;
    const timer = window.setTimeout(() => setMounted(false), 800);
    return () => window.clearTimeout(timer);
  }, [isLoading]);

  if (!mounted) return null;

  return (
    <div
      className={`site-loader${isLoading ? '' : ' is-hidden'}`}
      role="status"
      aria-live="polite"
      aria-label="Loading Sensify"
    >
      <div className="site-loader-inner">
        <img
          className="site-loader-mark"
          src="/Logo/sensify-mark.png"
          alt=""
          width="72"
          height="72"
        />
        <span className="site-loader-word">Sensify</span>
        <span className="site-loader-track" aria-hidden="true">
          <span className="site-loader-bar" />
        </span>
        <span className="site-loader-label">Preparing owned channel system</span>
      </div>
    </div>
  );
}
