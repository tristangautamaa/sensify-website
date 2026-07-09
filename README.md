# Sensify — Website

Marketing website for **Sensify**, a marketplace exit system for growing brands: an owned
official website beside the marketplace, built, moved, and maintained as one system.

## Current stage

Interactive homepage:

- Cinematic ShaderGradient hero with loader, staggered menu, and pixel trail
- Problem cards — the marketplace dependency diagnostic
- Dependency reduction with a 3D payment-rails carousel
- Sensify system (Build / Move / Maintain) chamfered cards
- Owned brand experience comparison slider (marketplace product page → owned brand website)
- Infrastructure comparison with video circle placeholder
- AI Assistant operations co-pilot preview (local demo only, no backend)

## Stack

Vite · React 19 · Tailwind CSS v4 · motion · GSAP · three.js / ShaderGradient · lucide-react

## Develop

```bash
npm install
npm run dev     # local dev server
npm run build   # production build
npm run lint    # oxlint
```

## Cal.com booking

The footer "Book a free consultation" CTA opens a Cal.com booking modal. To enable it:

1. Create a Cal.com account.
2. Create an event type such as "Free Consultation".
3. Copy the Cal link path, e.g. `username/free-consultation`.
4. Add it to `.env.local` or `.env`:
   `VITE_CAL_LINK=username/free-consultation`
5. Restart the dev server.

Without `VITE_CAL_LINK`, the modal shows a setup panel instead of the scheduler.
Calendar sync and email notifications are configured inside Cal.com itself.

## Pending assets

Some sections render CSS fallbacks until real assets land:

- `public/assets/ownership/product-marketplace.jpg` and `product-owned.jpg` — optional product photos for the comparison slider (CSS art direction renders when absent)
- `public/assets/infrastructure/` — operations loop video (HLS or MP4)
- System section card background imagery
