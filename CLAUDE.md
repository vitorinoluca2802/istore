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
- Product shape: `title`, `price`, `category`, `image` (a bundled asset import, not a URL), `subtitle` (optional), `info` (array of bullet strings — real spec highlights, shown on both `ProductCard` and the buy page), `colors` (optional array of `{ name, hex }`). `category` is one of `Mac`, `iPad`, `iPhone`, `Watch`, `accessories` (case-sensitive, matched against lowercase URL params via the `categories` array in `ItemListContainer.jsx`).
- The catalog models real current-ish Apple products (iPhone 17/Air/Pro/Pro Max, iMac, iPad/Air/Pro/mini, Watch Series 10/Ultra 2/SE, HomePod/mini) with their real color options and spec highlights, kept up to date best-effort. Several SKUs intentionally reuse the same bundled photo (e.g. all iPhone SKUs use `iphone-14.jpg`, all Watch SKUs use `watch-series-8.jpg`) since there's no per-model/per-color photography locally — `src/assets/ipad.svg` is a hand-drawn placeholder illustration for the iPad line for the same reason. Colors are communicated via the `ColorSwatches` component + a tinted radial-gradient backdrop behind the photo, not by swapping the photo itself.
- To add a product, add an entry to `src/data/products.js`, importing its image from `src/assets/` (or reuse an existing one).
- Checkout "orders" have no backend: `Order.jsx` simulates a short processing delay then generates a random ID client-side (`crypto.randomUUID()`) and displays it as the confirmation — nothing is persisted anywhere, so refreshing loses the order.

### Color swatches

- `ColorSwatches` (`src/components/ColorSwatches/ColorSwatches.jsx`) is a shared, presentation-only component (`colors`, `selected`, `onSelect`, `size` props) used by both `ProductCard` (small swatches, local `selectedColor` state, default = first color) and `ItemDetailContainer` (large swatches + a "Color — {name}" label). Selecting a swatch updates a CSS custom property (`--color-tint`) consumed by a `::before` radial-gradient behind the product photo (see `.product-img-backdrop` / `.product-detail-image-backdrop`) — the backdrop container needs real padding around the `<img>` for the tint to be visible past the photo's opaque background, it isn't just decorative padding.
- The selected color rides along into the cart: `ItemDetailContainer.addCart` attaches `color: selectedColor` to the cart item. Because of this, cart items are no longer unique by `title` alone — `addItemToCart`'s merge check and `Cart.removeFromCart` both key on `title` **and** `color` together, so two colorways of the same product show as separate bag lines instead of merging or cross-deleting each other.

### Cart state: Context + localStorage dual-write

- `CartContext` (`src/context/CartContext.js`) is a bare `createContext()` holding `{ cart, setCart }`, provided once in `App.jsx` around the whole app. `cart` is seeded from `localStorage.getItem("cart")` on mount.
- There is no cart reducer/service — every component that mutates the cart (`ItemDetailContainer.addCart`, `Cart.removeFromCart`, `Checkout.handleSubmit`) manually reads/writes `localStorage["cart"]` **and** calls `setCart` in the same function. When adding new cart-mutating logic, keep both in sync (update `localStorage` and call `setCart`) or state will drift from persisted storage on reload.
- Cart items are cart-shaped product objects with an added `quantity` field (and `color` when the product has color options); items are keyed/deduped by `title` + `color` together (not a dedicated ID), so product titles must stay unique within the catalog.

### URL slug convention

Product detail/search links are built by slugifying the title: `product.title.replace(/\s+/g, "-").toLowerCase()`, e.g. `/shop/buy-{category}/{slug}`. This same transform must be replicated wherever a product is matched back out of a route param (see `ItemDetailContainer`), since there's no stored slug field.

### Component conventions

- Feature components live under `src/components/<Name>/<Name>.jsx` paired with a co-located `<Name>.css` (imported directly in the component, no CSS modules). Follow this pairing for new components.
- Top-level routed pages live in `src/pages/` and compose components from `src/components/Section/*` and elsewhere.
- Design tokens (brand colors, font stack) are defined as CSS custom properties in `src/index.css` (`--color-text`, `--color-link`, `--color-divider`, `--color-surface`, `--font-sans`, etc.) and reused across component stylesheets — prefer these over hardcoding new color/font values.
