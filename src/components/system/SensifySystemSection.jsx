import { ArrowUpRight } from 'lucide-react';

import FadeUp from '../ui/FadeUp.jsx';
import SystemChamferCard from './SystemChamferCard.jsx';

const CLIP_PATHS = [
  'polygon(64px 0, calc(100% - 14px) 0, calc(100% - 4px) 4px, 100% 14px, 100% calc(100% - 14px), calc(100% - 4px) calc(100% - 4px), calc(100% - 14px) 100%, 14px 100%, 4px calc(100% - 4px), 0 calc(100% - 14px), 0 64px)',
  'polygon(0 14px, 4px 4px, 14px 0, calc(100% - 64px) 0, 100% 64px, 100% calc(100% - 14px), calc(100% - 4px) calc(100% - 4px), calc(100% - 14px) 100%, 64px 100%, 0 calc(100% - 64px))',
  'polygon(0 14px, 4px 4px, 14px 0, calc(100% - 64px) 0, 100% 64px, 100% calc(100% - 64px), calc(100% - 64px) 100%, 14px 100%, 4px calc(100% - 4px), 0 calc(100% - 14px))',
];

const SYSTEM_PILLARS = [
  {
    label: 'BUILD',
    value: 'Build',
    text: 'Official website, product catalog, campaign landing pages, product detail pages, analytics setup, and mobile-first interface.',
    accent: '#0C447C',
    background: 'linear-gradient(140deg, #0C447C 0%, #07111C 62%, #030609 100%)',
    offset: false,
    delay: 0.1,
  },
  {
    label: 'MOVE',
    value: 'Move',
    text: 'Translate marketplace structure into owned customer journeys, campaign flows, content hierarchy, and conversion paths.',
    accent: '#378ADD',
    background: 'linear-gradient(140deg, #1d5fa6 0%, #0C447C 55%, #07111C 100%)',
    offset: true,
    delay: 0.2,
  },
  {
    label: 'MAINTAIN',
    value: 'Maintain',
    text: 'Monthly catalog updates, landing page edits, bug fixes, campaign changes, performance checks, and technical support.',
    accent: '#D85A30',
    background: 'linear-gradient(140deg, #6e2a13 0%, #2a1008 45%, #07111C 100%)',
    offset: false,
    delay: 0.3,
  },
];

export default function SensifySystemSection() {
  return (
    <section
      id="system"
      className="relative flex min-h-screen flex-col justify-center bg-[#F5F7FA] px-6 py-20 sm:px-10 sm:py-28"
    >
      <div className="mx-auto w-full max-w-[1280px]">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:items-end">
          <FadeUp>
            <p className="mb-6 text-[0.68rem] font-semibold tracking-[0.34em] text-[#D85A30]">
              THE SENSIFY SYSTEM
            </p>
            <h2 className="font-display text-5xl leading-[1.04] text-[#0C447C] md:text-7xl">
              One system
              <br />
              to <em>build, move,</em>
              <br />
              and <em>maintain.</em>
            </h2>
          </FadeUp>

          <FadeUp delay={0.15} className="lg:pb-2">
            <p className="max-w-[460px] text-[15px] leading-[1.75] text-[rgba(12,68,124,0.7)]">
              Sensify turns marketplace-dependent selling into an owned digital commerce system. We
              help structure the website, move the brand journey outside the marketplace, and
              maintain the system after launch.
            </p>
            <a
              href="#infrastructure"
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-[rgba(12,68,124,0.2)] bg-transparent px-5 py-2.5 text-[0.8rem] font-semibold text-[#0C447C] transition-colors hover:border-[#0C447C] hover:bg-[rgba(12,68,124,0.08)]"
            >
              View the operating system
              <ArrowUpRight size={15} strokeWidth={2.5} aria-hidden="true" />
            </a>
          </FadeUp>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {SYSTEM_PILLARS.map((pillar, index) => (
            <SystemChamferCard key={pillar.label} {...pillar} clipPath={CLIP_PATHS[index]} />
          ))}
        </div>
      </div>

      {/* Bottom fade into the section background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-40 sm:h-56"
        style={{
          background:
            'linear-gradient(to bottom, rgba(245,247,250,0) 0%, rgba(245,247,250,0.7) 60%, #F5F7FA 100%)',
        }}
      />
    </section>
  );
}
