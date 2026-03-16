# Emaki Project Map (Beginner Friendly)

This file is a **map of “where things live”** in the Emaki codebase, plus **what to reference** when you ask for changes.

## Quick: what do I reference?

- **The site won’t load / blank page / build issues**:
  - `@index.html` (the page React mounts into)
  - `@src/app/bootstrap.tsx` (the app entry file)
- **Navigation / header / footer / overall layout**:
  - `@src/layout/Layout.tsx`
- **A specific page (Profile/Scroll/Channels/etc.)**:
  - `@src/features/<feature>/<Feature>Page.tsx` (examples below)
- **“Data/content is wrong” (mock content for now)**:
  - `@src/mock/mockData.ts`
- **Fonts/colors/spacing/theme utilities**:
  - `@src/styles/global.css`

## What each “entry” file does (plain English)

- `index.html`
  - The **single HTML file** Vite serves.
  - It contains `<div id="root"></div>` which is where React renders the app.
  - It loads the entry script `src/app/bootstrap.tsx`.

- `src/app/bootstrap.tsx`
  - The **true starting point** of the React app.
  - It imports global CSS and mounts React into `#root`.
  - If the app fails to start, this is a first place to look.

- `src/app/AppRouter.tsx`
  - Controls **routing** (which URL shows which page).
  - If you want to add a new page/route, reference this.

## Main layout

- `src/layout/Layout.tsx`
  - The site shell: top bar navigation, mobile nav, footer.
  - If you want to change nav items, branding placement, footer content: reference this.

## Features (pages)

Each feature lives in `src/features/<feature>/`.

- Profile: `src/features/profile/ProfilePage.tsx`
- Scroll: `src/features/scroll/ScrollPage.tsx`
- Channels: `src/features/channels/ChannelsPage.tsx`
- Discover: `src/features/discovery/DiscoveryPage.tsx`
- Seasonal: `src/features/seasonal/SeasonalPage.tsx`
- Extras: `src/features/extras/ExtrasPage.tsx`
- Landing: `src/features/landing/LandingPage.tsx`

**When to reference a feature folder**:
- If your request affects multiple files in that feature (e.g. Profile page + small components we later extract), reference the folder, like `@src/features/profile/`.

## Shared utilities

- `src/shared/utils/`
  - Small helpers used across features. If something is a generic helper (classnames, formatting), it should live here.

## Mock data (for now)

- `src/mock/mockData.ts`
  - Fake “backend” data used to render the UI.
  - When we add a real backend later, we’ll progressively replace reads from this file.

## Styling

- `src/styles/global.css`
  - Tailwind import + theme tokens + global utilities.
  - If you want to adjust fonts, colors, paper-card behavior, or global animations: reference this.

## Good ways to ask for changes (copy/paste)

### 1) Small, specific UI change
“In `@src/features/scroll/ScrollPage.tsx`, make the status sidebar sticky on desktop.”

### 2) Layout/site-wide change
“In `@src/layout/Layout.tsx`, add a new nav item for Settings.”

### 3) Data/content tweak
“Update mock usernames + posts in `@src/mock/mockData.ts`.”

### 4) New page
“Add a `Settings` page. Update routes in `@src/app/AppRouter.tsx` and add the page under `@src/features/settings/`.”

