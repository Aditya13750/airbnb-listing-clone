# Airbnb Clone

## Overview
An original React and TypeScript recreation of a desktop Airbnb listing experience, based on the supplied visual and behavioral reference. No reference source code or bundled implementation is used.

## Features
- Desktop listing page with responsive nearby-width constraints
- Five-image gallery and full photo tour
- Accessible fullscreen lightbox with counter and arrow-key navigation
- Sticky reservation card with guest stepper and price breakdown
- Amenities modal, share action, focus-visible states, and reduced-motion support

## Tech Stack
React, TypeScript, Vite, modern CSS, Lucide React, and static listing data.

## Project Structure
- `src/data/listing.ts` contains listing content and image data.
- `src/App.tsx` contains reusable page sections and modal experiences.
- `src/styles/globals.css` contains the visual system and layout.
- `architecture/architecture.png` documents a production marketplace architecture.

## Running Locally
```bash
npm install
npm run dev
```

## Production Build
```bash
npm run build
```

## Deployment
The app is ready for deployment to any static Vite host such as Vercel or Netlify.

## Accessibility
Modal views use semantic dialogs, modal scroll locking, keyboard close and arrow navigation, focus-visible styles, meaningful labels, and reduced-motion handling. The next accessibility pass should add a stricter focus trap utility for nested browser edge cases.

## AI-Assisted Development
Reusable review instructions live in `.ai/agents` and `.ai/skills`. The prompt sequence is documented in `prompts/ai-development-prompts.md`.

## Architecture
See `architecture/architecture.svg` and the rendered `architecture/architecture.png`.

## Design Decisions
The implementation favors a small component surface, local state, static data, and precise CSS over a state-management dependency. Remote Unsplash image URLs provide replaceable static image assets while keeping the repository lightweight.

## Testing
Run `npm run build`, then exercise gallery, photo tour, lightbox keyboard controls, amenities modal, and booking guest controls in the browser.

## Known Limitations
The reference URL currently presents a Vercel security checkpoint in automated browser inspection, so final visual tuning is based on the brief and the established Airbnb desktop listing language. The app is intentionally desktop-first.
