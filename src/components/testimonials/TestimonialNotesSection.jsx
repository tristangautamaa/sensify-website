import FadeUp from '../ui/FadeUp.jsx';
import ClientNoteCard from './ClientNoteCard.jsx';

/**
 * Client notes from early Sensify use cases. Each note ties back to a part of
 * the Sensify system — owned storefront channel, AI-assisted response, and
 * centralized commerce data — without invented metrics or inflated claims.
 */
const CLIENT_NOTES = [
  {
    avatarSrc: '/Logo/poncol.png',
    avatarAlt: 'Poncol Padel House logo',
    avatarFallback: 'LI',
    senderName: 'Linda Iskandar',
    project: 'Poncol Padel House',
    label: 'Owned channel note',
    message:
      'Our network in the market was limited until we created our own marketplace to gain traction. It has proven to attract more people to our court.',
    tags: ['Owned channel', 'Traction', 'Booking flow'],
    focusNote: 'Owned-channel setup for discovery, booking interest, and customer flow.',
    accent: '#378ADD',
  },
  {
    avatarSrc: '/Logo/giseu.png',
    avatarAlt: 'Giseu logo',
    avatarFallback: 'EL',
    senderName: 'Emeryn Luandha',
    project: 'Giseu',
    label: 'AI assistant note',
    message:
      'We had difficulties answering inquiries across multiple platforms. Sensify’s AI system helped us respond faster and more accurately, so our clients could get better answers in less time.',
    tags: ['AI assistant', 'Customer inquiries', 'Faster response'],
    focusNote: 'AI-assisted product inquiry flow for faster customer support.',
    accent: '#D85A30',
  },
  {
    avatarSrc: '/Logo/tokokuat.jpg',
    avatarAlt: 'Toko Kuat logo',
    avatarFallback: 'KN',
    senderName: 'Kanisius Nathaniel',
    project: 'Toko Kuat',
    label: 'Centralized system note',
    message:
      'We had difficulties with our data systems, customer information, inventory management, and other operational details. Sensify helped solve this through a centralized system to maintain our data.',
    tags: ['Centralized data', 'Customer info', 'Inventory'],
    focusNote: 'Centralized commerce data for customer, inventory, and operational visibility.',
    accent: '#378ADD',
  },
];

export default function TestimonialNotesSection() {
  return (
    <section
      id="testimonials"
      data-header-theme="dark"
      className="dark-flow-section relative overflow-hidden px-6 py-24 text-[#F5F7FA] md:px-12 md:py-32"
    >
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(55% 40% at 80% 28%, rgba(12,68,124,0.16), transparent 60%), radial-gradient(40% 35% at 12% 72%, rgba(216,90,48,0.08), transparent 60%)',
        }}
      />

      <div className="relative mx-auto w-full max-w-[1180px]">
        <FadeUp className="max-w-[720px]">
          <p className="font-mono mb-6 text-[0.66rem] font-medium tracking-[0.34em] text-[#D85A30]">
            CLIENT NOTES
          </p>
          <h2 className="font-display text-4xl leading-[1.08] md:text-5xl">
            Notes from brands building <em>owned-channel systems.</em>
          </h2>
          <p className="mt-6 max-w-[620px] text-[15px] leading-[1.75] text-[rgba(245,247,250,0.68)]">
            Client notes from early Sensify use cases — showing how owned channels, AI-assisted
            responses, and centralized commerce systems can support brands beyond scattered
            marketplace activity.
          </p>
        </FadeUp>

        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6">
          {CLIENT_NOTES.map((note, i) => (
            <ClientNoteCard key={note.avatarFallback} {...note} delay={0.08 * i} />
          ))}
        </div>
      </div>
    </section>
  );
}
