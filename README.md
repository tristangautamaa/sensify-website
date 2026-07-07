# Sensify — Website

Marketing website for **Sensify**, a marketplace exit system for growing brands: an owned
official website beside the marketplace, built, moved, and maintained as one system.

## Current stage

Interactive homepage:

- Cinematic ShaderGradient hero with loader, staggered menu, and pixel trail
- Problem cards — the marketplace dependency diagnostic
- Dependency reduction with a 3D payment-rails carousel
- Sensify system (Build / Move / Maintain) chamfered cards
- Owned brand experience spotlight reveal (marketplace page → owned experience)
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

## Pending assets

Some sections render CSS fallbacks until real assets land:

- `public/assets/ownership/` — marketplace page image + owned brand experience video
- `public/assets/infrastructure/` — operations loop video (HLS or MP4)
- System section card background imagery
