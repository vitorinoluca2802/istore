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

Single `BrowserRouter` with routes for: `/` (Landing), `/category/:categoryId` (ItemListContainer), `shop/:shopId/:productName` (ItemDetailContainer), `/search/:productName` (Search), `/store` (Products grid), `/cart`, `/checkout`, and a catch-all 404. `NavBar` and `Footer` are rendered outside `<Routes>` so they persist across all pages.

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

### Color swatches

- `ColorSwatches` (`src/components/ColorSwatches/ColorSwatches.jsx`) is a shared, presentation-only component (`colors`, `selected`, `onSelect`, `size` props) used by both `ProductCard` (small swatches, local `selectedColor` state, default = first color) and `ItemDetailContainer` (large swatches + a "Color — {name}" label). Selecting a swatch changes the actual photo (`deviceImageUrl` is re-evaluated with the new color) and also updates a CSS custom property (`--color-tint`) consumed by a `::before` radial-gradient behind the product photo (see `.product-img-backdrop` / `.product-detail-image-backdrop`) as an ambient-light accent — the backdrop container needs real padding around the `<img>` for the tint to be visible past the photo's opaque background, it isn't just decorative padding.
- The selected color rides along into the cart: `ItemDetailContainer.addCart` attaches `color: selectedColor` and a resolved `image` URL (snapshotted at add-time, since cart items don't re-render with live color state) to the cart item. Because of this, cart items are no longer unique by `title` alone — `addItemToCart`'s merge check and `Cart.removeFromCart` both key on `title` **and** `color` together, so two colorways of the same product show as separate bag lines instead of merging or cross-deleting each other.
- `ItemDetailContainer` also renders a color-thumbnail gallery (`.product-detail-gallery`) below the main photo — one real thumbnail per color (same `deviceImageUrl` helper) — as an alternate way to switch `selectedColor` besides the swatches.

### Product detail extras

- `ItemDetailContainer` renders a "You might also like" section (`.product-related`) below the highlights: up to 3 other products from the same category (`products.filter(...).slice(0, 3)`), rendered as `ProductCard`s with `info={false}`. Purely derived from the existing catalog, no separate "related products" data.
- `ItemListContainer` shows a one-line marketing blurb per category from `categoryDescription` (`src/data/products.js`) under the H1.

### Cart state: Context + localStorage dual-write

- `CartContext` (`src/context/CartContext.js`) is a bare `createContext()` holding `{ cart, setCart }`, provided once in `App.jsx` around the whole app. `cart` is seeded from `localStorage.getItem("cart")` on mount.
- There is no cart reducer/service — every component that mutates the cart (`ItemDetailContainer.addCart`, `Cart.removeFromCart`, `Checkout.handleSubmit`) manually reads/writes `localStorage["cart"]` **and** calls `setCart` in the same function. When adding new cart-mutating logic, keep both in sync (update `localStorage` and call `setCart`) or state will drift from persisted storage on reload.
- Cart items are cart-shaped product objects with an added `quantity` field (and `color` when the product has color options); items are keyed/deduped by `title` + `color` together (not a dedicated ID), so product titles must stay unique within the catalog.

### Checkout form

`Checkout.jsx` is a single-page form (Contact / Shipping address / Payment sections) plus an itemized order-summary sidebar built straight from `cart`. None of it is real: there is no payment gateway, no address validation service, and no server round-trip — card number/expiry/CVV/ZIP just use HTML `pattern` attributes for shape validation (e.g. `pattern="[0-9]{4,10}"` for ZIP), the same way the pre-existing email-match check works. On submit it behaves exactly as before: clear the cart and hand off to `Order.jsx`.

### URL slug convention

Product detail/search links are built by slugifying the title: `product.title.replace(/\s+/g, "-").toLowerCase()`, e.g. `/shop/buy-{category}/{slug}`. This same transform must be replicated wherever a product is matched back out of a route param (see `ItemDetailContainer`), since there's no stored slug field.

### Component conventions

- Feature components live under `src/components/<Name>/<Name>.jsx` paired with a co-located `<Name>.css` (imported directly in the component, no CSS modules). Follow this pairing for new components.
- Top-level routed pages live in `src/pages/` and compose components from `src/components/Section/*` and elsewhere.
- Design tokens (brand colors, font stack) are defined as CSS custom properties in `src/index.css` (`--color-text`, `--color-link`, `--color-divider`, `--color-surface`, `--font-sans`, etc.) and reused across component stylesheets — prefer these over hardcoding new color/font values.
