import { motion } from 'motion/react';

/**
 * Dark glowing diagnostic card: blurred gradient halo behind a
 * gradient-bordered rounded card, fading up on scroll.
 */
export default function FeatureCard({ title, description, icon: Icon, gradient, delay = 0 }) {
  return (
    <motion.div
      className="group relative mx-auto flex w-full max-w-[260px] flex-col items-start justify-start md:max-w-[300px]"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.8, ease: 'easeOut', delay }}
    >
      {/* Blurred glow behind the card */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute h-[260px] w-full rounded-[40px] opacity-60 md:h-[300px]"
        style={{ background: gradient, filter: 'blur(45px)' }}
      />

      {/* Foreground card with gradient border */}
      <div
        className="relative z-10 h-[260px] self-stretch overflow-hidden rounded-[40px] md:h-[300px]"
        style={{
          border: '8px solid transparent',
          background: `linear-gradient(#1A1A1C, #1A1A1C) padding-box, ${gradient} border-box`,
        }}
      >
        <div className="flex h-full w-full flex-col justify-between p-7">
          <Icon size={32} strokeWidth={2.5} className="text-white/90" aria-hidden="true" />
          <div>
            <h3 className="mb-3 text-xl font-medium tracking-tight text-white">{title}</h3>
            <p className="text-[14px] leading-[1.6] font-normal text-gray-400 selection:bg-white/20">
              {description}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
