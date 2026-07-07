import { motion } from 'motion/react';

/**
 * Shared fade-up entrance used across the post-hero sections so the whole
 * page animates with one consistent rhythm.
 */
export default function FadeUp({ children, delay = 0, y = 26, className = '', as = 'div', ...rest }) {
  const Component = motion[as] ?? motion.div;

  return (
    <Component
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6, ease: 'easeOut', delay }}
      {...rest}
    >
      {children}
    </Component>
  );
}
