import { Search, ShoppingCart, Star, MessageCircle, Truck, ShieldCheck, Store } from 'lucide-react';

/**
 * "Before" layer: a realistic, generic Indonesian marketplace product page.
 * Deliberately platform-neutral — fictional "Market Hub" brand, no real
 * marketplace logos or trademarked UI. Presentational only; the parent
 * slider handles aria.
 *
 * Product photo: uses /assets/ownership/product-marketplace.jpg when the
 * asset exists, otherwise the CSS studio-shot fallback underneath shows.
 */
const CATEGORIES = ['Fashion', 'Beauty', 'Home', 'Gadget', 'Local Brand'];
const COLORS = ['Navy', 'Sand', 'Black'];
const SIZES = ['S', 'M', 'L', 'XL'];
const PROMOS = [
  { label: 'Gratis ongkir', color: '#0E9F6E' },
  { label: 'Voucher toko', color: '#E4572E' },
  { label: 'COD tersedia', color: '#5B6572' },
];

function ProductPhoto() {
  return (
    <div
      className="relative h-full w-full overflow-hidden"
      style={{ background: 'radial-gradient(85% 70% at 50% 32%, #ffffff 0%, #e6eaef 100%)' }}
    >
      {/* CSS product: overshirt silhouette on a studio backdrop */}
      <div
        className="absolute top-1/2 left-1/2 h-[72%] w-[56%] -translate-x-1/2 -translate-y-1/2"
        style={{
          borderRadius: '16% 16% 20% 20% / 10% 10% 14% 14%',
          background: 'linear-gradient(168deg, #33465f 0%, #24344a 48%, #182534 100%)',
          boxShadow: '0 18px 40px rgba(24, 37, 52, 0.35), inset 0 1px 0 rgba(255,255,255,0.12)',
        }}
      >
        {/* Collar */}
        <div
          className="absolute top-0 left-1/2 h-[14%] w-[38%] -translate-x-1/2"
          style={{
            borderRadius: '0 0 50% 50%',
            background: 'linear-gradient(#141f2c, #1d2c3e)',
          }}
        />
        {/* Button placket */}
        <div className="absolute top-[12%] bottom-[6%] left-1/2 w-px -translate-x-1/2 bg-[rgba(255,255,255,0.14)]" />
        {[22, 38, 54, 70, 86].map((top) => (
          <span
            key={top}
            className="absolute left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-[rgba(255,255,255,0.28)]"
            style={{ top: `${top}%` }}
          />
        ))}
        {/* Chest pockets */}
        <div className="absolute top-[24%] left-[16%] h-[13%] w-[22%] rounded-sm border border-[rgba(255,255,255,0.16)]" />
        <div className="absolute top-[24%] right-[16%] h-[13%] w-[22%] rounded-sm border border-[rgba(255,255,255,0.16)]" />
      </div>
      {/* Optional real asset on top of the CSS fallback */}
      <img
        src="/assets/ownership/product-marketplace.jpg"
        alt=""
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover"
        onError={(e) => {
          e.currentTarget.style.display = 'none';
        }}
      />
      <span className="absolute top-2 left-2 rounded-sm bg-[#E4572E] px-1.5 py-0.5 text-[9px] font-bold text-white">
        -25%
      </span>
    </div>
  );
}

export default function MarketplaceProductPage() {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden bg-[#F0F2F5] text-[#212934]">
      {/* Platform top bar */}
      <div className="flex shrink-0 items-center gap-3 bg-white px-4 py-2 shadow-[0_1px_0_rgba(33,41,52,0.08)] md:gap-5 md:px-7 md:py-2.5">
        <span className="shrink-0 text-[13px] font-extrabold tracking-tight text-[#E4572E] md:text-[15px]">
          Market<span className="text-[#212934]">Hub</span>
        </span>
        <div className="flex min-w-0 flex-1 items-center gap-2 rounded-md border border-[#E3E7EC] bg-[#F7F9FB] px-2.5 py-1.5">
          <Search size={11} className="shrink-0 text-[#98A2AE]" aria-hidden="true" />
          <span className="truncate text-[9.5px] text-[#98A2AE] md:text-[10.5px]">
            Cari produk, merek, dan kategori
          </span>
        </div>
        <ShoppingCart size={15} className="shrink-0 text-[#5B6572]" aria-hidden="true" />
      </div>

      {/* Category chips */}
      <div className="flex shrink-0 gap-1.5 overflow-hidden px-4 py-1.5 md:px-7 md:py-2">
        {CATEGORIES.map((cat, i) => (
          <span
            key={cat}
            className="rounded-full px-2.5 py-0.5 text-[8.5px] font-medium whitespace-nowrap md:text-[9.5px]"
            style={
              i === 0
                ? { background: '#FCE9E2', color: '#C94E28' }
                : { background: '#ffffff', color: '#5B6572', border: '1px solid #E3E7EC' }
            }
          >
            {cat}
          </span>
        ))}
      </div>

      {/* Product detail */}
      <div className="grid min-h-0 flex-1 grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] gap-3 px-4 pb-2 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)_minmax(0,0.62fr)] md:gap-4 md:px-7">
        {/* Gallery */}
        <div className="flex min-h-0 flex-col gap-1.5">
          <div className="min-h-0 flex-1 overflow-hidden rounded-lg border border-[#E3E7EC] bg-white">
            <ProductPhoto />
          </div>
          <div className="flex shrink-0 gap-1.5">
            {['#33465f', '#c9b8a0', '#1b1f24', '#e6eaef'].map((swatch, i) => (
              <div
                key={swatch}
                className="h-7 w-7 rounded-md border md:h-9 md:w-9"
                style={{
                  background: `linear-gradient(160deg, ${swatch}, ${swatch}cc)`,
                  borderColor: i === 0 ? '#E4572E' : '#E3E7EC',
                }}
              />
            ))}
          </div>
        </div>

        {/* Title / price / variants */}
        <div className="flex min-h-0 flex-col gap-1.5 overflow-hidden rounded-lg border border-[#E3E7EC] bg-white p-2.5 md:gap-2 md:p-3.5">
          <p className="text-[10px] leading-snug font-semibold md:text-[12px]">
            Daily Utility Overshirt Premium — Kemeja Jaket Pria Bahan Katun
          </p>
          <div className="flex items-center gap-1.5 text-[8.5px] text-[#5B6572] md:text-[9.5px]">
            <Star size={9} fill="#F5A623" color="#F5A623" aria-hidden="true" />
            <span className="font-semibold text-[#212934]">4.8</span>
            <span className="text-[#C6CDD5]">|</span>
            <span>Terjual 1,2rb</span>
          </div>
          <div className="flex flex-wrap items-baseline gap-1.5">
            <span className="text-[15px] font-bold text-[#E4572E] md:text-[19px]">Rp349.000</span>
            <span className="text-[8.5px] text-[#98A2AE] line-through md:text-[9.5px]">Rp465.000</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {PROMOS.map((promo) => (
              <span
                key={promo.label}
                className="rounded-sm px-1.5 py-0.5 text-[7.5px] font-semibold md:text-[8.5px]"
                style={{ color: promo.color, border: `1px solid ${promo.color}55`, background: `${promo.color}0f` }}
              >
                {promo.label}
              </span>
            ))}
          </div>

          <div className="mt-0.5 hidden sm:block">
            <p className="text-[8px] text-[#98A2AE] md:text-[9px]">Warna</p>
            <div className="mt-1 flex gap-1">
              {COLORS.map((color, i) => (
                <span
                  key={color}
                  className="rounded-sm border px-1.5 py-0.5 text-[8px] md:px-2 md:text-[9px]"
                  style={
                    i === 0
                      ? { borderColor: '#E4572E', color: '#C94E28', background: '#FCE9E2' }
                      : { borderColor: '#E3E7EC', color: '#5B6572' }
                  }
                >
                  {color}
                </span>
              ))}
            </div>
          </div>
          <div className="hidden sm:block">
            <p className="text-[8px] text-[#98A2AE] md:text-[9px]">Ukuran</p>
            <div className="mt-1 flex gap-1">
              {SIZES.map((size, i) => (
                <span
                  key={size}
                  className="rounded-sm border px-1.5 py-0.5 text-[8px] md:px-2 md:text-[9px]"
                  style={
                    i === 1
                      ? { borderColor: '#E4572E', color: '#C94E28', background: '#FCE9E2' }
                      : { borderColor: '#E3E7EC', color: '#5B6572' }
                  }
                >
                  {size}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-auto flex items-center gap-1.5 border-t border-[#F0F2F5] pt-1.5 text-[8px] text-[#5B6572] md:text-[9px]">
            <Truck size={10} className="shrink-0 text-[#0E9F6E]" aria-hidden="true" />
            <span className="truncate">Dikirim dari Jakarta Barat • Estimasi 2–4 hari</span>
          </div>
        </div>

        {/* Seller / guarantee sidebar (desktop) */}
        <div className="hidden min-h-0 flex-col gap-2 overflow-hidden rounded-lg border border-[#E3E7EC] bg-white p-3 md:flex">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#24344a] text-[9px] font-bold text-white">
              OS
            </span>
            <div className="min-w-0">
              <p className="truncate text-[9.5px] font-semibold">Overshirt Studio</p>
              <p className="text-[8px] text-[#98A2AE]">Aktif 5 menit lalu</p>
            </div>
          </div>
          <span className="inline-flex w-fit items-center gap-1 rounded-sm bg-[#E7F6F0] px-1.5 py-0.5 text-[7.5px] font-semibold text-[#0E9F6E]">
            <Store size={8} aria-hidden="true" />
            Official Store
          </span>
          <div className="space-y-1 border-t border-[#F0F2F5] pt-2 text-[8px] text-[#5B6572]">
            <p className="flex justify-between">
              <span>Penilaian</span>
              <span className="font-semibold text-[#212934]">98%</span>
            </p>
            <p className="flex justify-between">
              <span>Produk</span>
              <span className="font-semibold text-[#212934]">142</span>
            </p>
            <p className="flex justify-between">
              <span>Bergabung</span>
              <span className="font-semibold text-[#212934]">3 tahun</span>
            </p>
          </div>
          <div className="mt-auto flex items-center gap-1.5 rounded-md bg-[#F7F9FB] px-2 py-1.5 text-[7.5px] text-[#5B6572]">
            <ShieldCheck size={10} className="shrink-0 text-[#0E9F6E]" aria-hidden="true" />
            Garansi 7 hari uang kembali
          </div>
        </div>
      </div>

      {/* Sticky purchase bar */}
      <div className="flex shrink-0 items-center gap-2 border-t border-[#E3E7EC] bg-white px-4 py-2 md:px-7 md:py-2.5">
        <span className="flex items-center gap-1 rounded-md border border-[#E3E7EC] px-2 py-1.5 text-[8.5px] font-semibold text-[#5B6572] md:px-3 md:text-[9.5px]">
          <MessageCircle size={10} aria-hidden="true" />
          Chat
        </span>
        <span className="flex-1 rounded-md border border-[#0E9F6E] bg-[#E7F6F0] px-2 py-1.5 text-center text-[8.5px] font-semibold text-[#0E9F6E] md:text-[9.5px]">
          Tambah ke Keranjang
        </span>
        <span className="flex-1 rounded-md bg-[#E4572E] px-2 py-1.5 text-center text-[8.5px] font-bold text-white md:text-[9.5px]">
          Beli Sekarang
        </span>
      </div>
    </div>
  );
}
