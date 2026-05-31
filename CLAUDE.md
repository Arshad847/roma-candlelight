# Roma Candlelight
Cinematic Italian trattoria website with immersive menu browsing, Supabase-backed reservations, heritage storytelling, reviews, maps, and evening dining mode.

## Masterplan
- Make visitors feel like they have entered a candlelit Roman trattoria using terracotta, wine-red, olive, cream, parchment textures, faux film ambience, serif typography, glow effects, and floating steam.
- Help diners explore before booking through illustrated course tabs, dish cards, ingredients, dietary/spice indicators, regional origins, chef notes, and wine pairings.
 - Make reservations feel visual and immediate with peak-time indicators, dining-room table selection, occasion extras, loading/confirmation states, and Supabase persistence.
- Keep restaurant content editable from `src/data.js`; do not add a CMS unless menu, review, gallery, or reservation seed data outgrows static arrays.
- Keep booking reachable from hero CTA, header CTA, menu CTA, `#/reserve`, and the mobile sticky booking bar.

## Tech Stack & Architecture
- **Runtime:** React `19.2.0` loaded directly from `https://esm.sh`; there is no bundler, `package.json`, install step, or build pipeline.
- **Templating:** Components use `htm@3.1.1` via `src/jsx.js`. Do **not** write JSX; use ``html`...` `` tagged template literals.
- **Styling:** Tailwind CDN is loaded in `index.html`; custom theme, animations, dark mode, table grid, postcard/gallery art, map card, and mobile booking bar live in `styles/main.css`.
- **Fonts:** Google Fonts in `index.html`: `Cormorant Garamond` for display/restaurant voice and `Inter` for UI/body.
- **Icons:** `lucide-react` imported from esm.sh in each component with `?deps=react@19.2.0`; preserve the React dependency pin when adding icons.
- **Backend:** Supabase REST API is utilized in `src/main.js`. `ReservationSection.js` imports `addBooking()` from `src/main.js` and writes reservation objects to the `reservations` table.
- **Providers:** `src/mainProviders.js` currently returns a `React.Fragment`; put any future app-wide providers there rather than wrapping inside `src/App.js`.

### How files connect
- `index.html` is the static shell. It loads Tailwind, fonts, `styles/main.css`, defines `#root`, and imports `src/main.js` as an ES module.
- `src/main.js` configures Supabase, exports `addBooking()`, and renders `<Providers><App /></Providers>`.
- `src/jsx.js` binds `htm` to React `createElement` and exports `html`.
- `src/App.js` owns hash routing, route page composition, evening-mode state, scroll reset, global steam elements, `Header`, `Footer`, and `.mobile-booking-bar`.
- `src/data.js` is the app content source for menu categories/items, reservation time/table seed data, story cards, gallery cards, and reviews.
- `src/components/*.js` are section components. Keep them mostly presentational except section-local UI state and reservation submission in `ReservationSection.js`.

### State management
- No global store. Use local React state.
- Routing is hash-based via `useHashRoute()` in `src/App.js`.
- Valid routes:
  - `#/home`
  - `#/menu`
  - `#/reserve`
  - `#/story`
- Unknown hashes fall through to the home page because `renderPage()` defaults to the full home composition.
- Evening mode is `darkMode` in `App`; it toggles `document.documentElement.classList.toggle('dark', darkMode)`.
- `Header.js` stores mobile-menu open/closed state and closes it on route changes.
- `MenuSection.js` stores active category and simulates a 260ms loading transition when switching tabs.
- `ReservationSection.js` stores selected time/table, guest name, guest count, note, selected extras, loading, and confirmed state.
- `ReviewsSection.js` auto-advances every 3600ms and supports previous/next/direct selection.

## File Structure
```text
index.html                         Static shell; Tailwind/font/CSS imports, #root, fixed #testBackendButton, src/main.js module.
index.html                         Static shell; Tailwind/font/CSS imports, #root, src/main.js module.
styles/main.css                    Theme variables, dark mode, cinematic effects, steam, hero film, table grid, gallery/postcard art, map card, mobile booking bar.
src/main.js                        React root render; Firebase initialization; exports addBooking().
src/jsx.js                         htm binding; import html from here for every component template.
src/mainProviders.js               App-wide provider wrapper; currently a React.Fragment only.
src/App.js                         Hash router, page composition, evening mode, scroll reset, global steam, sticky mobile booking CTA.
src/data.js                        Static restaurant content: menuCategories, reservationsSeed, storyCards, galleryCards, reviews.
src/components/Header.js           Sticky nav, active route styling, evening-mode toggle, mobile drawer, reserve CTA.
src/components/Hero.js             Full-screen cinematic landing section with film overlay, glow CTA, menu CTA, ambience cards.
src/components/MenuSection.js      Course/category tabs, dish cards, dietary/spice icons, wine/origin data, chef-note hover reveal.
src/components/ReservationSection.js Reservation UI, table/time/extras form state, Supabase submission via addBooking().
src/components/StorySection.js     Chef/family/imported-ingredient storytelling from storyCards.
src/components/GallerySection.js   Vintage postcard album cards from galleryCards.
src/components/ReviewsSection.js   Auto-advancing/manual reviews carousel from reviews.
src/components/VisitSection.js     Address, hours, phone, Google Maps links, illustrated map card.
src/components/Footer.js           Brand footer and hash-route links.
CLAUDE.md                          Project documentation for coding agents; keep synchronized with implementation.
```

## Key Features
### Cinematic home page
- `#/home` renders `Hero`, `MenuSection`, `ReservationSection`, `StorySection`, `GallerySection`, `ReviewsSection`, and `VisitSection`.
- `Hero.js` uses CSS classes `hero-film`, `hero-overlay`, `glow-cta`, and `fade-in` to create the slow-motion restaurant ambience without real video assets.
- Global floating steam is rendered in `App.js` as `.steam-1`, `.steam-2`, `.steam-3`.

### Header, routes, and evening mode
- `Header.js` displays route-aware navigation for Home, Menu, Reserve, and Our Story.
- The moon/sun button calls `onToggleDark` from `App.js`; dark styling is driven by the root `.dark` class and CSS variables in `styles/main.css`.
- Mobile navigation is a collapsible drawer; it automatically closes when `route` changes.
- Mobile users also get `<a href="#/reserve" className="mobile-booking-bar md:hidden">Reserve a Table</a>` from `App.js`.

### Immersive menu
- `MenuSection.js` reads `menuCategories` from `src/data.js`.
- Each category requires:
  - `id`
  - `label`
  - `icon`
  - descriptive copy
  - `items`
- Each menu item supports:
  - `name`
  - `ingredients`
  - `price`
  - `dietary` values: `vegetarian`, `vegan`, `gluten-free`
  - `spice` from `0` to `3`
  - `wine`
  - `origin`
  - `chefNote`
- Category switching intentionally delays 260ms to show a transition/loading feel. Do not remove unless replacing with a better transition.
- Chef notes are hover-revealed via `.group-hover`; ensure important info is not only available on hover if adding critical accessibility content.

### Reservations
- `ReservationSection.js` reads `reservationsSeed` from `src/data.js`.
- Reservation seed data includes:
  - `date`
  - `times`: each with `id`, display `time`, and `level` (`peak`, `steady`, or calm/fallback)
  - `tables`: each with `id`, `name`, `seats`, `spot`, and descriptive mood/location fields
  - occasion extras
- Defaults are intentionally prefilled:
  - time `t3`
  - table `E5`
  - guest name `Giulia Rossi`
  - guests `2`
  - note `Quiet corner if available`
  - extra `Anniversary prosecco chill`
- `submitReservation()` constructs and sends:

```js
{
  customer_name,
  number_of_guests,
  reservation_note,
  selected_time_id,
  selected_time,
  selected_table_id,
  selected_table_name,
  extras,
  status: "pending",
  timestamp
}
```

- Submission calls `await addBooking(reservationData)` from `src/main.js`.
- On success: sets `confirmed` to `true` and shows an alert.
- On failure: logs the error and shows a failure alert.
- Current UX uses browser `alert()` even though the page also has confirmation state; if refining, replace alerts with in-page toast/confirmation UI rather than adding another dependency.

### Firebase backend
- `src/main.js` owns Firebase initialization and exports `addBooking()`.
- `ReservationSection.js` depends on that export, which means `main.js` is both bootstrap and a lightweight backend service module. Be careful with circular imports; do not import components into `main.js`.
- API surface for app code:
  - `addBooking(reservationData): Promise` — writes a reservation/booking object to Firebase Realtime Database.
- Firebase writes should remain isolated to `src/main.js` unless a dedicated service module is introduced.

### Story, gallery, reviews, visit
- `StorySection.js` renders static family/chef/imported-ingredient cards from `storyCards`.
- `GallerySection.js` renders `galleryCards` as vintage postcard cards; CSS classes `gallery-${card.id}`, `postcard`, `stamp`, and `rotate-*` control the illustrated look.
- `ReviewsSection.js` renders `reviews`, auto-advances every 3600ms, and supports arrow buttons plus direct review selection.
- `VisitSection.js` provides address, hours, phone, Google Maps search URL, Google Maps directions URL, and a custom illustrated map card. There is no embedded Maps iframe/API key.

## Design Guidelines
- **Mood:** cinematic, warm, romantic, handcrafted; avoid sterile SaaS styling.
- **Palette:** controlled by CSS variables in `styles/main.css`; core colors are warm cream background, terracotta/wine primary, deep olive/secondary tones, muted parchment cards, and darker candlelit variants in `.dark`.
- **Typography:** use `font-serif`/Cormorant Garamond for headings, restaurant name, dish names, prices, and emotional copy; use Inter/Tailwind default for controls, labels, nav, and dense text.
- **Surfaces:** cards should use rounded large radii (`var(--radius-lg)`), subtle borders using `hsl(var(--border))`, parchment/gradient backgrounds, and `var(--shadow-*)`.
- **Motion:** subtle only: glow/pulse CTAs, fade-ins, hover lift, carousel advance, steam, faux film. Avoid fast or bouncy motion that breaks the candlelit mood.
- **Responsive behavior:** layout is mobile-first. Important grids collapse to one column; menu tabs scroll horizontally with `.no-scrollbar`; header nav becomes a drawer; reservation CTA becomes the bottom sticky `.mobile-booking-bar`.
- **Dark/evening mode:** never hardcode dark colors that bypass CSS variables unless matching existing hero white text or black overlay treatment. Add dark variants through CSS variables/classes.

## App Flow
- **Home discovery:** user lands on `#/home`, sees cinematic hero, clicks “Explore the Menu” or scrolls through menu, booking, story, gallery, reviews, and visit sections.
- **Menu-to-booking:** user opens `#/menu`, switches categories, hovers dish cards for chef notes, then clicks “Pair this with a reservation”; this jumps to `#/reserve`.
- **Reservation:** user selects time, sees peak/steady/calm indicators, chooses a table tile, enters/edits guest details, toggles extras, submits, then Firebase receives a `pending` reservation.
- **Story browsing:** user opens `#/story` to see heritage cards, gallery, and reviews without the reservation/visit sections.
- **Visit/directions:** on home, `VisitSection.js` links out to Google Maps search or directions in a new tab.
- **Edge cases:**
  - Unknown hash routes render the home page.
  - If selected time/table lookup fails, reservation data falls back to `"N/A"` for display names.
  - Reviews carousel assumes `reviews.length > 0`; do not empty `reviews` without adding guards.
  - Menu assumes `menuCategories[0]` exists; do not empty `menuCategories` without adding guards.
  - Browser alerts are currently part of reservation feedback; avoid duplicate noisy feedback if adding toasts.

## Conventions
- Use ES modules only; all imports must be browser-resolvable URLs or relative files.
- Do not introduce JSX, TypeScript, npm-only packages, Vite, Webpack, or build-time assumptions unless deliberately migrating the whole app.
- Component names are PascalCase and exported named functions: `export function MenuSection(...)`.
- Local helper components/functions can live in the same file when only used there, e.g. `DietaryBadge`, `SpiceMeter`, `MenuCard` in `MenuSection.js`.
- Use `className`, not `class`, inside `html` templates.
- For dynamic class strings, use template literals inside interpolations: `className=${\`...\`}`.
- When mapping arrays, always provide stable `key` values from data IDs where available.
- Keep restaurant content in `src/data.js`; avoid hardcoding new menu/review/gallery/story content inside components unless it is structural UI copy.
- Use Tailwind utility classes for layout/spacing and `styles/main.css` for reusable effects, theme variables, animations, and complex art classes.
- To add a new page:
  1. Create `src/components/NewSection.js`.
  2. Import it in `src/App.js`.
  3. Add a route branch in `renderPage()`.
  4. Add a nav item in `Header.js` and footer link in `Footer.js` if user-facing.
  5. Use a `#/new-route` hash URL.
- To add a new data-driven feature:
  1. Add or extend arrays/objects in `src/data.js`.
  2. Render them from a presentational component.
  3. Keep state local unless multiple unrelated sections truly need it.
  4. Add CSS effect classes to `styles/main.css` only when Tailwind utilities are insufficient.
- To add icons, import from `https://esm.sh/lucide-react?deps=react@19.2.0` in the component using them.
- Preserve the main reservation CTAs.

## Platform (GenMB)

This app is built and hosted on GenMB.

**Runtime:** Browser sandbox (iframe) or Cloud Run. No Node.js server — all code runs client-side unless `backend/` exists.

**Dependencies:** CDN-only (esm.sh, cdn.tailwindcss.com, unpkg). Use ES module imports with full CDN URLs. No `npm install` at runtime.

**Entry point:** `index.html` must include all CDN script tags. Tailwind via CDN with inline config.

**Built-in services (relative API paths only, never hardcode domains):**
- `/api/ai/completion` — AI proxy | `/api/data/{appId}/*` — PostgreSQL (DataConnect SDK)
- `/api/storage/{appId}/*` — File uploads (GCS) | `/api/auth/google/*` — Google OAuth
- `/api/contact/submit` — Contact form | SDKs: `window.genmb.db`, `.storage`, `.auth`

**File structure:** `index.html` (entry), `src/` (source), `styles/` (CSS), `backend/` (optional FastAPI), `CLAUDE.md` (this file).

**Cannot:** Install npm packages at runtime, access filesystem, make direct server-side calls from frontend, modify infra.
