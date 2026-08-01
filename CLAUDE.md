# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

iStore is a client-only e-commerce SPA (an Apple Store clone) built with React 18 + Vite + react-router-dom v6. There is no custom backend: Firebase (Firestore) is used directly from the browser as the data store for products and orders.

## Commands

```bash
npm install     # install dependencies (yarn.lock also present; either package manager works)
npm run dev     # start Vite dev server (http://localhost:5173 by default, not :3000 despite the readme)
npm run build   # production build via Vite
npm run preview # preview the production build locally
npm run lint    # ESLint over src/, .js/.jsx, max-warnings 0
```

There is no test suite/script in this repo (no `test` entry in package.json, no test files) — don't assume Jest/Vitest exists.

### Environment variables

Firebase is configured entirely through Vite env vars (must be prefixed `VITE_` to be exposed to client code via `import.meta.env`):

```
VITE_REACT_APP_apiKey
VITE_REACT_APP_authDomain
VITE_REACT_APP_projectId
VITE_REACT_APP_storageBucket
VITE_REACT_APP_messagingSenderId
VITE_REACT_APP_appId
```

No `.env.example` exists in the repo; a local `.env` (or `.env.local`) with these keys is required for `npm run dev` to fetch real data. Without it, `useFirebaseProducts` will fail silently (error is only `console.error`'d) and product lists will stay empty/loading.

## Architecture

### Routing (`src/App.jsx`)

Single `BrowserRouter` with routes for: `/` (Landing), `/category/:categoryId` (ItemListContainer), `shop/:shopId/:productName` (ItemDetailContainer), `/search/:productName` (Search), `/store` (Products grid), `/cart`, `/checkout`, and a catch-all 404. `NavBar` and `Footer` are rendered outside `<Routes>` so they persist across all pages.

### Data flow: Firebase as the only backend

- `useFirebaseProducts` (`src/components/Hooks/useFirebaseProductos.js`) is the single hook that fetches all documents from the Firestore `products` collection. Every page that needs product data (ItemListContainer, ItemDetailContainer, Search, SearchWidget, Products) calls this hook independently and filters the full list client-side (by category, by title slug, by search substring) — there is no server-side querying/pagination.
- Product shape (Firestore document fields): `title`, `price`, `category`, `image`, `subtitle` (optional), `info` (optional array of bullet strings). `category` is one of `Mac`, `iPad`, `iPhone`, `Watch`, `accessories` (case-sensitive, matched against lowercase URL params).
- **Firebase is initialized redundantly**: `useFirebaseProductos.js`, `Checkout.jsx`, and `Order.jsx` each call their own `initializeApp(firebaseConfig)` / `getFirestore(app)` with the same `import.meta.env.VITE_REACT_APP_*` config duplicated inline. There is no shared `firebase.js` init module — if you add a new component that needs Firestore, follow the existing (duplicated) pattern rather than assuming a shared client exists.
- `src/components/Order/config.js` is a separate, unused Firebase config that reads from `process.env` instead of `import.meta.env` — it will not work under Vite and is dead code left over from a prior setup (likely Create React App). Do not use it as a reference for env var access.
- Orders are written on checkout: `Order.jsx` adds a document to the Firestore `orders` collection (`name`, `phone`, `email`, `createdAt`) and displays the resulting doc ID as the order confirmation.

### Cart state: Context + localStorage dual-write

- `CartContext` (`src/context/CartContext.js`) is a bare `createContext()` holding `{ cart, setCart }`, provided once in `App.jsx` around the whole app. `cart` is seeded from `localStorage.getItem("cart")` on mount.
- There is no cart reducer/service — every component that mutates the cart (`ItemDetailContainer.addCart`, `Cart.removeFromCart`, `Checkout.handleSubmit`) manually reads/writes `localStorage["cart"]` **and** calls `setCart` in the same function. When adding new cart-mutating logic, keep both in sync (update `localStorage` and call `setCart`) or state will drift from persisted storage on reload.
- Cart items are cart-shaped product objects with an added `quantity` field; items are keyed/deduped by `product.title` (not an ID), so product titles must stay unique.

### URL slug convention

Product detail/search links are built by slugifying the title: `product.title.replace(/\s+/g, "-").toLowerCase()`, e.g. `/shop/buy-{category}/{slug}`. This same transform must be replicated wherever a product is matched back out of a route param (see `ItemDetailContainer`), since there's no stored slug field.

### Component conventions

- Feature components live under `src/components/<Name>/<Name>.jsx` paired with a co-located `<Name>.css` (imported directly in the component, no CSS modules). Follow this pairing for new components.
- Top-level routed pages live in `src/pages/` and compose components from `src/components/Section/*` and elsewhere.
- Known fragile import: `src/components/Section/Products/Products.jsx` imports `ProductCard` via a long relative path that walks back out to `.../istore/src/components/ProductCard/ProductCard` instead of the normal `../../ProductCard/ProductCard` — a latent path-portability bug worth fixing opportunistically if you touch that file, but be aware it currently works from this checkout location.
