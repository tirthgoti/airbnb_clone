# Architecture Overview

## Project purpose
This project is a front-end Airbnb-style listing page clone built with React, TypeScript, and Vite. The goal is to closely match the provided listing reference while keeping the project fast, responsive, and easy to review in a browser.

## Stack
- React 19
- TypeScript
- Vite
- Lucide React
- Custom CSS styling

## High-level structure

### App shell
- `src/App.tsx` contains the complete single-page listing experience.
- `src/App.css` holds the Airbnb-inspired styling, responsive layout, and interaction visuals.
- `src/index.css` provides global resets and font setup.

### Static assets
- `public/images/` stores listing and supporting visual assets.
- `public/fonts/` contains the Airbnb-style font used in the page.
- `public/airbnb-logo.svg` provides the Airbnb logo asset.

### Runtime behavior
The page uses local component state to manage UI behaviors such as:
- modal gallery/lightbox viewing
- amenity expansion
- reservation action states
- date/month display states
- selected gallery and nearby stays navigation

## Key page sections
1. Header and sticky top navigation
2. Photo gallery and lightbox
3. Property summary and host details
4. Guest favourite / review highlight section
5. About section and stay details
6. Amenities and sleep/room information
7. Calendar-like booking panel
8. Reviews, location, host card, and things-to-know sections
9. Nearby listings carousel

## Data model
The app currently uses static mock data embedded in the component layer, rather than a database or API. This is intentional for a front-end submission and makes it easier to match the reference design exactly.

## Deployment model
The app is built as a static Vite site and is compatible with Vercel or other static hosting providers.

## Notes for submission
- The app is production-build friendly.
- It is suitable for a visual UI and frontend clone submission.
- Backend booking functionality is intentionally not included because the assignment is front-end focused.
