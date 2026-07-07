import { cn } from '../../utils/cn.js';

/**
 * Reusable near-white pill button with an animated text slide on hover.
 * Renders an anchor when `href` is provided, otherwise a button.
 */
export default function PrimaryButton({ href, children, className = '', ...rest }) {
  const Tag = href ? 'a' : 'button';

  return (
    <Tag
      href={href}
      className={cn(
        'group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full',
        'bg-[#F5F7FA] px-7 py-3.5 text-sm font-semibold tracking-wide text-[#07111C]',
        'transition-transform duration-300 hover:scale-[1.03] active:scale-[0.99]',
        className
      )}
      {...rest}
    >
      <span className="relative block overflow-hidden">
        <span className="block transition-transform duration-300 ease-out group-hover:-translate-y-[110%]">
          {children}
        </span>
        <span
          aria-hidden="true"
          className="absolute inset-0 block translate-y-[110%] transition-transform duration-300 ease-out group-hover:translate-y-0"
        >
          {children}
        </span>
      </span>
    </Tag>
  );
}
