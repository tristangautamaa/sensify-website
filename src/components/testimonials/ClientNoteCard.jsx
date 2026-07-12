import { useState } from 'react';
import { motion } from 'motion/react';

/**
 * Email-client-style note card for early Sensify client references. Shows the
 * brand logo (with initials fallback if the image fails), sender and project,
 * a short quote, focus tags, and a system-focus line tying the note back to
 * the part of the Sensify system it relates to.
 */
export default function ClientNoteCard({
  avatarSrc,
  avatarAlt,
  avatarFallback,
  senderName,
  project,
  label,
  message,
  tags = [],
  focusNote,
  accent = '#378ADD',
  delay = 0,
}) {
  const [logoFailed, setLogoFailed] = useState(false);
  const showLogo = Boolean(avatarSrc) && !logoFailed;

  return (
    <motion.article
      className="flex h-full flex-col overflow-hidden rounded-3xl border border-[rgba(245,247,250,0.12)]"
      style={{ background: 'rgba(245,247,250,0.04)' }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.7, ease: 'easeOut', delay }}
    >
      {/* Header: logo + sender + note label */}
      <header className="flex items-center gap-3.5 border-b border-[rgba(245,247,250,0.1)] p-5">
        <span
          className="font-display flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full text-sm text-[#F5F7FA]"
          style={{
            border: `1px solid ${accent}`,
            // Dark surface behind logos: the white-on-transparent marks need it to read.
            background: showLogo
              ? 'rgba(3,6,9,0.55)'
              : `linear-gradient(140deg, ${accent}30, transparent 70%)`,
          }}
          aria-hidden={showLogo ? undefined : true}
        >
          {showLogo ? (
            <img
              src={avatarSrc}
              alt={avatarAlt}
              loading="lazy"
              className="h-full w-full object-contain p-1.5"
              onError={() => setLogoFailed(true)}
            />
          ) : (
            avatarFallback
          )}
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-[14px] font-semibold break-words text-[#F5F7FA]">{senderName}</p>
          <p className="font-mono mt-0.5 text-[0.58rem] tracking-[0.16em] text-[rgba(245,247,250,0.45)] uppercase">
            {project}
          </p>
        </div>
        <span
          className="font-mono shrink-0 rounded-full border px-2.5 py-1 text-[0.52rem] tracking-[0.14em] uppercase"
          style={{ borderColor: `${accent}66`, color: accent }}
        >
          {label}
        </span>
      </header>

      {/* Message body */}
      <div className="flex-1 p-5">
        <p className="text-[14px] leading-[1.7] text-[rgba(245,247,250,0.8)]">
          &ldquo;{message}&rdquo;
        </p>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 px-5 pb-4">
        {tags.map((tag) => (
          <span
            key={tag}
            className="font-mono rounded-full border border-[rgba(245,247,250,0.14)] px-3 py-1 text-[0.56rem] tracking-[0.14em] text-[rgba(245,247,250,0.6)] uppercase"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* System focus row */}
      {focusNote && (
        <div className="border-t border-[rgba(245,247,250,0.1)] p-4">
          <div className="flex items-center justify-between gap-3 rounded-full border border-[rgba(245,247,250,0.1)] bg-[rgba(3,6,9,0.5)] px-4 py-2.5">
            <span className="text-[12px] leading-[1.5] text-[rgba(245,247,250,0.5)]">{focusNote}</span>
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 shrink-0 rounded-full"
              style={{ background: accent, opacity: 0.6 }}
            />
          </div>
        </div>
      )}
    </motion.article>
  );
}
