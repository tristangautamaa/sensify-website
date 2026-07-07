import FadeUp from '../ui/FadeUp.jsx';
import ClientNoteCard from './ClientNoteCard.jsx';

/**
 * Placeholder testimonials section — honestly labeled conversation notes
 * where real client quotes and case-study excerpts will live once Sensify
 * has approved public references. No fake clients, no fake results.
 */
const CLIENT_NOTES = [
  {
    avatarFallback: 'FD',
    senderName: 'Fashion brand founder',
    senderNote: 'Placeholder note',
    timestamp: 'Future case study',
    message:
      'We already sell on marketplaces, but our campaigns feel trapped inside product listings. We need a website that makes our brand feel more official.',
    tags: ['Campaign page', 'Catalog', 'Brand story'],
    accent: '#378ADD',
  },
  {
    avatarFallback: 'BO',
    senderName: 'Brand operator',
    senderNote: 'Placeholder note',
    timestamp: 'Future maintenance story',
    message:
      'Our problem is not only building a website. It is keeping it updated whenever products, promos, and launch pages change.',
    tags: ['Maintenance', 'Landing pages', 'Updates'],
    accent: '#D85A30',
  },
  {
    avatarFallback: 'GM',
    senderName: 'Growth manager',
    senderNote: 'Placeholder note',
    timestamp: 'Future growth story',
    message:
      'We want to keep marketplaces for reach, but we need a second channel where we can understand traffic, customers, and campaign performance.',
    tags: ['Analytics', 'Owned channel', 'Checkout'],
    accent: '#378ADD',
  },
];

export default function TestimonialNotesSection() {
  return (
    <section
      id="testimonials"
      className="relative overflow-hidden bg-[#030609] px-6 py-24 text-[#F5F7FA] md:px-12 md:py-32"
    >
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(55% 40% at 80% 15%, rgba(12,68,124,0.16), transparent 60%), radial-gradient(40% 35% at 12% 80%, rgba(216,90,48,0.08), transparent 65%)',
        }}
      />

      <div className="relative mx-auto w-full max-w-[1180px]">
        <FadeUp className="max-w-[720px]">
          <p className="font-mono mb-6 text-[0.66rem] font-medium tracking-[0.34em] text-[#D85A30]">
            CLIENT NOTES
          </p>
          <h2 className="font-display text-4xl leading-[1.08] md:text-5xl">
            The questions brands ask before they build an <em>owned channel.</em>
          </h2>
          <p className="mt-6 max-w-[620px] text-[15px] leading-[1.75] text-[rgba(245,247,250,0.68)]">
            These are placeholder conversation cards for now. Replace them with real client notes,
            testimonials, or case-study excerpts once Sensify has approved public references.
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
