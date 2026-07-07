import FadeUp from '../ui/FadeUp.jsx';
import SmartFAQ from './SmartFAQ.jsx';

/**
 * FAQ section wrapping the SmartFAQ widget with Sensify's default entries.
 */
const FAQ_ENTRIES = [
  {
    title: 'Do I still need marketplaces?',
    keywords: 'marketplace, marketplaces, shopee, tokopedia, tiktok shop, replace',
    answer:
      'Sensify is not meant to replace marketplaces immediately. Marketplaces can remain acquisition channels, while your official website becomes the owned channel for brand experience, campaigns, customer journey, and long-term control.',
    ctaText: 'Plan my transition',
    ctaLink: '#contact',
  },
  {
    title: 'What does Sensify build?',
    keywords: 'build, website, official website, deliverables',
    answer:
      'Sensify can build your official website, product catalog, landing pages, product detail pages, campaign pages, analytics setup, and conversion paths such as WhatsApp or checkout flows.',
    ctaText: 'See the system',
    ctaLink: '#system',
  },
  {
    title: 'Can Sensify maintain the website?',
    keywords: 'maintain, maintenance, update, monthly',
    answer:
      'Yes. Maintenance is central to Sensify. The goal is to help your brand update products, campaign pages, content, and small fixes without needing a full internal tech team.',
    ctaText: 'Preview AI Assistant',
    ctaLink: '#assistant',
  },
  {
    title: 'How is this different from a web design agency?',
    keywords: 'agency, web agency, design agency, difference',
    answer:
      'A typical web agency often focuses on launching a website. Sensify focuses on the transition from marketplace dependency into an owned channel, including structure, campaign readiness, maintenance, and AI-assisted update workflows.',
    ctaText: 'Book a consultation',
    ctaLink: '#contact',
  },
  {
    title: 'Can my website support QRIS?',
    keywords: 'qris, payment, payments, checkout',
    answer:
      'Yes, the owned website can be designed to support familiar payment flows such as QRIS, virtual accounts, bank transfer, e-wallet, card payments, or assisted checkout depending on the final implementation scope.',
    ctaText: 'See payment paths',
    ctaLink: '#dependency',
  },
  {
    title: 'Can I still use WhatsApp?',
    keywords: 'whatsapp, wa, chat, assisted checkout',
    answer:
      'Yes. For many Indonesian brands, WhatsApp remains useful for assisted selling, questions, custom orders, and B2B inquiries. Sensify can include WhatsApp CTA flows in the website journey.',
    ctaText: 'Plan my flow',
    ctaLink: '#contact',
  },
  {
    title: 'Is this only for big brands?',
    keywords: 'big brand, small brand, sme, umkm, startup',
    answer:
      'No. Sensify is designed for growing brands that are ready to look more official and reduce marketplace dependency, even if they still use marketplaces as their main source of reach.',
    ctaText: 'Start with consultation',
    ctaLink: '#contact',
  },
  {
    title: 'Why do I need a website if I already sell on Shopee?',
    keywords: 'shopee, already sell, marketplace only',
    answer:
      'Marketplaces help you reach buyers, but they standardize your page and keep much of the customer journey inside the platform. Your own website gives you a home base for storytelling, campaigns, analytics, and direct trust-building.',
    ctaText: 'Compare experience',
    ctaLink: '#ownership',
  },
  {
    title: 'What is an owned channel?',
    keywords: 'owned channel, own channel, channel',
    answer:
      'An owned channel is a digital space your brand controls, such as your official website. It lets you shape the experience, organize campaigns, guide customers, and collect stronger signals outside marketplace templates.',
    ctaText: 'See ownership',
    ctaLink: '#ownership',
  },
  {
    title: 'How long does it take?',
    keywords: 'timeline, duration, how long, launch',
    answer:
      'Timeline depends on scope, content readiness, catalog complexity, and integrations. A focused first version can be planned as a staged launch rather than waiting for a perfect full build.',
    ctaText: 'Book a planning call',
    ctaLink: '#contact',
  },
  {
    title: 'Do I need to hire a developer?',
    keywords: 'developer, hire, internal team, tech team',
    answer:
      'Not necessarily. Sensify is designed to reduce the need for early internal technical hiring by combining website setup, maintenance support, and structured update workflows.',
    ctaText: 'Ask about maintenance',
    ctaLink: '#assistant',
  },
  {
    title: 'Can Sensify help with campaign pages?',
    keywords: 'campaign, landing page, promo, launch',
    answer:
      'Yes. Campaign and landing pages are one of the main reasons to own a website. They let your brand create dedicated experiences for launches, promos, collections, and ads outside marketplace templates.',
    ctaText: 'Preview campaign flow',
    ctaLink: '#assistant',
  },
  {
    title: 'What does the AI Assistant do?',
    keywords: 'ai assistant, assistant, ai, automation',
    answer:
      'The AI Assistant is a product preview for turning business requests into clearer website update briefs, product copy drafts, campaign page outlines, catalog tasks, and maintenance requests.',
    ctaText: 'Preview AI Assistant',
    ctaLink: '#assistant',
  },
  {
    title: 'Is the AI Assistant connected to my website?',
    keywords: 'connected, backend, integration, ai connected',
    answer:
      'In the current prototype, the AI Assistant should be treated as a preview interface. Real workflow connections can be planned later based on the brand’s maintenance process and technical scope.',
    ctaText: 'Discuss workflow',
    ctaLink: '#contact',
  },
  {
    title: 'Can Sensify migrate products from marketplaces?',
    keywords: 'migrate, migration, product data, catalog',
    answer:
      'Sensify can help structure product catalog information for the website, but the exact migration process depends on your existing product data, images, variants, and marketplace export options.',
    ctaText: 'Review catalog',
    ctaLink: '#contact',
  },
  {
    title: 'Will the website replace Instagram?',
    keywords: 'instagram, social media, social',
    answer:
      'No. Instagram can remain an acquisition and community channel. Your website becomes the destination for campaigns, product storytelling, catalog browsing, and stronger brand trust.',
    ctaText: 'Plan campaign path',
    ctaLink: '#contact',
  },
  {
    title: 'Can I use this for B2B?',
    keywords: 'b2b, wholesale, supplier, inquiry',
    answer:
      'Yes. Sensify can support inquiry flows, product specification pages, quote requests, WhatsApp contact paths, and structured catalog pages for B2B or wholesale contexts.',
    ctaText: 'Ask about B2B',
    ctaLink: '#contact',
  },
  {
    title: 'What content do I need to prepare?',
    keywords: 'content, prepare, assets, photos, copy',
    answer:
      'Useful starting assets include logo files, brand colors, product photos, product data, pricing or inquiry rules, campaign goals, payment preferences, and examples of websites you like.',
    ctaText: 'Prepare checklist',
    ctaLink: '#contact',
  },
  {
    title: 'How do I start?',
    keywords: 'start, begin, consultation, contact',
    answer:
      'Start with a free consultation. Sensify can review your current marketplace dependency, product structure, brand direction, website needs, and maintenance expectations.',
    ctaText: 'Book a free consultation',
    ctaLink: '#contact',
  },
];

export default function SmartFAQSection() {
  return (
    <section
      id="faq"
      className="relative overflow-hidden bg-[#030609] px-6 py-24 text-[#F5F7FA] md:px-12 md:py-32"
    >
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(50% 40% at 20% 10%, rgba(12,68,124,0.18), transparent 60%), radial-gradient(40% 35% at 85% 90%, rgba(216,90,48,0.08), transparent 65%)',
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
