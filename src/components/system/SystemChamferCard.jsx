import { motion } from 'motion/react';

import { cn } from '../../utils/cn.js';

/**
 * Chamfered (angular clip-path) card for the Build / Move / Maintain pillars.
 * The outer wrapper carries a translucent white rim by clipping both the
 * 1.5px-padded outer shell and the inner surface with the same polygon.
 */
export default function SystemChamferCard({
  label,
  value,
  text,
  accent,
  clipPath,
  background,
  offset = false,
  delay = 0,
}) {
  return (
    <motion.div
      className={cn('relative h-[280px] w-full sm:h-[340px]', offset && 'lg:mt-24')}
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.8, ease: 'easeOut', delay }}
    >
      <div
        className="h-full w-full"
        style={{ clipPath, background: 'rgba(255,255,255,0.8)', padding: '1.5px' }}
      >
        {/* TODO: Replace gradient with art-directed system image. */}
        <div
          className="relative h-full w-full overflow-hidden bg-cover bg-center"
          style={{ clipPath, background }}
        >
          {/* Accent wash keyed to the pillar color */}
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              background: `radial-gradient(90% 70% at 80% 0%, ${accent}55, transparent 60%)`,
            }}
          />
          {/* Legibility scrim */}
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to top, rgba(3,6,9,0.72) 0%, rgba(3,6,9,0.12) 55%)',
            }}
          />

          <div className="relative flex h-full flex-col justify-between p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full" style={{ background: accent }} />
              <span className="text-[0.66rem] font-semibold tracking-[0.3em] text-[rgba(245,247,250,0.75)]">
                {label}
              </span>
            </div>

            <div>
              <p className="font-display text-4xl text-[#F5F7FA] italic sm:text-5xl">{value}</p>
              <p className="mt-3 max-w-[34ch] text-[13px] leading-[1.65] text-[rgba(245,247,250,0.72)]">
                {text}
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
