# DESIGN.md — Epic Games Store Clone

Full design + architecture specification. This file is the source of truth for visual direction, scope, **and code structure**. If it is deleted, the same content is mirrored in Claude's memory system.

---

## 1. Tech Stack Constraint

This project uses a **modified Next.js**. APIs, conventions, and file structure may differ from standard Next.js.

> Before writing any Next.js code, read the relevant guide in `node_modules/next/dist/docs/`. Heed deprecation notices.

---

## 2. Layout Rule

**No sidebar.** Only a top navbar.

### Navbar Structure (left → right)

1. Webpage logo
2. Homepage / Browse page links
3. Search bar (debounced — YouTube-style)
4. Cart icon
5. Profile icon

Background: Navbar Background `#181818`.

---

## 3. Color Palette

Aesthetic target: **Gaming + Cyberpunk + Premium SaaS**. Use these exact hex values.

### Backgrounds

| Usage              | HEX       |
| ------------------ | --------- |
| Main Background    | `#121212` |
| Sidebar Background | `#111111` |
| Card Background    | `#1F1F1F` |
| Navbar Background  | `#181818` |
| Secondary Dark     | `#1E1E1E` |

### Text

| Usage              | HEX       |
| ------------------ | --------- |
| Primary White Text | `#ECECEC` |
| Secondary Text     | `#B8C1CC` |
| Muted Text         | `#8B949E` |

### Cyan / Neon Accent (MOST IMPORTANT)

| Usage             | HEX       |
| ----------------- | --------- |
| Primary Neon Cyan | `#00D9FF` |
| Soft Cyan         | `#4C807E` |
| Cyan Glow         | `#21C7E5` |
| Cyan Border       | `#214A52` |

### Success / Positive (discounts, offers, positive stats)

| Usage         | HEX       |
| ------------- | --------- |
| Green Success | `#00C15A` |
| Light Green   | `#35E28A` |

### Danger / Sale (sale %, low stock, discounts)

| Usage    | HEX       |
| -------- | --------- |
| Neon Red | `#FF5A5F` |
| Soft Red | `#B23A48` |

### Borders

| Usage       | HEX       |
| ----------- | --------- |
| Card Border | `#2A2A2A` |
| Soft Border | `#2F2F2F` |

---

## 4. User Page — Features

### 4.1 Homepage Sections

- **Hero** — Netflix-style auto-play muted video, dark overlay, glowing CTA, game title
- **Trending games**
- **Free games**
- **New releases**
- **Categories**
- **Featured discounts**

### 4.2 Hero Section Spec

- Full-width auto-play **muted** video (Netflix-style)
- Dark overlay over the video
- Glowing CTA button (Primary Neon Cyan `#00D9FF`)
- Game title displayed over the video

### 4.3 Game Card Hover Behavior

All four effects required:

1. Scale slightly
2. Show trailer preview (autoplay muted)
3. Glow border in cyan (`#00D9FF` / `#21C7E5`)
4. Show quick add-to-cart button

Card uses Card Background `#1F1F1F` and Card Border `#2A2A2A`.

### 4.4 Authentication

- Email login only
- Signup / login
- Profile dropdown
- Logout

### 4.5 Game Search

- Debounced search (YouTube-style)

### 4.6 Game Details Page (`/game/[id]`)

Must include:

- Game trailer
- Screenshots
- Price
- Discount
- Description
- System requirements
- Reviews

### 4.7 Cart System

- Add to cart
- Remove
- Total calculation
- Checkout UI

### 4.8 Responsive Design

Must work on laptop, desktop, tablet, and mobile.

### 4.9 Extra UX

- Skeleton loading states
- Global `not-found.tsx` (one only — see §6.2)

---

## 5. Design Styles to Follow

These three styles MUST be applied across the UI. They are complementary — combine them, don't pick just one.

### 5.1 Minimal Premium Style (most important)

Inspired by **Stripe**, **Notion**, **Framer**.

- Huge whitespace
- Clean typography
- Subtle shadows
- Soft gradients

**Smooth animations** — small animations make a huge difference:

- Hover lift
- Card glow
- Scroll reveal
- Smooth transitions

This is THE modern premium style and should be the baseline for every page.

### 5.2 Glassmorphism

- Blur effects (`backdrop-filter: blur(...)`)
- Transparent cards
- Glowing UI
- Layered backgrounds

Apply to overlays, modals, navbar (when scrolled), and floating cards.

### 5.3 Bento Grid Layouts

Inspired by **Apple Intelligence**, **Framer**, modern AI startups.

- Asymmetrical cards
- Modular layouts
- Interactive sections

Use for homepage sections (Categories, Featured discounts) to break the monotony of uniform card grids.

---

## 6. Architecture & File Conventions

These rules are **non-negotiable**. Any new code must follow them. Existing flat code under `app/` and `components/` must be migrated into the `src/` layout below.

### 6.1 Folder structure

```
src/
├── components/
│   ├── cards/         # All reusable card components (GameCard, CategoryCard, DealCard, …)
│   ├── layout/        # Navbar, SearchBar, Footer
│   ├── form/          # Inputfield (one component, all input types)
│   ├── buttons/       # CommonButton, OutlineButton
│   ├── modal/         # ConfirmModal, drawers, dialogs
│   └── popover/       # Popover (anchored dropdown — profile menu, search results)
├── constants/         # game.ts and all other static data / enums
├── utils/             # cn(), formatters, debounce, component-specific helpers
└── views/             # Page-level composition (HomeView, BrowseView, CartView, …)

app/
├── layout.tsx         # Root layout — imports Navbar/SearchBar from src/components/layout
├── not-found.tsx      # ONE global not-found page (see 6.2)
├── loading.tsx        # Global skeleton loader
├── page.tsx           # Thin — imports + renders <HomeView />
├── browse/page.tsx    # Thin — renders <BrowseView />
├── cart/page.tsx      # Thin — renders <CartView />
├── game/[id]/page.tsx # Thin — renders <GameDetailView id={...} />
├── login/page.tsx     # Thin — renders <LoginView />
└── signup/page.tsx    # Thin — renders <SignupView />
```

### 6.2 Hard rules

1. **Every component file ≤ 200 lines.** If it grows past 200, split it. No exceptions.
2. **`app/**/page.tsx` files stay thin** — they only import the matching view from `src/views/` and render it. No data filtering, no JSX composition beyond `<XView />`. Data fetching/sorting/filtering belongs in the view (or a hook/util it calls).
3. **One global `not-found.tsx`** at `app/not-found.tsx`. Do not create per-route 404s.
4. **Constants** (game data, category lists, enums) live in `src/constants/`. The current `constants/games.ts` must be moved to `src/constants/game.ts`.
5. **Helpers** — both component-specific and shared — live in `src/utils/`. Includes `cn()`, debounce, currency/discount formatters, sort comparators.
6. **Pages = views.** Every page (home, browse, cart, game details, login, signup, checkout) is a `*View` component in `src/views/`. `app/` routes are wrappers.
7. **Layout components** (Navbar, SearchBar, Footer) live in `src/components/layout/`, not at component root.
8. **Reusable components only.** If a piece of JSX is used in only one view and is short, inline it. Reusable pieces go to `src/components/`. Default to inlining; promote to a shared component only when reused.

### 6.3 Reusable card catalog

Identified from the three reference screenshots (Trending Now / Categories / Featured Discounts). All live in `src/components/cards/`.

| Component       | Where it's reused                                              | Key props                                            |
| --------------- | -------------------------------------------------------------- | ---------------------------------------------------- |
| `GameCard`      | Trending, Free Games, New Releases, search results, Browse grid | `variant: "vertical" \| "compact" \| "feature"`, `game`, `onAddToCart` |
| `CategoryCard`  | Categories bento, Browse-page filter tiles                     | `name`, `image`, `href`                              |
| `DealCard`      | Featured Discounts hero slot, promotional banners              | `game`, `tagline` (e.g. "Deal of the Day")           |

**Variant rules for `GameCard`:**

- `vertical` (default) — portrait card with image, category label, title, price row + discount badge. Used in horizontal-scroll rows (Trending / Free / New).
- `compact` — landscape mini card with image-left, title + price right. No category, no description. Used in Featured Discounts side slots and dense lists.
- `feature` — large landscape card with description text and a more prominent CTA. Used inside bento layouts when a single game needs spotlight.

**Badge rules (shared across cards):**

- Free → cyan pill `#00D9FF` text `FREE`
- Discount → green pill `#00C15A` text `-NN%`
- Both render top-left over the image

### 6.4 Migration checklist (current → target)

These existing files violate §6.1 and must be moved/renamed in the next refactor:

- `components/Navbar.tsx` → `src/components/layout/Navbar.tsx`
- `components/SearchBar.tsx` → `src/components/layout/SearchBar.tsx`
- `components/GameCard.tsx` → `src/components/cards/GameCard.tsx` (extend with `variant` prop)
- `components/CategoriesBento.tsx` → split: `src/views/HomeView.tsx` consumes `src/components/cards/CategoryCard.tsx`
- `components/FeaturedDiscountsBento.tsx` → split: view composition stays in `HomeView`, cards use `GameCard variant="compact"` and `DealCard`
- `components/Hero.tsx`, `GameRow.tsx`, `Reveal.tsx` → keep in `src/components/` (sub-folder by role) or fold into views if single-use
- `components/auth/*` → `src/views/LoginView.tsx`, `src/views/SignupView.tsx` (using `Inputfield` + `CommonButton`)
- `components/cart/CartView.tsx` → `src/views/CartView.tsx` (currently 199 lines — split if it grows)
- `components/game-detail/*` → `src/views/GameDetailView.tsx` + supporting subcomponents
- `components/skeletons/*` → `src/components/skeletons/`
- `constants/games.ts` → `src/constants/game.ts`
- `app/page.tsx` data filtering → move into `src/views/HomeView.tsx`; `app/page.tsx` becomes `export default function Page(){ return <HomeView/> }`

---

## 7. Component Patterns

These patterns are mandatory for the listed shared components. They encode performance + a11y conventions the project relies on.

### 7.1 Buttons — `src/components/buttons/`

Two and only two button primitives. All app buttons must use one of them. Do not write raw `<button>` elements in views.

- **`CommonButton`** — filled / solid button. Default variant `theme` (cyan). Used for primary actions: Add to Cart, Checkout, Sign In, Buy Now.
- **`OutlineButton`** — outlined / ghost button. Used for secondary actions: View All, Cancel, filter chips, Wishlist.

**Required pattern (both buttons):**

1. Wrap with `memo()` on default export.
2. Stable `NOOP = () => {}` for default `onClick` so memo doesn't re-render on parent re-renders.
3. `VARIANTS` table hoisted **outside** the component (never rebuilt per render). Keys: `theme`, `success`, `danger`, `dark`, `neutral`, `warning`, `simple` (OutlineButton); `default`, `success`, `danger`, `theme` (CommonButton).
4. Use `cn()` from `src/utils/cn.ts` for class merging.
5. Props: `text`, `onClick`, `variant`, `active`, `className`, `Icon`, `disabled`, `loading` (CommonButton only), `iconPosition` (OutlineButton only).
6. Loading spinner is absolutely positioned inside CommonButton; hidden via `loading ? "" : "hidden"`.

Reference implementation: see [git history of this commit / project] for the exact `CommonButton.jsx` and `OutlineButton.jsx` skeletons pasted in the design conversation.

### 7.2 Form — `src/components/form/Inputfield`

**One single `Inputfield` component covers every input type the app uses** — `text`, `email`, `password`, `number`, `tel`, etc. Do not create `EmailInput`, `PasswordInput`, or per-type variants.

Behaviour:

- `type="password"` automatically renders the eye / eye-off toggle on the right (Lucide icons).
- Optional left `Icon` prop renders a clickable icon (with `onClickIcon`).
- Renders a `<label htmlFor>` tied to `inputId || name`.
- Error state: red border + red placeholder + `(error)` text after the label.
- `required` shows red `*` next to the label.
- `optionalText` shows a small gray suffix after the label.
- `ToolTip` (from `src/components/common`) renders next to the label when `message` is provided.
- **React 19 — `ref` is a regular prop.** Do not use `forwardRef`.
- Uses `react-i18next` `useTranslation` for `lang` attribute on the input.

### 7.3 Memoization & variant tables (project-wide rule)

Any presentational component that takes a small set of variants (button, badge, chip, tag) must:

- Hoist its `VARIANTS` map outside the component function.
- Wrap its default export with `React.memo`.
- Provide stable `NOOP` defaults for callback props.

This is how the project keeps re-renders cheap; do not skip it for "simple" components.

### 7.4 `cn()` utility

`src/utils/cn.ts` exports a `cn(...inputs)` helper (typical `clsx + tailwind-merge`). All components compose classes through it — never via template string concatenation when conditionals are involved.

---

## 8. Notes

- Date saved: 2025-05-25
- Architecture rules added: 2026-05-28
- This spec was pinned by the user as the agreed design + structure direction. Do not substitute "close enough" colors, partial hover effects, or relaxed file conventions — use exact values, full behavior sets, and the `src/` layout in §6.
- Design styles (Minimal Premium + Glassmorphism + Bento Grid) and architecture rules (§6, §7) are mandatory, not optional.
