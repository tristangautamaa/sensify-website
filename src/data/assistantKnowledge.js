/**
 * Local reply content for the Sensify Assistant preview.
 *
 * Controlled, store-level answer templates only — no API calls, no live
 * catalog, no personal data. The engine (src/utils/assistantEngine.js)
 * answers exclusively from this file, and the demo deliberately stays
 * vertical-neutral: it shows how the assistant guides customers on a
 * brand's owned store without committing to any sample product line.
 */

export const assistantPolicies = {
  pricing:
    'Prices are listed on every product page, and I can point you to current promos. If you have a voucher, I’ll check that it applies before you reach checkout.',
  payment:
    'You can pay with QRIS, virtual account, bank transfer, e-wallet, or credit card. If you’d like help completing an order, assisted checkout over WhatsApp is available too.',
  shipping:
    'Delivery is handled through the brand’s courier partners. Once your order ships you’ll receive a tracking number, and you can ask me for delivery updates right here.',
  checkout:
    'Tell me what you’d like to order and I’ll walk you through checkout — payment, delivery details, and order confirmation included.',
  stock:
    'Availability comes straight from the store catalog. Tell me which product you’re after and I’ll confirm what’s in stock before you check out.',
  returns:
    'Returns and exchanges follow this brand’s store policy. Tell me what you’d like to return or exchange and I’ll guide you through the steps.',
};

export const assistantSuggestions = [
  'What would you recommend?',
  'Help me compare two products',
  'What payment methods can I use?',
  'How do I track my order?',
];
