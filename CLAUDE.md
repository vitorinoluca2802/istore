# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

iStore is a client-only e-commerce SPA (an Apple Store clone) built with React 18 + Vite + react-router-dom v6. There is no backend of any kind: the product catalog is a static local dataset bundled with the app, and checkout "orders" are simulated client-side (a locally generated ID, nothing persisted server-side).

## Commands

```bash
npm install     # install dependencies (yarn.lock also present; either package manager works)
npm run dev     # start Vite dev server (http://localhost:5173 by default, not :3000 despite the readme)
npm run build   # production build via Vite
npm run preview # preview the production build locally
npm run lint    # ESLint over src/, .js/.jsx, max-warnings 0
```

There is no test suite/script in this repo (no `test` entry in package.json, no test files) — don't assume Jest/Vitest exists. No environment variables or `.env` file are needed to run this project — everything is local.

## Architecture

### Routing (`src/App.jsx`)

Single `BrowserRouter` with routes for: `/` (Landing), `/category/:categoryId` (ItemListContainer), `shop/:shopId/:productName` (ItemDetailContainer), `/search/:productName` (Search), `/store` (Products grid), `/support` (Support/FAQ), `/cart`, `/checkout`, and a catch-all 404. `NavBar` and `Footer` are rendered as siblings of `<Routes>` so they persist across all pages — **both must stay inside `<BrowserRouter>`**, not outside it: `Footer` uses `<Link>` internally, and any component that calls a react-router hook or renders `<Link>` throws (`Cannot destructure property 'basename' of 'React2.useContext(...)' as it is null`) if mounted outside the router's React tree.

### Data flow: static local catalog

- The product catalog lives in `src/data/products.js` — a plain array of product objects, imported directly (no fetch, no network, no async loading). `useProducts` (`src/components/Hooks/useProducts.js`) is the single hook every page calls to read it; it returns `{ products, loading: false }` (the `loading` flag exists so pages can distinguish "no data yet" from "no matches" consistently, even though it's currently always `false`).
- Every page that needs product data (ItemListContainer, ItemDetailContainer, Search, SearchWidget, Products) calls `useProducts()` independently and filters the full list client-side (by category, by title slug, by search substring) — there is no server-side querying/pagination.
- Product shape: `title`, `price`, `category`, `imageKey` (an AppleDB device identifier, see below — **not** a bundled asset), `subtitle` (optional), `info` (array of bullet strings — real spec highlights, shown on both `ProductCard` and the buy page), `colors` (array of `{ name, hex }`, real Apple color options). `category` is one of `Mac`, `iPad`, `iPhone`, `Watch`, `accessories` (case-sensitive, matched against lowercase URL params via the `categories` array in `ItemListContainer.jsx`).
- The catalog models real current Apple products (iPhone 17/Air/Pro/Pro Max, iMac, iPad/Air/Pro/mini, Watch Series 11/Ultra 3/SE 3, HomePod/mini) with real specs and colors, kept up to date best-effort.
- To add a product, look up its `imageKey` and `colors` in AppleDB (`https://raw.githubusercontent.com/littlebyteorg/appledb/gh-pages/device/<identifier>.json`, e.g. `iPhone18,1.json`) — **use the JSON's `imageKey` field, not the device `identifier`**, they differ for several current models (e.g. the iPad Pro's `imageKey` points at the visually-identical previous-gen render). Then add an entry to `src/data/products.js` with that `imageKey` and the `colors` array (name + hex, straight from the same JSON).
- Checkout "orders" have no backend: `Order.jsx` simulates a short processing delay then generates a random ID client-side (`crypto.randomUUID()`) and displays it as the confirmation — nothing is persisted anywhere, so refreshing loses the order.

### Product photos: live AppleDB CDN, not bundled assets

- Product photos are **not** bundled with the app. `deviceImageUrl(imageKey, colorName)` (`src/data/products.js`) builds a URL against AppleDB's device-image service — `https://img.appledb.dev/device@256/<imageKey>/<colorName>.png` — one real photo per color, fetched by the visitor's browser at render time. This is a third-party runtime dependency: if `img.appledb.dev` is unreachable, images fail to load.
- Every `<img>` that renders a product photo (`ProductCard`, `ItemDetailContainer`, `Cart`) has an `onError` handler that swaps in a bundled local photo from `categoryFallbackImage[product.category]` (also in `src/data/products.js`) so the UI never shows a broken-image icon.
- This sandbox's own network egress policy blocks `img.appledb.dev` (it's not on the allowlisted-host list), so photos will not visually load when testing inside a Claude Code sandbox session — you'll only ever see the local fallback here. That is expected and is not a bug in the app; it loads fine in a normal browser with unrestricted internet. Verify URL construction by inspecting the `<img>` `src` attribute or network requests rather than by eyeballing the rendered photo.
- The homepage hero sections (`Hero.jsx`, `AppleHero.jsx`) and `ShopByCategory.jsx` are also data-driven off `products`/`deviceImageUrl` (looking up specific products by title, e.g. `products.find((p) => p.title === "iPhone 17 Pro")`) rather than using separate bundled marketing photos — there are no hero-specific image assets beyond the `categoryFallbackImage` fallbacks these components reuse via the same `onError` pattern.

### Color swatches

- `ColorSwatches` (`src/components/ColorSwatches/ColorSwatches.jsx`) is a shared, presentation-only component (`colors`, `selected`, `onSelect`, `size` props) used by both `ProductCard` (small swatches, local `selectedColor` state, default = first color) and `ItemDetailContainer` (large swatches + a "Color — {name}" label). Selecting a swatch changes the actual photo (`deviceImageUrl` is re-evaluated with the new color) and also sets an inline `--color-tint` CSS custom property consumed by a Tailwind `before:` arbitrary-property radial-gradient behind the product photo (search for `--color-tint` in `ProductCard.jsx`/`ItemDetailContainer.jsx`) as an ambient-light accent — the backdrop wrapper needs real padding around the `<img>` for the tint to be visible past the photo's opaque background, it isn't just decorative padding. That same backdrop also carries `before:blur-2xl` so the tint reads as a soft diffused glow rather than a crisp circle — the wrapper deliberately has **no** `overflow-hidden`, since clipping would cut the blur radius short. Product `<img>` tags across `ProductCard`, `ItemDetailContainer`, `AppleHero`, `ShopByCategory`, and `Cart` also carry a `drop-shadow-[...]` utility for a grounded shadow; because `drop-shadow` follows the image's alpha channel, it traces the real product silhouette against the AppleDB PNGs but will trace a plain rectangle against the bundled JPG fallbacks (expected in this sandbox, see below).
- The selected color rides along into the cart: `ItemDetailContainer.addCart` attaches `color: selectedColor` and a resolved `image` URL (snapshotted at add-time, since cart items don't re-render with live color state) to the cart item. Because of this, cart items are no longer unique by `title` alone — `addItemToCart`'s merge check and `Cart.removeFromCart` both key on `title` **and** `color` together, so two colorways of the same product show as separate bag lines instead of merging or cross-deleting each other.
- `ItemDetailContainer` also renders a color-thumbnail gallery (`.product-detail-gallery`) below the main photo — one real thumbnail per color (same `deviceImageUrl` helper) — as an alternate way to switch `selectedColor` besides the swatches.

### Product detail extras

- `ItemDetailContainer` renders a "You might also like" section (`.product-related`) below the highlights: up to 3 other products from the same category (`products.filter(...).slice(0, 3)`), rendered as `ProductCard`s with `info={false}`. Purely derived from the existing catalog, no separate "related products" data.
- `ItemListContainer` shows a one-line marketing blurb per category from `categoryDescription` (`src/data/products.js`) under the H1.

### Landing page sections (`src/pages/Landing.jsx`)

`Landing` composes a full homepage from `src/components/Section/*`, in this order: `Hero`, `AppleHero`, `TrustBadges`, `ShopByCategory`, `Products` (a preview grid of the catalog), `Testimonials`, `Newsletter`. All of these are static/presentational — no new data source beyond what already exists in `src/data/products.js`:

- `Hero` — the top banner (iMac); renders its product photo via `deviceImageUrl`, not a bundled asset.
- `AppleHero` — a 3-card promo grid (one large + two stacked) built from a local `promos` array of `{ product, kicker, headline, gradient, size }`, each resolved via `products.find(...)` and rendered by a shared internal `PromoCard`; every card's photo comes from `deviceImageUrl` on a dark gradient background, with hover-zoom on the image.
- `ShopByCategory` — 5 minimal cards (Mac/iPad/iPhone/Watch/Accessories) linking to `/category/<slug>`, each showing one representative product's real photo (via `deviceImageUrl`) and the blurb from `categoryDescription`. Note `categoryDescription`'s key casing (`Mac`, `iPad`, `iPhone`, `Watch`, lowercase `accessories`) doesn't match a uniform display-name casing, so the component looks up by an explicit `key` field on each tile rather than assuming `name` matches.
- `TrustBadges` — a 4-item icon/text row (delivery, returns, trade-in, support) in a `border-y` band; purely decorative/marketing, no links.
- `Testimonials` — 3 static, fictional review cards (no real customer data, no backend).
- `Newsletter` — a full-bleed dark section with an email input + "Subscribe" button with local `useState`; submitting only flips to a "Thanks for subscribing!" message, there's no real signup/email service wired up.

### Support page (`src/pages/Support.jsx`)

A static FAQ/contact page at `/support`: 3 contact method cards (Chat/Call/Email — `href="#"`, `tel:`, `mailto:` respectively, none backed by a real service) plus an accordion of 6 Q&A pairs built from a local `faqs` array, using a local `FaqItem` component with its own `useState(false)` open/closed flag per item (no shared accordion state, no URL/hash sync).

### Footer (`src/components/Footer/Footer.jsx`)

A 4-column Apple-style footer (Shop / Account / iStore Support / About iStore) plus a bottom legal bar, driven by a local `columns` array of `{ label, to }` links — all real in-app routes (`/category/...`, `/cart`, `/checkout`, `/support`) except the legal links (Privacy Policy/Terms of Use), which are `href="#"` placeholders like the rest of the app's non-functional legal links. Because it renders `<Link>`, it must stay mounted inside `<BrowserRouter>` (see Routing above).

### Cart state: Context + localStorage dual-write

- `CartContext` (`src/context/CartContext.js`) is a bare `createContext()` holding `{ cart, setCart }`, provided once in `App.jsx` around the whole app. `cart` is seeded from `localStorage.getItem("cart")` on mount.
- There is no cart reducer/service — every component that mutates the cart (`ItemDetailContainer.addCart`, `Cart.removeFromCart`, `Checkout.handleSubmit`) manually reads/writes `localStorage["cart"]` **and** calls `setCart` in the same function. When adding new cart-mutating logic, keep both in sync (update `localStorage` and call `setCart`) or state will drift from persisted storage on reload.
- Cart items are cart-shaped product objects with an added `quantity` field (and `color` when the product has color options); items are keyed/deduped by `title` + `color` together (not a dedicated ID), so product titles must stay unique within the catalog.

### Checkout form

`Checkout.jsx` is a single-page form (Contact / Shipping address / Payment sections) plus an itemized order-summary sidebar built straight from `cart`. None of it is real: there is no payment gateway, no address validation service, and no server round-trip — card number/expiry/CVV/ZIP just use HTML `pattern` attributes for shape validation (e.g. `pattern="[0-9]{4,10}"` for ZIP), the same way the pre-existing email-match check works. On submit it behaves exactly as before: clear the cart and hand off to `Order.jsx`.

### URL slug convention

Product detail/search links are built by slugifying the title: `product.title.replace(/\s+/g, "-").toLowerCase()`, e.g. `/shop/buy-{category}/{slug}`. This same transform must be replicated wherever a product is matched back out of a route param (see `ItemDetailContainer`), since there's no stored slug field.

### Component conventions

- Feature components live under `src/components/<Name>/<Name>.jsx`. There are no per-component CSS files — all styling is Tailwind utility classes directly in JSX (see below). Top-level routed pages live in `src/pages/` and compose components from `src/components/Section/*` and elsewhere.
- `Loader` (`src/components/Loader/Loader.jsx`) is the shared full-screen loading overlay (a CSS-only spinner, `animate-spin` + `border-t-link`, no image asset), reused by `ItemListContainer`, `ItemDetailContainer`, `Order`, and `Products` — don't reintroduce a one-off inline loader block, use this component.
- `Button` (`src/components/Button/Button.jsx`) is the shared CTA component used everywhere a button/link-styled-as-button appears (ProductCard, Hero, ItemDetailContainer, Cart, Order). Three `variant`s: `filled` (solid blue pill), `ghost` (outlined pill), `text` (chevron link, pass `chevron`). Renders a `<Link>` if given a `to` prop, otherwise a `<button>`. **Each variant's class string must include its own background utility** (`filled` has `bg-link`, `ghost`/`text` have `bg-transparent`) — don't add a shared `bg-transparent` to the component's base classes, since Tailwind utility precedence is determined by generation order in the compiled stylesheet, not by JSX string order, and a base-level `bg-transparent` sitting after a variant's `bg-link` in that generated order silently makes filled buttons invisible (this exact bug shipped once and was caught via screenshot QA, not lint/build).
- `Reveal` (`src/components/Reveal/Reveal.jsx`) wraps content that should fade/slide in once scrolled into view (`opacity-0 translate-y-6` → `opacity-100 translate-y-0`), built on `useInView` (`src/components/Hooks/useInView.js`, an `IntersectionObserver` hook that flips `true` once and stops observing). Used throughout Landing sections, PLP/PDP/Search headers and grids. Because the reveal only fires once the wrapped element actually crosses the viewport, a screenshot/QA script that jumps straight to `document.body.scrollHeight` will skip past middle sections without ever triggering them, leaving big blank-looking gaps that aren't real bugs — scroll incrementally (step through in viewport-sized chunks) before taking a full-page screenshot of any route with `Reveal`-wrapped content.
- `useScrolled` (`src/components/Hooks/useScrolled.js`) returns a boolean once `window.scrollY` passes a threshold; `NavBar` uses it to add a `backdrop-blur-xl` border/shadow once the page is scrolled, staying a plain translucent glass bar at rest.
- `SearchWidget` (`src/components/Navbar/SearchWidget/SearchWidget.jsx`) renders its expanded overlay input inside a glass pill (`border border-white/15 bg-transparent`, not a solid fill) with a dedicated `Button` (`type="submit"`) next to it — search is no longer purely Enter-key-driven, the button submits the same form.

### Styling: Tailwind CSS

- Styling is Tailwind CSS (config in `tailwind.config.js`, PostCSS in `postcss.config.js`), applied entirely via utility classes in `className` — there are no component `.css` files and no CSS modules. `src/index.css` is just the three `@tailwind` directives plus a `@layer base` rule for `body`.
- Brand tokens are Tailwind theme extensions, not raw CSS custom properties: `text`, `text-secondary`, `link`, `link-hover`, `divider`, `surface`, `surface-secondary` (Apple's light-gray `#f5f5f7` alternating section background) under `theme.extend.colors`; `card`/`card-hover` under `theme.extend.boxShadow` (soft resting shadow / hover-lift shadow, used by cards across ProductCard, ShopByCategory, Testimonials, Support, Order); and the Apple system-font stack under `theme.extend.fontFamily.sans` (so `text-text`, `bg-surface-secondary`, `shadow-card-hover`, `font-sans`, etc. are real utility classes). Prefer these over hardcoding new color/font/shadow values with arbitrary syntax.
- A few genuinely dynamic values that can't be static utility classes stay as **inline `style`**, not classes: the `--color-tint` CSS custom property (set per-render from the selected color's hex, consumed by a `before:[background:radial-gradient(...)]` arbitrary-value utility) and `backgroundImage: url(...)` in `AppleHero.jsx` (Tailwind can't resolve a bundler-imported asset reference inside an arbitrary-value className).
- Several layouts intentionally use Tailwind's `max-md:`/`max-[900px]:`/`min-[600px]:` arbitrary-breakpoint variants instead of the default mobile-first `sm:`/`md:`/`lg:` ones, to exactly match specific pixel breakpoints the app already depended on (e.g. the 3-column-grid-that-left-aligns-incomplete-rows pattern used by `ItemListContainer`, `Products`, `Search`, and the "You might also like" grid all use `grid-cols-1 min-[600px]:grid-cols-2 min-[900px]:grid-cols-3` — don't swap that for `sm:`/`md:` without checking it still matches at those exact widths).
- **Watch out for Tailwind Preflight resetting bare heading tags**: Preflight strips the browser's default bold/large sizing from unstyled `<h1>/<h2>/<h3>`, so any heading needs an explicit `text-*`/`font-*` class or it renders as plain body text — there's no "it just inherits the browser default" fallback like there was pre-Tailwind. Same goes for `<a>`/`<Link>` (Preflight makes them inherit color/no underline by default) and `<button>` (Preflight strips native button chrome) — always give them explicit classes.
