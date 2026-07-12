import FadeUp from '../ui/FadeUp.jsx';
import SmartFAQ from './SmartFAQ.jsx';

/**
 * FAQ section wrapping the SmartFAQ widget with Sensify's default entries.
 */
const FAQ_ENTRIES = [
  {
    title: 'What does Sensify do?',
    keywords: 'sensify, what does sensify do, what is sensify, about sensify',
    answer:
      'Sensify helps brands build and maintain their own official website, so they are not fully dependent on marketplaces. The goal is to create an owned channel where the brand can control its story, product journey, campaign pages, checkout paths, and long-term customer relationship.',
    ctaText: 'See how Sensify works',
    ctaLink: '#system',
  },
  {
    title: 'Is Sensify just a web design service?',
    keywords: 'web design, design service, agency, just design, more than design',
    answer:
      'No. Sensify is not only about making a website look good. It focuses on building an owned-channel system for brands, including website structure, product presentation, campaign flows, payment direction, maintenance, and future growth outside marketplace-only selling.',
    ctaText: 'See the system',
    ctaLink: '#system',
  },
  {
    title: 'Do I still need marketplaces?',
    keywords: 'marketplace, marketplaces, still need marketplaces, shopee, tokopedia, tiktok shop',
    answer:
      'Yes. Marketplaces can still be useful for reach, traffic, and discovery. Sensify does not ask brands to abandon marketplaces. Instead, it helps brands create a second channel that they own, so the business is not fully controlled by marketplace rules, fees, ranking, or layout limitations.',
    ctaText: 'Plan my second channel',
    ctaLink: '#contact',
  },
  {
    title: 'Why is marketplace-only selling risky?',
    keywords: 'marketplace risk, risky, marketplace only, dependency, algorithm, discount pressure',
    answer:
      'Marketplace-only selling can make a brand dependent on platform algorithms, discount pressure, limited customer data, and standardized product pages. This makes it harder for the brand to build identity, loyalty, and a customer journey that feels truly owned.',
    ctaText: 'See the dependency shift',
    ctaLink: '#dependency',
  },
  {
    title: 'What does an owned website give my brand?',
    keywords: 'owned website, owned channel, ownership, control, brand control',
    answer:
      'An owned website gives your brand more control over how customers experience your products. You can shape the homepage, product storytelling, campaign pages, checkout flow, content, analytics, and customer education without being limited by marketplace templates.',
    ctaText: 'See ownership',
    ctaLink: '#ownership',
  },
  {
    title: 'Who is Sensify suitable for?',
    keywords: 'who is it for, suitable, fashion, lifestyle, beauty, growing brands',
    answer:
      'Sensify is suitable for growing brands that already sell through marketplaces, Instagram, TikTok Shop, or offline channels, but want a more serious official website. It is especially useful for fashion, lifestyle, beauty, product, and niche brands that care about presentation and long-term brand ownership.',
    ctaText: 'Start with consultation',
    ctaLink: '#contact',
  },
  {
    title: 'What pages can Sensify build?',
    keywords: 'pages, homepage, product pages, campaign landing pages, catalog, build',
    answer:
      'A Sensify website can include a homepage, brand story, product catalog, product detail pages, campaign landing pages, FAQ, checkout direction, payment information, AI shopping assistant preview, and other sections based on the brand’s needs.',
    ctaText: 'See the system',
    ctaLink: '#system',
  },
  {
    title: 'Do I need a full custom e-commerce platform from the start?',
    keywords: 'full platform, custom ecommerce, e-commerce platform, overbuild, from the start',
    answer:
      'Not always. Many brands should start with a focused launch scope first, then expand over time. Sensify helps avoid overbuilding by creating the most important owned-channel experience first, then improving it through maintenance and future updates.',
    ctaText: 'Plan a focused scope',
    ctaLink: '#contact',
  },
  {
    title: 'Can the website match my brand style?',
    keywords: 'brand style, match my brand, look and feel, visual identity, premium presentation',
    answer:
      'Yes. The website direction should follow the brand’s product, audience, photography, tone, and desired level of premium presentation. Sensify should not make every brand look the same.',
    ctaText: 'Discuss your direction',
    ctaLink: '#contact',
  },
  {
    title: 'What payment methods can the website support?',
    keywords: 'payment, payments, qris, virtual account, bank transfer, e-wallet, payment methods',
    answer:
      'The website can support familiar payment paths such as QRIS, virtual accounts, bank transfer, e-wallets, cards, and assisted checkout. The final setup depends on the payment gateway and operational flow chosen by the brand.',
    ctaText: 'See payment paths',
    ctaLink: '#dependency',
  },
  {
    title: 'Can customers checkout directly from the website?',
    keywords: 'checkout, direct checkout, buy directly, order from website, whatsapp',
    answer:
      'Yes, the website can be designed with a direct checkout journey. For brands that still prefer a more personal sales flow, Sensify can also support assisted checkout, such as directing customers to WhatsApp or another confirmation process.',
    ctaText: 'Plan my checkout flow',
    ctaLink: '#contact',
  },
  {
    title: 'What is the Sensify AI Assistant?',
    keywords: 'ai assistant, assistant, what is the ai assistant, shopping assistant, chatbot, product questions',
    answer:
      'The Sensify AI Assistant is a shopping assistant concept for the brand’s own website. It helps customers ask about products, compare options, check prices and promos, and get payment or shipping guidance without leaving the brand’s website.',
    ctaText: 'Try the assistant preview',
    ctaLink: '#assistant',
  },
  {
    title: 'Is the AI Assistant connected to real product data?',
    keywords: 'real product data, connected, integration, sample data, backend, production',
    answer:
      'In the current preview, the assistant runs on scripted sample responses to show how the experience works. In production, it can be connected safely to the brand’s real product catalog, policies, inventory, or checkout logic through a backend integration.',
    ctaText: 'Discuss integration',
    ctaLink: '#contact',
  },
  {
    title: 'Can Sensify maintain the website after launch?',
    keywords: 'maintenance, maintain, after launch, updates, bug fixes, support',
    answer:
      'Yes. Maintenance is a core part of Sensify. After launch, Sensify can help update products, adjust campaign pages, fix bugs, improve performance, refresh content, and keep the website aligned with the brand’s current activity.',
    ctaText: 'Ask about maintenance',
    ctaLink: '#contact',
  },
  {
    title: 'What happens when my products or campaigns change?',
    keywords: 'campaign updates, campaigns change, products change, price change, new products, refresh',
    answer:
      'Sensify can help update the website when the brand launches new products, changes prices, runs campaigns, updates visuals, or needs new landing pages. The goal is to keep the website active instead of letting it become outdated after launch.',
    ctaText: 'Plan ongoing updates',
    ctaLink: '#contact',
  },
  {
    title: 'How long does it take to launch?',
    keywords: 'timeline, how long, duration, launch, go live',
    answer:
      'The timeline depends on the number of pages, product complexity, content readiness, and required integrations. A focused first version can usually be launched faster than a full custom platform, then improved gradually after going live.',
    ctaText: 'Book a planning call',
    ctaLink: '#contact',
  },
  {
    title: 'Can we start small first?',
    keywords: 'start small, phased, first version, expand later, small scope',
    answer:
      'Yes. Sensify is designed to support a phased approach. A brand can start with a strong homepage, selected product pages, and one campaign flow, then expand into a fuller website system after the first version is live.',
    ctaText: 'Plan phase one',
    ctaLink: '#contact',
  },
  {
    title: 'What do I need to prepare before starting?',
    keywords: 'prepare, preparation, what to prepare, photos, content ready, before starting, checklist',
    answer:
      'It helps to prepare product photos, product names, prices, descriptions, brand story, payment preferences, shipping rules, and examples of websites you like. Sensify can help organize these into a clear website structure.',
    ctaText: 'Prepare checklist',
    ctaLink: '#contact',
  },
  {
    title: 'How is the cost decided?',
    keywords: 'cost, pricing, price, budget, how much, investment',
    answer:
      'Cost depends on the scope of the website, number of pages, product structure, visual complexity, integrations, and maintenance needs. Sensify should begin by mapping what the brand actually needs, so the project does not become overbuilt or unclear.',
    ctaText: 'Map my scope',
    ctaLink: '#contact',
  },
  {
    title: 'How do we start?',
    keywords: 'how to start, get started, consultation, begin, first step',
    answer:
      'The best starting point is a consultation. Sensify can review your current marketplace setup, product structure, brand direction, and business goals, then recommend the first owned-channel website scope.',
    ctaText: 'Book a consultation',
    ctaLink: '#contact',
  },
];

export default function SmartFAQSection() {
  return (
    <section
      id="faq"
      data-header-theme="dark"
      className="dark-flow-section relative overflow-hidden px-6 py-24 text-[#F5F7FA] md:px-12 md:py-32"
    >
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(50% 40% at 20% 26%, rgba(12,68,124,0.18), transparent 60%), radial-gradient(40% 35% at 85% 74%, rgba(216,90,48,0.08), transparent 60%)',
        }}
      />

      <div className="relative mx-auto w-full max-w-[880px]">
        <FadeUp className="mb-10 text-center md:mb-14">
          <p className="font-mono mb-6 text-[0.66rem] font-medium tracking-[0.34em] text-[#378ADD]">
            SMART FAQ
          </p>
          <h2 className="font-display text-4xl leading-[1.08] md:text-5xl">
            Ask Sensify before you move <em>beyond marketplaces.</em>
          </h2>
        </FadeUp>

        <FadeUp delay={0.12}>
          <SmartFAQ
            title="Questions before building your owned channel?"
            placeholder="Ask about pricing, maintenance, payments, marketplaces, timeline..."
            faqEntries={FAQ_ENTRIES}
          />
        </FadeUp>
      </div>
    </section>
  );
}
