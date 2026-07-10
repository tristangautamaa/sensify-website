import './AiLoader.css';

// Full-screen branded entry loader. Shown on every full page load —
// visibility is driven purely by the `isLoading` prop (no storage-based
// skip logic), so refreshes and direct visits always see it.
export default function AiLoader({
  size = 180,
  text = 'Sensify',
  subtitle = 'Preparing owned channel',
  isLoading = true
}) {
  const letters = text.split('');

  return (
    <div
      className={`ai-loader-overlay${isLoading ? '' : ' is-hidden'}`}
      aria-hidden={!isLoading}
      aria-busy={isLoading}
    >
      <div className="ai-loader-shell">
        <div className="ai-loader-orb" style={{ width: size, height: size }}>
          <div className="ai-loader-letters" aria-label={text}>
            {letters.map((letter, index) => (
              <span
                key={`${letter}-${index}`}
                className="ai-loader-letter"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {letter === ' ' ? '\u00A0' : letter}
              </span>
            ))}
          </div>

          <div className="ai-loader-circle" aria-hidden="true" />
        </div>

        {subtitle ? <p className="ai-loader-subtitle">{subtitle}</p> : null}
      </div>
    </div>
  );
}
