/**
 * "Before" layer: a deliberately generic, standardized marketplace product
 * page. Pure CSS mock — flat, cramped, platform-owned. No real marketplace
 * branding. Presentational only; the parent handles aria.
 */
export default function MarketplaceMockup() {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden bg-[#eceff3] text-[#3a4148]">
      {/* Platform header + search */}
      <div className="flex shrink-0 items-center gap-3 border-b border-[#d7dce2] bg-white px-4 py-2.5 md:px-7">
        <div className="h-6 w-20 rounded bg-[#c3cbd4]" />
        <div className="hidden h-7 max-w-[360px] flex-1 rounded-sm border border-[#d7dce2] bg-[#f4f6f8] px-2 text-[10px] leading-7 text-[#9aa4ae] sm:block">
          Search products…
        </div>
        <div className="ml-auto flex gap-2">
          <div className="h-6 w-6 rounded bg-[#dfe4e9]" />
          <div className="h-6 w-6 rounded bg-[#dfe4e9]" />
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="shrink-0 px-4 py-2 text-[9.5px] text-[#9aa4ae] md:px-7">
        Category / Sub-category / Product name here
      </div>

      {/* Product detail: image + info + shipping sidebar */}
      <div className="grid min-h-0 flex-1 grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] gap-3 px-4 pb-4 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,0.7fr)] md:gap-4 md:px-7">
        {/* Image block */}
        <div className="flex flex-col gap-2">
          <div className="flex flex-1 items-center justify-center rounded-sm border border-[#d7dce2] bg-white">
            <div className="h-1/2 w-1/2 rounded bg-[#e3e8ed]" />
          </div>
          <div className="flex gap-1.5">
            {[0, 1, 2, 3, 4].map((i) => (
              <div key={i} className="h-8 w-8 rounded-sm border border-[#d7dce2] bg-white md:h-9 md:w-9" />
            ))}
          </div>
        </div>

        {/* Title / rating / price skeleton */}
        <div className="flex flex-col gap-2.5 rounded-sm border border-[#d7dce2] bg-white p-3 md:p-4">
          <div className="h-3.5 w-11/12 rounded bg-[#dfe4e9]" />
          <div className="h-3.5 w-3/5 rounded bg-[#e3e8ed]" />
          {/* Rating row */}
          <div className="flex items-center gap-1">
            {[0, 1, 2, 3, 4].map((s) => (
              <span key={s} className="h-2 w-2 rounded-full bg-[#e0c98f]" />
            ))}
            <span className="ml-1.5 h-2 w-10 rounded bg-[#eceff3]" />
          </div>
          {/* Price area */}
          <div className="mt-1 h-7 w-2/5 rounded bg-[#d5dbe2]" />
          <div className="h-2.5 w-1/4 rounded bg-[#f0f2f5]" />
          {/* Variant chips */}
          <div className="mt-1 flex gap-1.5">
            {[0, 1, 2].map((i) => (
              <div key={i} className="h-6 w-12 rounded-sm border border-[#d7dce2] bg-[#f4f6f8]" />
            ))}
          </div>
          <div className="mt-auto flex gap-2">
            <div className="h-8 flex-1 rounded-sm bg-[#c3cbd4]" />
            <div className="h-8 flex-1 rounded-sm bg-[#aeb8c2]" />
          </div>
        </div>

        {/* Shipping / seller sidebar */}
        <div className="hidden flex-col gap-2.5 rounded-sm border border-[#d7dce2] bg-white p-3 md:flex">
          <div className="h-2.5 w-2/3 rounded bg-[#dfe4e9]" />
          <div className="space-y-1.5 border-b border-[#f0f2f5] pb-2.5">
            {[0, 1, 2].map((i) => (
              <div key={i} className="flex justify-between">
                <div className="h-2 w-1/3 rounded bg-[#eceff3]" />
                <div className="h-2 w-2/5 rounded bg-[#f0f2f5]" />
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-full bg-[#dfe4e9]" />
            <div className="h-2.5 w-1/2 rounded bg-[#eceff3]" />
          </div>
          <div className="mt-auto h-7 w-full rounded-sm border border-[#d7dce2] bg-[#f4f6f8]" />
        </div>
      </div>
    </div>
  );
}
