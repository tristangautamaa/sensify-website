import { TrendingDown, UsersRound, Radar } from 'lucide-react';

import FadeUp from '../ui/FadeUp.jsx';
import FeatureCard from './FeatureCard.jsx';

const PROBLEM_CARDS = [
  {
    title: 'Margin leakage',
    icon: TrendingDown,
    description:
      'Marketplace fees, paid visibility, and discount pressure make growth feel busy while profit control becomes harder to protect.',
    gradient: 'linear-gradient(137deg, #D85A30 0%, #F5F7FA 48%, #378ADD 100%)',
    delay: 0.1,
  },
  {
    title: 'Customer distance',
    icon: UsersRound,
    description:
      'The buyer may know the platform before they know your brand. Data, retention, and the relationship stay outside your owned system.',
    gradient: 'linear-gradient(137deg, #F5F7FA 0%, #378ADD 45%, #0C447C 100%)',
    delay: 0.2,
  },
  {
    title: 'Algorithm dependency',
    icon: Radar,
    description:
      'Reach can change when rankings, ads, competition, or platform rules shift. Your brand needs a channel it can control.',
    gradient: 'linear-gradient(137deg, #0C447C 0%, #378ADD 45%, #D85A30 100%)',
    delay: 0.3,
  },
];

export default function ProblemCardsSection() {
  return (
    <section
      id="problem"
      className="flex min-h-screen flex-col items-center justify-center bg-[#0A0A0B] px-6 py-24 md:px-12"
    >
      <FadeUp className="mb-14 flex max-w-[760px] flex-col items-center text-center md:mb-20">
        <p className="mb-6 text-[0.68rem] font-semibold tracking-[0.34em] text-[#378ADD]">
          THE MARKETPLACE PROBLEM
        </p>
        <h2 className="font-display text-4xl leading-[1.12] text-[#F5F7FA] md:text-6xl">
          Marketplaces help you sell. But they were never built to make your brand{' '}
          <em>independent.</em>
        </h2>
        <p className="mt-6 max-w-[560px] text-[15px] leading-[1.7] text-[rgba(245,247,250,0.68)]">
          Marketplaces are powerful acquisition channels, but they also keep the customer
          relationship, the page experience, and much of the operating logic inside the platform.
        </p>
      </FadeUp>

      <div className="grid w-full max-w-[936px] grid-cols-1 gap-10 md:grid-cols-3 md:gap-3 lg:gap-3">
        {PROBLEM_CARDS.map((card) => (
          <FeatureCard key={card.title} {...card} />
        ))}
      </div>

      <FadeUp delay={0.35} className="mt-16 text-center">
        <p className="font-display text-lg text-[rgba(245,247,250,0.68)] italic md:text-xl">
          Marketplaces create reach. <span className="text-[#F5F7FA]">Sensify creates ownership.</span>
        </p>
      </FadeUp>
    </section>
  );
}
