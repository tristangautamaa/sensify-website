import { assistantPolicies } from '../data/assistantKnowledge.js';

/**
 * Deterministic local reply engine for the Sensify Assistant preview.
 *
 * Pure keyword/intent matching over controlled reply templates — no network
 * calls, no external AI, no HTML in responses. Every reply is a fixed,
 * vertical-neutral template, so the assistant can never promise real stock,
 * process payments, or answer outside its shopping-guidance scope.
 */

const MAX_INPUT_LENGTH = 300;

const FALLBACK_TEXT =
  'I can help with product recommendations, comparisons, pricing, payment, shipping, and order questions. Try asking: “What payment methods can I use?”';

/* ---------------- keyword matching ---------------- */

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Whole-word match so short keywords never fire inside longer words
// (e.g. "va" inside "available").
function hasAny(text, keywords) {
  return keywords.some((keyword) => new RegExp(`\\b${escapeRegex(keyword)}\\b`).test(text));
}

const INTENT_KEYWORDS = {
  greeting: ['hi', 'hello', 'halo', 'hai', 'hey', 'good morning', 'good afternoon', 'good evening'],
  comparison: [
    'compare', 'comparison', 'versus', 'vs', 'difference', 'differences', 'different', 'better',
    'which one', 'bandingkan', 'banding',
  ],
  sizing: [
    'size', 'sizes', 'sizing', 'variant', 'variants', 'measurement', 'measurements', 'ukuran',
  ],
  material: [
    'material', 'materials', 'fabric', 'ingredient', 'ingredients', 'made of', 'made from',
    'benefit', 'benefits', 'bahan', 'kandungan',
  ],
  care: [
    'care', 'wash', 'washing', 'clean', 'cleaning', 'maintain', 'maintenance', 'how to use',
    'usage', 'rawat', 'merawat', 'cara pakai',
  ],
  pricing: [
    'price', 'prices', 'pricing', 'cost', 'how much', 'discount', 'discounts', 'promo', 'promos',
    'voucher', 'vouchers', 'coupon', 'sale', 'harga', 'diskon', 'kupon', 'murah',
  ],
  payment: [
    'payment', 'payments', 'pay', 'qris', 'virtual account', 'va', 'bank transfer', 'transfer',
    'e-wallet', 'ewallet', 'wallet', 'card', 'cards', 'installment',
    'bayar', 'pembayaran', 'cicilan', 'gopay', 'ovo', 'dana',
  ],
  shipping: [
    'shipping', 'ship', 'delivery', 'deliver', 'courier', 'track', 'tracking', 'arrive', 'arrives',
    'kirim', 'pengiriman', 'ongkir', 'kurir', 'lacak', 'resi',
  ],
  checkout: [
    'checkout', 'check out', 'buy', 'buying', 'purchase', 'order', 'ordering', 'cart',
    'beli', 'membeli', 'keranjang',
  ],
  stock: ['stock', 'stok', 'available', 'availability', 'in stock', 'restock', 'ready'],
  returns: ['return', 'returns', 'exchange', 'refund', 'retur', 'tukar', 'pengembalian'],
  recommendation: [
    'recommend', 'recommendation', 'recommendations', 'suggest', 'suggestion', 'best', 'need',
    'looking for', 'choose', 'budget', 'gift', 'cocok', 'pilih', 'rekomendasi', 'cari',
  ],
};

// Specific intents win over broad ones; greeting only wins when nothing
// content-related matched (so "hi, what payment methods?" still answers payment).
const INTENT_PRIORITY = [
  'comparison', 'care', 'payment', 'shipping', 'checkout', 'stock', 'returns',
  'pricing', 'sizing', 'material', 'recommendation', 'greeting',
];

/* ---------------- reply templates ---------------- */

const REPLY_BUILDERS = {
  greeting: () =>
    'Hi! I can help with product recommendations, comparisons, pricing, payment, shipping, and orders. What are you looking for?',
  recommendation: () =>
    'Happy to help you choose. Tell me what you’re shopping for and your budget, and I’ll narrow the catalog down to the closest matches.',
  comparison: () =>
    'Tell me which products you’re deciding between, and I’ll lay out the differences — features, price, and which one fits your needs better.',
  sizing: () =>
    'Tell me which product you’re considering and I’ll confirm the sizes or variants it comes in.',
  material: () =>
    'Ask me about any product and I’ll break down its materials, ingredients, and key benefits.',
  care: () =>
    'Ask me about any product and I’ll walk you through how to use it and how to keep it in good condition.',
  pricing: () => assistantPolicies.pricing,
  payment: () => assistantPolicies.payment,
  shipping: () => assistantPolicies.shipping,
  checkout: () => assistantPolicies.checkout,
  stock: () => assistantPolicies.stock,
  returns: () => assistantPolicies.returns,
};

/* ---------------- public API ---------------- */

/**
 * Generate a deterministic assistant reply for a visitor message.
 * Always returns `{ intent, text }` and never throws — unknown or
 * out-of-scope input gets the safe fallback response.
 */
export function generateAssistantReply(input) {
  try {
    const raw = typeof input === 'string' ? input : '';
    const text = raw.trim().slice(0, MAX_INPUT_LENGTH).toLowerCase();
    if (!text) return { intent: 'fallback', text: FALLBACK_TEXT };

    const intent = INTENT_PRIORITY.find((candidate) => hasAny(text, INTENT_KEYWORDS[candidate]));
    if (!intent) return { intent: 'fallback', text: FALLBACK_TEXT };

    return { intent, text: REPLY_BUILDERS[intent]() };
  } catch {
    return { intent: 'fallback', text: FALLBACK_TEXT };
  }
}
