# Airbnb Listing Clone

A polished Airbnb-style property page built with React, TypeScript, and Vite. The experience is designed to closely match the reference listing for a serviced apartment in Candolim, Goa, including a sticky header, photo gallery, amenities, calendar-like booking panel, host details, reviews, and modal-driven gallery interactions.

## Project overview

This project recreates a single listing page inspired by Airbnb’s presentation patterns and the provided reference design. It focuses on front-end fidelity and an interactive UI rather than a full backend booking system.

### Included experience

- sticky navigation and search controls
- large property gallery with lightbox-style modal
- reservation card with pricing and check-in details
- guest favorite and review highlights
- amenities and stay information sections
- host and neighborhood cards
- responsive layout for mobile and desktop
- custom Airbnb-inspired branding and typography

## Tech stack

- React 19
- TypeScript
- Vite
- Lucide React icons
- Custom CSS styling with Airbnb-inspired design tokens

## Getting started

### Install dependencies

```bash
npm install
```

### Run the app locally

```bash
npm run dev
```

The Vite dev server will start and provide a local URL, typically http://localhost:5173.

## Available scripts

```bash
npm run dev
npm run build
npm run lint
npm run preview
```

### Script meanings

- `npm run dev` — starts the local development server
- `npm run build` — creates a production build
- `npm run lint` — runs the project lint checks
- `npm run preview` — previews the production build locally

## Build and verification

This project is prepared as a static front-end prototype. To verify it works before shipping or reviewing it:

```bash
npm run lint
npm run build
```

Once the build completes, the generated static output is placed in the `dist/` folder.

## Notes

- The current implementation uses static mock data and is designed as a front-end clone rather than a production booking product.
- Branding, typography, and imagery have been aligned to the reference listing to improve visual faithfulness.
- The app is intentionally focused on UI accuracy and responsiveness for the listing experience.

## Folder structure

```text
airbnb-clone/
├── public/
│   ├── airbnb-logo.svg
│   ├── fonts/
│   ├── images/
│   └── icons.svg
├── src/
│   ├── App.tsx
│   ├── App.css
│   ├── index.css
│   └── main.tsx
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## Deployment

This project is structured as a static Vite app and can be deployed to any static host such as Vercel, Netlify, or GitHub Pages with the production build output from `dist/`.
