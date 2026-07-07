import { useCallback, useEffect, useRef, useState } from 'react';
import { RotateCcw } from 'lucide-react';

/**
 * SmartFAQ — interactive FAQ widget.
 *
 * The user types a question; findBestMatch scores every FAQ entry by
 * keyword overlap and the best match renders with a typewriter animation,
 * an optional confidence badge, and a CTA footer. No external services —
 * pure client-side keyword scoring.
 */

/* ---------------- matching ---------------- */

function findBestMatch(query, faqEntries) {
  const q = (query || '').toLowerCase().trim();
  if (!q) return null;

  const words = q.split(/\s+/).filter((w) => w.length > 2);
  let best = null;
  let bestScore = 0;

  for (const entry of faqEntries) {
    const keywordString = entry.keywords.toLowerCase();
    const keywords = keywordString
      .split(',')
      .map((k) => k.trim())
      .filter(Boolean);
    const answerText = entry.answer.toLowerCase();

    let score = 0;
    if (keywordString && q.includes(keywordString)) score += 100;
    for (const word of words) {
      if (keywords.some((k) => k.includes(word) || word.includes(k))) score += 50;
      if (answerText.includes(word)) score += 10;
    }

    if (score > bestScore) {
      bestScore = score;
      best = entry;
    }
  }

  return bestScore > 0 ? { entry: best, score: bestScore } : null;
}

/* ---------------- typewriter ---------------- */

function planPauses(length) {
  const count = 1 + Math.floor(Math.random() * 3); // 1-3 pause points
  const points = new Set();
  for (let i = 0; i < count; i += 1) {
    points.add(Math.floor(length * (0.15 + Math.random() * 0.7)));
  }
  return points;
}

function TypewriterText({ text, reduced = false, onProgress }) {
  const [count, setCount] = useState(reduced ? text.length : 0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (reduced) {
      setCount(text.length);
      onProgress?.({ percent: 100, isTyping: false, isPaused: false });
      return undefined;
    }

    setCount(0);
    const pauses = planPauses(text.length);
    let i = 0;
    let timeoutId = 0;
    let cancelled = false;

    const tick = () => {
      if (cancelled) return;
      i += 1;
      setCount(i);
      const done = i >= text.length;
      const isPause = !done && pauses.has(i);
      setPaused(isPause);
      onProgress?.({
        percent: Math.round((i / text.length) * 100),
        isTyping: !done,
        isPaused: isPause,
      });
      if (done) return;
      const delay = isPause ? 300 + Math.random() * 1200 : 25 + Math.random() * 20;
      timeoutId = window.setTimeout(tick, delay);
    };

    timeoutId = window.setTimeout(tick, 120);
    return () => {
      cancelled = true;
      window.clearTimeout(timeoutId);
    };
  }, [text, reduced, onProgress]);

  const complete = count >= text.length;

  return (
    <span>
      {text.slice(0, count)}
      {!complete && (
        <span
          aria-hidden="true"
          className="ml-[1px] inline-block h-[1em] w-[2px] translate-y-[0.15em] bg-[#D85A30]"
          style={{ animation: paused ? 'none' : 'sensify-caret-blink 0.85s step-end infinite' }}
        />
      )}
    </span>
  );
}

/* ---------------- CTA ---------------- */

function CTAButton({ ctaText, ctaLink, accentColor, ctaTextColor }) {
  const [notice, setNotice] = useState(false);
  const noticeTimer = useRef(0);

  useEffect(() => () => window.clearTimeout(noticeTimer.current), []);

  const isValidHref =
    typeof ctaLink === 'string' && /^(#|\/|https?:\/\/|mailto:)/.test(ctaLink.trim());
  const isExternal = /^https?:\/\//.test((ctaLink || '').trim());

  const pillClass =
    'inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[0.78rem] font-semibold transition-transform duration-300 hover:-translate-y-[1px] active:scale-[0.98]';
  const pillStyle = { background: accentColor, color: ctaTextColor };

  if (isValidHref) {
    return (
      <a
        href={ctaLink}
        className={pillClass}
        style={pillStyle}
        {...(isExternal ? { target: '_blank', rel: 'noreferrer' } : {})}
      >
        {ctaText}
      </a>
    );
  }

  return (
    <span className="inline-flex items-center gap-3">
      <button
        type="button"
        className={pillClass}
        style={pillStyle}
        onClick={() => {
          setNotice(true);
          window.clearTimeout(noticeTimer.current);
          noticeTimer.current = window.setTimeout(() => setNotice(false), 2000);
        }}
      >
        {ctaText}
      </button>
      {notice && (
        <span className="font-mono text-[0.6rem] tracking-[0.12em] text-[rgba(245,247,250,0.5)]">
          Connect to a link or page
        </span>
      )}
    </span>
  );
}

/* ---------------- decorative dot grid ---------------- */

const GRID_ROWS = 6;
const GRID_COLS = 20;

function GridCircles({ active, reduced, containerRef }) {
  const dotRefs = useRef([]);
  const centersRef = useRef(null);

  // Random pulses while the typewriter is running.
  useEffect(() => {
    if (reduced || !active) return undefined;
    const intervalId = window.setInterval(() => {
      const picks = 1 + Math.floor(Math.random() * 3);
      for (let i = 0; i < picks; i += 1) {
        const dot = dotRefs.current[Math.floor(Math.random() * GRID_ROWS * GRID_COLS)];
        if (!dot) continue;
        dot.style.transform = 'scale(2.1)';
        dot.style.opacity = '0.9';
        window.setTimeout(() => {
          dot.style.transform = 'scale(1)';
          dot.style.opacity = '';
        }, 1000);
      }
    }, 150);
    return () => window.clearInterval(intervalId);
  }, [active, reduced]);

  // Mouse-proximity repel within 100px (fine pointers, motion allowed).
  useEffect(() => {
    const container = containerRef.current;
    if (!container || reduced) return undefined;
    if (!window.matchMedia('(pointer: fine)').matches) return undefined;

    let rafId = 0;

    const measure = () => {
      const base = container.getBoundingClientRect();
      centersRef.current = dotRefs.current.map((dot) => {
        if (!dot) return null;
        const r = dot.getBoundingClientRect();
        return { x: r.left - base.left + r.width / 2, y: r.top - base.top + r.height / 2 };
      });
    };

    const onMove = (event) => {
      cancelAnimationFrame(rafId);
      const base = container.getBoundingClientRect();
      const mx = event.clientX - base.left;
      const my = event.clientY - base.top;
      rafId = requestAnimationFrame(() => {
        if (!centersRef.current) measure();
        centersRef.current.forEach((c, i) => {
          const dot = dotRefs.current[i];
          if (!dot || !c) return;
          const dx = c.x - mx;
          const dy = c.y - my;
          const dist = Math.hypot(dx, dy);
          if (dist < 100 && dist > 0.001) {
            const push = ((100 - dist) / 100) * 10;
            dot.style.translate = `${((dx / dist) * push).toFixed(1)}px ${((dy / dist) * push).toFixed(1)}px`;
          } else if (dot.style.translate) {
            dot.style.translate = '0px 0px';
          }
        });
      });
    };

    const onLeave = () => {
      cancelAnimationFrame(rafId);
      dotRefs.current.forEach((dot) => {
        if (dot) dot.style.translate = '0px 0px';
      });
    };

    const onResize = () => {
      centersRef.current = null;
    };

    container.addEventListener('pointermove', onMove);
    container.addEventListener('pointerleave', onLeave);
    window.addEventListener('resize', onResize);
    return () => {
      cancelAnimationFrame(rafId);
      container.removeEventListener('pointermove', onMove);
      container.removeEventListener('pointerleave', onLeave);
      window.removeEventListener('resize', onResize);
    };
  }, [containerRef, reduced]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-6 top-16 bottom-6 grid opacity-40"
      style={{
        gridTemplateRows: `repeat(${GRID_ROWS}, 1fr)`,
        gridTemplateColumns: `repeat(${GRID_COLS}, 1fr)`,
      }}
    >
      {Array.from({ length: GRID_ROWS * GRID_COLS }).map((_, i) => (
        <span key={i} className="flex items-center justify-center">
          <span
            ref={(el) => {
              dotRefs.current[i] = el;
            }}
            className="h-[3px] w-[3px] rounded-full bg-[rgba(245,247,250,0.35)]"
            style={{ transition: 'transform 0.5s ease, opacity 0.5s ease, translate 0.35s ease' }}
          />
        </span>
      ))}
    </div>
  );
}

/* ---------------- widget ---------------- */

const DEFAULT_COLORS = {
  backgroundColor: 'rgba(245,247,250,.04)',
  textColor: '#F5F7FA',
  accentColor: '#D85A30',
  secondaryAccent: '#378ADD',
  inputBackground: 'rgba(3,6,9,.6)',
  borderColor: 'rgba(245,247,250,.12)',
  ctaTextColor: '#F5F7FA',
  topicTitleColor: '#F5F7FA',
};

export default function SmartFAQ({
  title = 'Ask a Question',
  placeholder = 'Type your question here...',
  faqEntries = [],
  colors: colorsProp,
  borderRadius = 28,
  showShadows = true,
  showConfidence = true,
}) {
  const colors = { ...DEFAULT_COLORS, ...colorsProp };

  const cardRef = useRef(null);
  const [query, setQuery] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [match, setMatch] = useState(null); // { entry, score } | 'none' | null
  const [typing, setTyping] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return undefined;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0.15,
    });
    io.observe(card);
    return () => io.disconnect();
  }, []);

  const search = () => {
    if (!query.trim()) return;
    const result = findBestMatch(query, faqEntries);
    setMatch(result || 'none');
    setSubmitted(true);
  };

  const reset = () => {
    setSubmitted(false);
    setMatch(null);
    setQuery('');
    setTyping(false);
  };

  const askWith = (text) => {
    setQuery(text);
    const result = findBestMatch(text, faqEntries);
    setMatch(result || 'none');
    setSubmitted(true);
  };

  const onProgress = useCallback(({ isTyping }) => {
    setTyping(isTyping);
  }, []);

  const suggestions = faqEntries
    .slice(0, 6)
    .map((entry) => entry.keywords.split(',')[0].trim())
    .filter(Boolean);

  const confidence =
    match && match !== 'none' ? (match.score >= 100 ? 'High' : match.score >= 50 ? 'Medium' : 'Low') : null;

  return (
    <div
      ref={cardRef}
      className="relative w-full overflow-hidden border p-6 md:p-10"
      style={{
        background: colors.backgroundColor,
        borderColor: colors.borderColor,
        color: colors.textColor,
        borderRadius: `${borderRadius}px`,
        boxShadow: showShadows ? '0 40px 120px rgba(0,0,0,0.4)' : 'none',
      }}
    >
      <GridCircles active={typing && inView} reduced={reduced} containerRef={cardRef} />

      {/* Title */}
      <h3 className="font-display relative text-2xl md:text-3xl" style={{ color: colors.topicTitleColor }}>
        {title}
      </h3>

      {/* Search row */}
      <div className="relative mt-6 flex gap-3">
        <input
          type="text"
          value={query}
          disabled={submitted}
          aria-label="Ask Sensify a question"
          placeholder={placeholder}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') search();
          }}
          className="h-12 min-w-0 flex-1 rounded-full border px-5 text-[14px] outline-none placeholder:text-[rgba(245,247,250,0.35)] focus-visible:border-[#378ADD] disabled:opacity-50"
          style={{
            background: colors.inputBackground,
            borderColor: colors.borderColor,
            color: colors.textColor,
          }}
        />
        <button
          type="button"
          onClick={submitted ? reset : search}
          aria-label={submitted ? 'Ask another question' : 'Search the FAQ'}
          className="flex h-12 shrink-0 items-center justify-center rounded-full px-6 text-[0.82rem] font-semibold transition-transform duration-300 hover:-translate-y-[1px] active:scale-[0.98]"
          style={{ background: colors.accentColor, color: colors.ctaTextColor }}
        >
          {submitted ? <RotateCcw size={17} strokeWidth={2.4} aria-hidden="true" /> : 'Ask'}
        </button>
      </div>

      {/* Result area */}
      <div className="relative mt-8 min-h-[150px]" aria-live="polite">
        {!submitted && (
          <p className="flex h-full min-h-[150px] items-center justify-center text-center text-[13.5px] text-[rgba(245,247,250,0.4)]">
            Type a question about moving beyond marketplaces, payments, maintenance, or timelines.
          </p>
        )}

        {submitted && match === 'none' && (
          <div>
            <p className="text-[14.5px] text-[rgba(245,247,250,0.75)]">
              We could not find an exact answer. Try one of these topics.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {suggestions.map((chip) => (
                <button
                  key={chip}
                  type="button"
                  onClick={() => {
                    reset();
                    askWith(chip);
                  }}
                  className="font-mono rounded-full border px-4 py-1.5 text-[0.62rem] tracking-[0.14em] uppercase transition-colors hover:border-[#378ADD] hover:text-[#378ADD]"
                  style={{ borderColor: colors.borderColor, color: 'rgba(245,247,250,0.65)' }}
                >
                  {chip}
                </button>
              ))}
            </div>
          </div>
        )}

        {submitted && match && match !== 'none' && (
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h4 className="font-display text-lg md:text-xl" style={{ color: colors.topicTitleColor }}>
                {match.entry.title}
              </h4>
              {showConfidence && (
                <span
                  className="font-mono rounded-full border px-2.5 py-0.5 text-[0.52rem] tracking-[0.16em] uppercase"
                  style={{
                    borderColor: `${colors.secondaryAccent}66`,
                    color: colors.secondaryAccent,
                  }}
                >
                  {confidence} match
                </span>
              )}
            </div>
            <p className="mt-4 max-w-[62ch] text-[14.5px] leading-[1.75] text-[rgba(245,247,250,0.78)]">
              <TypewriterText text={match.entry.answer} reduced={reduced} onProgress={onProgress} />
            </p>
            {match.entry.ctaText && (
              <div className="mt-6">
                <CTAButton
                  ctaText={match.entry.ctaText}
                  ctaLink={match.entry.ctaLink}
                  accentColor={colors.accentColor}
                  ctaTextColor={colors.ctaTextColor}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
