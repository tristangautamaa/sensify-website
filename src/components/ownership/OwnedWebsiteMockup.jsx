/**
 * "After" layer: the owned brand website experience in the Sensify palette.
 * Dark editorial mock — brand nav, storytelling hero, benefit cards, and
 * customer-journey markers. Presentational only.
 */
export default function OwnedWebsiteMockup() {
  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden bg-[#07111C] text-[#F5F7FA]">
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(75% 60% at 78% 22%, rgba(55,138,221,0.28), transparent 60%), radial-gradient(50% 45% at 15% 85%, rgba(216,90,48,0.18), transparent 62%), radial-gradient(90% 80% at 50% 110%, rgba(12,68,124,0.4), transparent 70%)',
        }}
      />

      {/* Brand nav */}
      <div className="relative flex shrink-0 items-center justify-between px-5 py-3.5 md:px-9 md:py-5">
        <span className="font-mono text-[10px] font-medium tracking-[0.28em] md:text-[11px]">
          SENSIFY DEMO BRAND
        </span>
        <div className="font-mono hidden gap-6 text-[10px] tracking-[0.18em] text-[rgba(245,247,250,0.6)] md:flex">
          <span>COLLECTION</span>
          <span>STORY</span>
          <span>CAMPAIGN</span>
        </div>
        <span className="font-mono rounded-full border border-[rgba(216,90,48,0.6)] px-2.5 py-1 text-[8.5px] tracking-[0.2em] text-[#D85A30] md:px-3 md:text-[9px]">
          OWNED
        </span>
      </div>

      {/* Storytelling hero: campaign copy + product image area */}
      <div className="relative grid min-h-0 flex-1 grid-cols-1 gap-4 px-5 md:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] md:items-center md:gap-8 md:px-9">
        <div className="flex flex-col justify-center">
          <p className="font-mono mb-2.5 text-[8.5px] font-medium tracking-[0.34em] text-[#378ADD] md:mb-4 md:text-[10px]">
            THE STORY YOUR PRODUCT DESERVES
          </p>
          <p className="font-display max-w-[18ch] text-2xl leading-[1.02] md:text-4xl lg:text-5xl">
            Crafted to be <em>remembered,</em> not scrolled past.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-3 md:mt-6">
            <span className="rounded-full bg-[#D85A30] px-4 py-1.5 text-[10px] font-semibold text-[#F5F7FA] md:px-6 md:py-2.5 md:text-xs">
              Explore the collection
            </span>
            <span className="rounded-full border border-[rgba(245,247,250,0.24)] px-4 py-1.5 text-[10px] font-semibold text-[rgba(245,247,250,0.85)] md:px-5 md:py-2.5 md:text-xs">
              Campaign 01
            </span>
          </div>

          {/* Customer journey markers */}
          <div className="mt-4 flex items-center gap-2 md:mt-7">
            {['DISCOVER', 'STORY', 'CHECKOUT', 'RETURN'].map((step, i, arr) => (
              <span key={step} className="flex items-center gap-2">
                <span
                  className="font-mono text-[8px] tracking-[0.2em] md:text-[9.5px]"
                  style={{ color: i === 2 ? '#D85A30' : 'rgba(245,247,250,0.55)' }}
                >
                  {step}
                </span>
                {i < arr.length - 1 && (
                  <span className="h-px w-3 bg-[rgba(245,247,250,0.25)] md:w-5" />
                )}
              </span>
            ))}
          </div>
        </div>

        {/* Product image area */}
        <div className="relative hidden h-3/4 items-center justify-center self-center rounded-2xl border border-[rgba(245,247,250,0.14)] bg-[rgba(245,247,250,0.04)] md:flex">
          <div
            className="h-2/3 w-2/3 rounded-xl"
            style={{
              background:
                'linear-gradient(150deg, rgba(55,138,221,0.35), rgba(12,68,124,0.25) 55%, rgba(216,90,48,0.2))',
            }}
          />
          <span className="font-mono absolute bottom-3 left-3 text-[8.5px] tracking-[0.2em] text-[rgba(245,247,250,0.5)]">
            PRODUCT STORY 01
          </span>
        </div>
      </div>

      {/* Benefit cards strip */}
      <div className="relative flex shrink-0 gap-2.5 px-5 pb-4 md:gap-4 md:px-9 md:pb-7">
        {[
          { label: 'CAMPAIGN PAGES', dot: '#378ADD' },
          { label: 'OWNED CHECKOUT', dot: '#D85A30' },
          { label: 'JOURNEY ANALYTICS', dot: '#378ADD' },
        ].map((mod) => (
          <div
            key={mod.label}
            className="flex h-12 flex-1 items-center justify-between rounded-xl border border-[rgba(245,247,250,0.14)] bg-[rgba(245,247,250,0.05)] px-3 md:h-16 md:px-4"
          >
            <span className="font-mono text-[7.5px] tracking-[0.16em] text-[rgba(245,247,250,0.6)] md:text-[9.5px]">
              {mod.label}
            </span>
            <span className="h-1.5 w-1.5 rounded-full md:h-2 md:w-2" style={{ background: mod.dot }} />
          </div>
        ))}
      </div>
    </div>
  );
}
